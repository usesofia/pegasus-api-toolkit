import { Model, Document, ClientSession } from 'mongoose';
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
    return requester.organization!.id;
  }

  @Log()
  async startSession(): Promise<BaseSessionPort> {
    return new BaseMongoDbSessionAdapter(await this.model.db.startSession(), this.baseConfig, this.logger, this.cls);
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
    const created = new this.model({
      ...request.data,
      ownerOrganization: this.getOwnerOrganization({ requester }),
    });

    let saved = await created.save({
      session: previousSession ? previousSession.getSession() as ClientSession : null,
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
    requester,
    request,
    previousSession,
  }: {
    requester: AuthUserEntity;
    request: TFindOneRequest & { populate?: string };
    previousSession?: BaseSessionPort;
  }): Promise<TEntity> {
    const doc = await this.model
      .findOne({
        _id: request.id,
        ownerOrganization: this.getOwnerOrganization({ requester }),
      })
      .session(previousSession ? previousSession.getSession() as ClientSession : null);

    if (!doc) {
      throw new NotFoundException('Recurso não encontrado.');
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
    requester,
    request,
    previousSession,
  }: {
    requester: AuthUserEntity;
    request: TFindOneRequest & { populate?: string };
    previousSession?: BaseSessionPort;
  }): Promise<TEntity | null> {
    const doc = await this.model
      .findOne({
        _id: request.id,
        ownerOrganization: this.getOwnerOrganization({ requester }),
      })
      .session(previousSession ? previousSession.getSession() as ClientSession : null);

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
    requester,
    request,
    session,
  }: {
    requester: AuthUserEntity;
    request: TPartialUpdateRequest & { populate?: string };
    session: ClientSession;
  }): Promise<TEntity> {
    const existing = await this.model
      .findOne({
        _id: request.id,
        ownerOrganization: this.getOwnerOrganization({ requester }),
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
    const doc = await this.model
      .findOneAndDelete({
        _id: request.id,
        ownerOrganization: this.getOwnerOrganization({ requester }),
      })
      .session(previousSession ? previousSession.getSession() as ClientSession : null);

    if (!doc) {
      throw new NotFoundException('Recurso não encontrado.');
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
    await this.model
      .findOneAndDelete({
        _id: request.id,
        ownerOrganization: this.getOwnerOrganization({ requester }),
      })
      .session(previousSession ? previousSession.getSession() as ClientSession : null);
  }
}
