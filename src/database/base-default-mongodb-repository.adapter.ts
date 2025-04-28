import { Model, Document, ClientSession } from 'mongoose';
import { NotFoundException, LoggerService } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { BaseConfigEntity } from '@app/config/base-config.entity';
import { Base } from '@app/base';
import { Log } from '@app/utils/log.utils';
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

  @Log()
  async startSession(): Promise<BaseSessionPort> {
    return new BaseMongoDbSessionAdapter(
      await this.model.db.startSession(),
      this.baseConfig,
      this.logger,
      this.cls,
    );
  }

  /**
   * Creates a new document in the collection.
   */
  @Log()
  async create({
    request,
    previousSession,
  }: {
    request: TCreateRequest & { populate?: string };
    previousSession?: BaseSessionPort;
  }): Promise<TEntity> {
    const created = new this.model({
      ...request.data,
    });

    let saved = await created.save({
      session: previousSession
        ? (previousSession.getSession() as ClientSession)
        : null,
    });

    if (request.populate) {
      saved = await saved.populate(request.populate.split(','));
    }

    return this.toEntity(saved);
  }

  /**
   * Finds one document by ID. Throws an NotFoundException if the document is not found.
   */
  @Log()
  async findByIdOrThrow({
    request,
    previousSession,
  }: {
    request: TFindOneRequest & { populate?: string };
    previousSession?: BaseSessionPort;
  }): Promise<TEntity> {
    const doc = await this.model
      .findOne({
        _id: request.id,
        deletedAt: null,
      })
      .session(
        previousSession
          ? (previousSession.getSession() as ClientSession)
          : null,
      );

    if (!doc) {
      throw new NotFoundException(
        `Recurso do tipo ${this.model.modelName} com id ${request.id} não foi encontrado.`,
      );
    }

    if (request.populate) {
      await doc.populate(request.populate.split(','));
    }

    return this.toEntity(doc);
  }

  /**
   * Finds one document by ID.
   */
  @Log()
  async findById({
    request,
    previousSession,
  }: {
    request: TFindOneRequest & { populate?: string };
    previousSession?: BaseSessionPort;
  }): Promise<TEntity | null> {
    const doc = await this.model
      .findOne({
        _id: request.id,
        deletedAt: null,
      })
      .session(
        previousSession
          ? (previousSession.getSession() as ClientSession)
          : null,
      );

    if (!doc) {
      return null;
    }

    if (request.populate) {
      await doc.populate(request.populate.split(','));
    }

    return this.toEntity(doc);
  }

  @Log()
  private async _partialUpdateTransactionFn({
    request,
    session,
  }: {
    request: TPartialUpdateRequest & { populate?: string };
    session: ClientSession;
  }): Promise<TEntity> {
    const existing = await this.model
      .findOne({
        _id: request.id,
        deletedAt: null,
      })
      .session(session);

    if (!existing) {
      throw new NotFoundException('Recurso não encontrado.');
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
      await existing.populate(request.populate.split(','));
    }

    return this.toEntity(existing);
  }

  @Log()
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
  @Log()
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
  @Log()
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
  @Log()
  async removeOrThrow({
    request,
    previousSession,
  }: {
    request: { id: string };
    previousSession?: BaseSessionPort;
  }): Promise<void> {
    const doc = await this.model
      .findOneAndUpdate(
        {
          _id: request.id,
          deletedAt: null,
        },
        { $set: { deletedAt: new Date() } },
      )
      .session(
        previousSession
          ? (previousSession.getSession() as ClientSession)
          : null,
      );

    if (!doc) {
      throw new NotFoundException('Recurso não encontrado.');
    }
  }

  /**
   * Removes a document by ID.
   */
  @Log()
  async remove({
    request,
    previousSession,
  }: {
    request: { id: string };
    previousSession?: BaseSessionPort;
  }): Promise<void> {
    await this.model
      .findOneAndUpdate(
        {
          _id: request.id,
          deletedAt: null,
        },
        { $set: { deletedAt: new Date() } },
      )
      .session(
        previousSession
          ? (previousSession.getSession() as ClientSession)
          : null,
      );
  }
}
