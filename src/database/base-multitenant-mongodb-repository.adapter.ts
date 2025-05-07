import { Model, Document, ClientSession, PipelineStage } from 'mongoose';
import { NotFoundException, LoggerService } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { BaseConfigEntity } from '@app/config/base-config.entity';
import { AuthUserEntity } from '@app/auth/entities/auth-user.entity';
import { Base } from '@app/base';
import { Log } from '@app/utils/log.utils';
import { DeepMergeLeafURI, deepmergeCustom } from 'deepmerge-ts';
import { BaseSessionPort } from '@app/database/base-session.port';
import { BaseMongoDbSessionAdapter } from '@app/database/base-mongodb-session.adapter';
import { BaseSessionStarterPort } from '@app/database/base-session-starter.port';
import { ObjectId } from 'mongodb';
import { escapeRegex } from '@app/utils/regex.utils';
import { Duration } from 'luxon';

export abstract class BaseMultitenantMongoDbRepositoryAdapter<
    TDoc extends Document,
    TEntity,
    TCreateRequest extends { data: Partial<TDoc> },
    TFindOneRequest extends { id: string },
    TPartialUpdateRequest extends { id: string; data: Partial<TDoc> },
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
  protected abstract toEntity(doc: TDoc): TEntity;

  @Log()
  protected getOwnerOrganization({
    requester,
  }: {
    requester: AuthUserEntity;
  }): string {
    return requester.getOrganizationOrThrow().id;
  }

  @Log()
  async startSession(): Promise<BaseSessionPort> {
    return new BaseMongoDbSessionAdapter(
      await this.model.db.startSession(),
      this.baseConfig,
      this.logger,
      this.cls,
    );
  }

  @Log()
  protected buildPopulatePaths(populate: string, session?: ClientSession) {
    return populate.split(',').map((field) => ({
      path: field.trim(),
      options: session ? { session } : undefined,
    }));
  }

  /**
   * Creates a new document in the collection.
   */
  @Log()
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

    if (request.populate) {
      await created.populate(this.buildPopulatePaths(request.populate, session ?? undefined));
    }

    return this.toEntity(created);
  }

  /**
   * Finds one document by ID. Throws an NotFoundException if the document is not found.
   */
  @Log()
  async findByIdOrThrow({
    requester,
    request,
    previousSession,
  }: {
    requester: AuthUserEntity;
    request: TFindOneRequest & { populate?: string };
    previousSession?: BaseSessionPort;
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
    ).session(session);

    if (!doc) {
      throw new NotFoundException(
        `Recurso do tipo ${this.model.modelName} com id ${request.id} não foi encontrado.`,
      );
    }

    if (request.populate) {
      await doc.populate(this.buildPopulatePaths(request.populate, session ?? undefined));
    }

    return this.toEntity(doc);
  }

  /**
   * Finds one document by ID.
   */
  @Log()
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

  @Log()
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

    if (request.populate) {
      await existing.populate(this.buildPopulatePaths(request.populate, session));
    }

    return this.toEntity(existing);
  }

  @Log()
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
  @Log()
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
  @Log()
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
  @Log()
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
  @Log()
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

  @Log()
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

  @Log()
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
        numCandidates: 100,
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

  @Log()
  async findAllWithOutdatedMarkdownEmbedding({
    limit,
    deltaDurationToConsiderAsOutdated,
    previousSession,
  }: {
    limit: number;
    deltaDurationToConsiderAsOutdated: Duration;
    previousSession?: BaseSessionPort;
  }): Promise<TEntity[]> {
    const session = previousSession
      ? (previousSession.getSession() as ClientSession)
      : null;

    const currentDate = new Date();
    const thresholdDate = new Date(currentDate.getTime() - deltaDurationToConsiderAsOutdated.toMillis());

    const outdateds = await this.model.find({
      $or: [
        // Condition 1: markdownEmbeddingUpdatedAt is null and updatedAt is older than threshold
        {
          markdownEmbeddingUpdatedAt: null,
          updatedAt: { $lt: thresholdDate }
        },
        // Condition 2: markdownEmbeddingUpdatedAt is older than updatedAt with minimum delta duration
        {
          markdownEmbeddingUpdatedAt: { $ne: null },
          $expr: {
            $and: [
              { $gt: ["$updatedAt", "$markdownEmbeddingUpdatedAt"] },
              { 
                $gt: [
                  { $subtract: ["$updatedAt", "$markdownEmbeddingUpdatedAt"] },
                  deltaDurationToConsiderAsOutdated.toMillis()
                ]
              }
            ]
          }
        }
      ],
      deletedAt: null
    })
    .limit(limit)
    .session(session);

    return outdateds.map(this.toEntity.bind(this));
  } 
}
