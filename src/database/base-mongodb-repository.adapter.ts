import { Model, Document } from 'mongoose';
import { NotFoundException, LoggerService } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { BaseConfigEntity } from '../config/base-config.entity';
import { AuthUserEntity } from '../auth/entities/auth-user.entity';
import { Base } from '../base';
import { Log } from '../utils/log.utils';
import { DeepMergeLeafURI, deepmergeCustom } from "deepmerge-ts";

export abstract class BaseMongoDbRepositoryAdapter<
  TDoc extends Document,
  TEntity,
  TCreateRequest extends { data: Partial<TDoc> },
  TFindOneRequest extends { id: string },
  TPartialUpdateRequest extends { id: string; data: Partial<TDoc> },
> extends Base {
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

  /**
   * Creates a new document in the collection.
   */
  @Log()
  async create({
    requester,
    request,
  }: {
    requester: AuthUserEntity;
    request: TCreateRequest & { populate?: string };
  }): Promise<TEntity> {
    const created = new this.model({
      ...request.data,
      organization: requester.org,
      createdByUser: requester.id,
      createdByOrganization: requester.org,
    });

    let saved = await created.save();

    if (request.populate) {
      saved = await saved.populate(request.populate.split(','));
    }

    return this.toEntity(saved);
  }

  /**
   * Finds one document by ID.
   */
  @Log()
  async findOne({
    requester,
    request,
  }: {
    requester: AuthUserEntity;
    request: TFindOneRequest & { populate?: string };
  }): Promise<TEntity> {
    const doc = await this.model.findOne({
      _id: request.id,
      organization: requester.org,
    });

    if (!doc) {
      throw new NotFoundException('Recurso não encontrado.');
    }

    if (request.populate) {
      await doc.populate(request.populate.split(','));
    }

    return this.toEntity(doc);
  }

  /**
   * Partially updates a document by ID.
   */
  @Log()
  async partialUpdate({
    requester,
    request,
  }: {
    requester: AuthUserEntity;
    request: TPartialUpdateRequest & { populate?: string };
  }): Promise<TEntity> {
    const session = await this.model.db.startSession();
    
    try {
      let updated = await session.withTransaction(async () => {
        const existing = await this.model.findOne({
          _id: request.id,
          organization: requester.org,
        }).session(session);

        if (!existing) {
          throw new NotFoundException('Recurso não encontrado.');
        }

        // Use deepmerge with custom configuration to not merge arrays
        const merged = deepmergeCustom<unknown, {
          DeepMergeArraysURI: DeepMergeLeafURI;
        }>({
          mergeArrays: false,
        })(existing.toObject(), request.data);
        
        Object.assign(existing, merged);
        await existing.save({ session });

        if (request.populate) {
          await existing.populate(request.populate.split(','));
        }

        return existing;
      });

      if (!updated) {
        throw new NotFoundException('Recurso não encontrado.');
      }

      return this.toEntity(updated);
    } finally {
      await session.endSession();
    }
  }

  /**
   * Removes a document by ID.
   */
  @Log()
  async remove({
    requester,
    request,
  }: {
    requester: AuthUserEntity;
    request: { id: string };
  }): Promise<void> {
    await this.model.findOneAndDelete({
      _id: request.id,
      organization: requester.org,
    });
  }
}
