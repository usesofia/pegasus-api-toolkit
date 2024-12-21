import { Model, Document } from 'mongoose';
import { LoggerService } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { Base } from '../base';
import { BaseConfigEntity } from '../config/base-config.entity';
import { AuthUserEntity } from '../auth/entities/auth-user.entity';
export declare abstract class BaseMongoDbRepositoryAdapter<TDoc extends Document, TEntity, TCreateRequest extends {
    data: Partial<TDoc>;
}, TFindOneRequest extends {
    id: string;
}, TPartialUpdateRequest extends {
    id: string;
    data: Partial<TDoc>;
}> extends Base {
    protected readonly baseConfig: BaseConfigEntity;
    protected readonly logger: LoggerService;
    protected readonly cls: ClsService;
    protected readonly model: Model<TDoc>;
    constructor(className: string, baseConfig: BaseConfigEntity, logger: LoggerService, cls: ClsService, model: Model<TDoc>);
    protected abstract toEntity(doc: TDoc): TEntity;
    create({ requester, request, }: {
        requester: AuthUserEntity;
        request: TCreateRequest & {
            populate?: string;
        };
    }): Promise<TEntity>;
    findOne({ requester, request, }: {
        requester: AuthUserEntity;
        request: TFindOneRequest & {
            populate?: string;
        };
    }): Promise<TEntity>;
    partialUpdate({ requester, request, }: {
        requester: AuthUserEntity;
        request: TPartialUpdateRequest & {
            populate?: string;
        };
    }): Promise<TEntity>;
    remove({ requester, request, }: {
        requester: AuthUserEntity;
        request: {
            id: string;
        };
    }): Promise<void>;
}
