import { Model, Document, ClientSession, PopulateOptions } from 'mongoose';
import { NotFoundException, LoggerService } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { BaseConfigEntity } from '@app/config/base-config.entity';
import { Base } from '@app/base';
import { DeepMergeLeafURI, deepmergeCustom } from 'deepmerge-ts';
import { BaseSessionPort } from '@app/database/base-session.port';
import { BaseMongoDbSessionAdapter } from '@app/database/base-mongodb-session.adapter';
import { BaseSessionStarterPort } from '@app/database/base-session-starter.port';
import { DeepPartial } from '@app/utils/deep-partial.type';

export abstract class BaseDefaultMongoDbRepositoryAdapter<
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
  protected abstract toEntity(doc: TDoc): TEntity;

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


  protected buildPopulatePaths(populate: string, session?: ClientSession | null): PopulateOptions[] {
    return populate.split(',').map((field) => ({
      path: field.trim(),
      options: session ? { session } : undefined,
    }));
  }

  /**
   * Creates a new document in the collection.
   */
  async create({
    request,
    previousSession,
  }: {
    request: TCreateRequest & { populate?: string };
    previousSession?: BaseSessionPort;
  }): Promise<TEntity> {
    const session = previousSession
      ? (previousSession.getSession() as ClientSession)
      : null;

    const created = await this.model.insertOne({
      ...request.data,
    }, { session });

    const filteredPopulate = this.filterPopulate(request.populate);
    if (filteredPopulate) {
      await created.populate(this.buildPopulatePaths(filteredPopulate, session));
    }

    return this.toEntity(created);
  }

  /**
   * Finds one document by ID. Throws an NotFoundException if the document is not found.
   */
  async findByIdOrThrow({
    request,
    previousSession,
    maxTimeMS = 2000,
  }: {
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

    return this.toEntity(doc);
  }

  /**
   * Finds one document by ID.
   */
  async findById({
    request,
    previousSession,
  }: {
    request: TFindOneRequest & { populate?: string };
    previousSession?: BaseSessionPort;
  }): Promise<TEntity | null> {
    try {
      return await this.findByIdOrThrow({ request, previousSession });
    } catch (error) {
      if (error instanceof NotFoundException) {
        return null;
      }
      throw error;
    }
  }

  private async _partialUpdateTransactionFn({
    request,
    session,
  }: {
    request: TPartialUpdateRequest & { populate?: string };
    session: ClientSession;
  }): Promise<TEntity> {
    const existing = await this.model.findOne(
      {
        _id: request.id,
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

    return this.toEntity(existing);
  }

  private async _partialUpdate({
    request,
    session,
  }: {
    request: TPartialUpdateRequest & { populate?: string };
    session: ClientSession;
  }): Promise<TEntity> {
    if (session.inTransaction()) {
      return await this._partialUpdateTransactionFn({
        request,
        session,
      });
    } else {
      return await session.withTransaction(async () => {
        return await this._partialUpdateTransactionFn({
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
    request,
    previousSession,
  }: {
    request: TPartialUpdateRequest & { populate?: string };
    previousSession?: BaseSessionPort;
  }): Promise<TEntity> {
    if (previousSession) {
      return await this._partialUpdate({
        request,
        session: previousSession.getSession() as ClientSession,
      });
    } else {
      const session = await this.model.db.startSession();
      let result: TEntity;
      try {
        result = await this._partialUpdate({
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
    request,
    previousSession,
  }: {
    request: TPartialUpdateRequest & { populate?: string };
    previousSession?: BaseSessionPort;
  }): Promise<TEntity | null> {
    try {
      return await this.partialUpdateOrThrow({ request, previousSession });
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
    request,
    previousSession,
  }: {
    request: { id: string };
    previousSession?: BaseSessionPort;
  }): Promise<void> {
    const session = previousSession
      ? (previousSession.getSession() as ClientSession)
      : undefined;

    const doc = await this.model.findOneAndUpdate(
      {
        _id: request.id,
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
    request,
    previousSession,
  }: {
    request: { id: string };
    previousSession?: BaseSessionPort;
  }): Promise<void> {
    try {
      await this.removeOrThrow({ request, previousSession });
    } catch (error) {
      if (error instanceof NotFoundException) {
        return;
      }
      throw error;
    }
  }
}
