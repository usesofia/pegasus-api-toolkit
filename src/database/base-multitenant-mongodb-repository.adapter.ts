import { Model, Document, ClientSession, PipelineStage, PopulateOptions } from 'mongoose';
import { NotFoundException, LoggerService } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { BaseConfigEntity } from '@app/config/base-config.entity';
import { AuthUserEntity } from '@app/auth/entities/auth-user.entity';
import { Base } from '@app/base';
import { DeepMergeLeafURI, deepmergeCustom } from 'deepmerge-ts';
import { BaseSessionPort } from '@app/database/base-session.port';
import { BaseMongoDbSessionAdapter } from '@app/database/base-mongodb-session.adapter';
import { BaseSessionStarterPort } from '@app/database/base-session-starter.port';
import { ObjectId } from 'mongodb';
import { escapeRegex } from '@app/utils/regex.utils';
import { Duration } from 'luxon';
import { DeepPartial } from '@app/utils/deep-partial.type';

export abstract class BaseMultitenantMongoDbRepositoryAdapter<
    TDoc extends Document,
    TEntity,
    TCreateRequest extends { data: DeepPartial<TDoc> },
    TFindOneRequest extends { id: string },
    TPartialUpdateRequest extends { id: string; data: DeepPartial<TDoc> },
  >
  extends Base
  implements BaseSessionStarterPort
{
  constructor(
    className: string,
    protected readonly baseConfig: BaseConfigEntity,
    protected readonly logger: LoggerService,
    protected readonly cls: ClsService,
    protected readonly model: Model<TDoc>,
  ) {
    super(className, baseConfig, logger, cls);
  }

  /**
   * Convert a Mongoose document to its corresponding entity.
   */
  protected abstract toEntity({
    doc,
    requester,
  }: {
    doc: TDoc;
    requester?: AuthUserEntity;
  }): Promise<TEntity>;

  protected getOwnerOrganization({
    requester,
  }: {
    requester: AuthUserEntity;
  }): string {
    return requester.getOrganizationOrThrow().id;
  }

  protected filterPopulate(populate: string | undefined): string | undefined {
    return populate;
  };

  async startSession(): Promise<BaseSessionPort> {
    return new BaseMongoDbSessionAdapter(
      await this.model.db.startSession(),
      this.baseConfig,
      this.logger,
      this.cls,
    );
  }

  protected buildPopulatePaths(populate: string, session?: ClientSession): PopulateOptions[] {
    return populate.split(',').map((field) => ({
      path: field.trim(),
      options: session ? { session, maxTimeMS: 2000 } : undefined,
    }));
  }

  /**
   * Creates a new document in the collection.
   */
  async create({
    requester,
    request,
    previousSession,
  }: {
    requester: AuthUserEntity;
    request: TCreateRequest & { populate?: string };
    previousSession?: BaseSessionPort;
  }): Promise<TEntity> {
    const session = previousSession
      ? (previousSession.getSession() as ClientSession)
      : null;

    const created = await this.model.insertOne({
      ...request.data,
      ownerOrganization: this.getOwnerOrganization({ requester }),
    }, { session });

    const filteredPopulate = this.filterPopulate(request.populate);
    if (filteredPopulate) {
      await created.populate(this.buildPopulatePaths(filteredPopulate, session ?? undefined));
    }

    return this.toEntity({ doc: created, requester });
  }

  /**
   * Finds one document by ID. Throws an NotFoundException if the document is not found.
   */
  async findByIdOrThrow({
    requester,
    request,
    previousSession,
    maxTimeMS = 2000,
  }: {
    requester: AuthUserEntity;
    request: TFindOneRequest & { populate?: string };
    previousSession?: BaseSessionPort;
    maxTimeMS?: number;
  }): Promise<TEntity> {
    const session = previousSession
      ? (previousSession.getSession() as ClientSession)
      : null;

    const doc = await this.model.findOne(
      {
        _id: request.id,
        ownerOrganization: this.getOwnerOrganization({ requester }),
        deletedAt: null,
      },
    ).session(session).maxTimeMS(maxTimeMS);

    if (!doc) {
      throw new NotFoundException(
        `Recurso do tipo ${this.model.modelName} com id ${request.id} não foi encontrado.`,
      );
    }

    const filteredPopulate = this.filterPopulate(request.populate);
    if (filteredPopulate) {
      await doc.populate(this.buildPopulatePaths(filteredPopulate, session ?? undefined));
    }

    return this.toEntity({ doc, requester });
  }

  /**
   * Finds one document by ID.
   */
  async findById({
    requester,
    request,
    previousSession,
  }: {
    requester: AuthUserEntity;
    request: TFindOneRequest & { populate?: string };
    previousSession?: BaseSessionPort;
  }): Promise<TEntity | null> {
    try {
      return await this.findByIdOrThrow({ requester, request, previousSession });
    } catch (error) {
      if (error instanceof NotFoundException) {
        return null;
      }
      throw error;
    }
  }

  private async _partialUpdateTransactionFn({
    requester,
    request,
    session,
  }: {
    requester: AuthUserEntity;
    request: TPartialUpdateRequest & { populate?: string };
    session: ClientSession;
  }): Promise<TEntity> {
    const existing = await this.model.findOne(
      {
        _id: request.id,
        ownerOrganization: this.getOwnerOrganization({ requester }),
        deletedAt: null,
      },
    ).session(session);

    if (!existing) {
      throw new NotFoundException(
        `Recurso do tipo ${this.model.modelName} com id ${request.id} não foi encontrado.`,
      );
    }

    // Use deepmerge with custom configuration to not merge arrays
    const merged = deepmergeCustom<
      unknown,
      {
        DeepMergeArraysURI: DeepMergeLeafURI;
      }
    >({
      mergeArrays: false,
    })(existing.toObject(), request.data);

    Object.assign(existing, merged);

    await existing.save({ session });

    const filteredPopulate = this.filterPopulate(request.populate);
    if (filteredPopulate) {
      await existing.populate(this.buildPopulatePaths(filteredPopulate, session));
    }

    return this.toEntity({ doc: existing, requester });
  }

  private async _partialUpdate({
    requester,
    request,
    session,
  }: {
    requester: AuthUserEntity;
    request: TPartialUpdateRequest & { populate?: string };
    session: ClientSession;
  }): Promise<TEntity> {
    if (session.inTransaction()) {
      return await this._partialUpdateTransactionFn({
        requester,
        request,
        session,
      });
    } else {
      return await session.withTransaction(async () => {
        return await this._partialUpdateTransactionFn({
          requester,
          request,
          session,
        });
      });
    }
  }

  /**
   * Partially updates a document by ID. Throws an NotFoundException if the document is not found.
   */
  async partialUpdateOrThrow({
    requester,
    request,
    previousSession,
  }: {
    requester: AuthUserEntity;
    request: TPartialUpdateRequest & { populate?: string };
    previousSession?: BaseSessionPort;
  }): Promise<TEntity> {
    if (previousSession) {
      return await this._partialUpdate({
        requester,
        request,
        session: previousSession.getSession() as ClientSession,
      });
    } else {
      const session = await this.model.db.startSession();
      let result: TEntity;
      try {
        result = await this._partialUpdate({
          requester,
          request,
          session: session,
        });
      } finally {
        await session.endSession();
      }
      return result;
    }
  }

  /**
   * Partially updates a document by ID.
   */
  async partialUpdate({
    requester,
    request,
    previousSession,
  }: {
    requester: AuthUserEntity;
    request: TPartialUpdateRequest & { populate?: string };
    previousSession?: BaseSessionPort;
  }): Promise<TEntity | null> {
    try {
      return await this.partialUpdateOrThrow({
        requester,
        request,
        previousSession,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        return null;
      }
      throw error;
    }
  }

  /**
   * Removes a document by ID. Throws an NotFoundException if the document is not found.
   */
  async removeOrThrow({
    requester,
    request,
    previousSession,
  }: {
    requester: AuthUserEntity;
    request: { id: string };
    previousSession?: BaseSessionPort;
  }): Promise<void> {
    const session = previousSession
      ? (previousSession.getSession() as ClientSession)
      : undefined;

    const doc = await this.model.findOneAndUpdate(
      {
        _id: request.id,
        ownerOrganization: this.getOwnerOrganization({ requester }),
        deletedAt: null,
      },
      { $set: { deletedAt: new Date() } },
      {
        session,
      },
    );

    if (!doc) {
      throw new NotFoundException(
        `Recurso do tipo ${this.model.modelName} com id ${request.id} não foi encontrado.`,
      );
    }
  }

  /**
   * Removes a document by ID.
   */
  async remove({
    requester,
    request,
    previousSession,
  }: {
    requester: AuthUserEntity;
    request: { id: string };
    previousSession?: BaseSessionPort;
  }): Promise<void> {
    try {
      await this.removeOrThrow({ requester, request, previousSession });
    } catch (error) {
      if (error instanceof NotFoundException) {
        return;
      }
      throw error;
    }
  }

  protected getTextSearchPipeline({
    requester,
    textSearchTerm,
    indexName = 'text_search_index',
    stringSearchableFields,
  }: {
    requester: AuthUserEntity;
    textSearchTerm: string;
    indexName?: string;
    stringSearchableFields: {
      path: string;
      sanitizer: (rawValue: string | null | undefined) => string | undefined;
    }[];
  }): PipelineStage {
    return {
      $search: {
        index: indexName,
        compound: {
          filter: [
            {
              equals: {
                path: 'ownerOrganization',
                value: this.getOwnerOrganization({ requester }),
              },
            },
          ],
          should: [
            {
              text: {
                query: textSearchTerm,
                path: stringSearchableFields.map(({ path }) => path),
                fuzzy: {},
              },
            },
            ...stringSearchableFields
              .map(({ path, sanitizer }) => {
                const sanitized = sanitizer(textSearchTerm);
                if (sanitized === undefined || sanitized === '') return null;
                return {
                  regex: {
                    query: `.*${escapeRegex(sanitized)}.*`,
                    path,
                    allowAnalyzedField: true,
                  },
                };
              })
              .filter(Boolean),
            ...(ObjectId.isValid(textSearchTerm)
              ? [
                  {
                    equals: {
                      path: '_id',
                      value: ObjectId.createFromHexString(textSearchTerm),
                    },
                  },
                ]
              : []),
          ],
          minimumShouldMatch: 1,
        },
      },
    } as PipelineStage;
  }

  protected getSemanticSearchPipeline({
    requester,
    indexName = 'semantic_search_index',
    queryVector,
    path,
    limit,
  }: {
    requester: AuthUserEntity;
    indexName?: string;
    queryVector: number[];
    path: string;
    limit: number;
  }): PipelineStage {
    return {
      $vectorSearch: {
        index: indexName,
        path,
        queryVector,
        numCandidates: Math.min(10 * limit, 10000), // Limit to 10000 candidates for performance
        limit,
        filter: {
          $and: [
            {
              ownerOrganization: this.getOwnerOrganization({ requester }),
              deletedAt: null,
            },
          ],
        },
      },
    };
  }

  async findAllWithOutdatedMarkdownEmbedding({
    limit,
    deltaDurationToConsiderAsOutdated,
    previousSession,
    lastRunAt,
  }: {
    limit: number;
    deltaDurationToConsiderAsOutdated: Duration;
    previousSession?: BaseSessionPort;
    lastRunAt?: Date;
  }): Promise<{id: string, ownerOrganization: string}[]> {
    const session = previousSession
      ? (previousSession.getSession() as ClientSession)
      : null;

    const currentDate = new Date();
    const thresholdDate = new Date(currentDate.getTime() - deltaDurationToConsiderAsOutdated.toMillis());
    const minUpdatedAt = lastRunAt ? new Date(lastRunAt.getTime() - 2 * deltaDurationToConsiderAsOutdated.toMillis()) : undefined;

    const pipeline: PipelineStage[] = [
      {
        $match: {
          deletedAt: null,
          ...(minUpdatedAt ? { updatedAt: { $gte: minUpdatedAt } } : {}),
        },
      },
      {
        $match: {
          $or: [
            {
              $and: [
                {
                  $or: [
                    { markdownEmbeddingUpdatedAt: null },
                    { markdownEmbeddingUpdatedAt: { $exists: false } },
                  ],
                },
                { updatedAt: { $lt: thresholdDate } },
              ],
            },
            {
              markdownEmbeddingUpdatedAt: { $ne: null, $exists: true },
              $expr: {
                $gt: [
                  { $subtract: ['$updatedAt', '$markdownEmbeddingUpdatedAt'] },
                  deltaDurationToConsiderAsOutdated.toMillis(),
                ],
              },
            },
          ],
        },
      },
      { $project: { _id: 1, ownerOrganization: 1 } },
      { $limit: limit },
    ];

    const aggregateQuery = this.model.aggregate<{ _id: ObjectId, ownerOrganization: string }>(pipeline);
    if (session) {
      aggregateQuery.session(session);
    }
    const outdateds = await aggregateQuery;

    return outdateds.map((doc) => ({ id: doc._id.toString(), ownerOrganization: doc.ownerOrganization }));
  } 
}
