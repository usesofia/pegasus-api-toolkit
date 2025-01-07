import { Model, Document } from 'mongoose';
import { LoggerService } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { BaseConfigEntity } from '../config/base-config.entity';
import { Base } from '../base';
import { BaseSessionPort } from './base-session.port';
import { BaseSessionStarterPort } from './base-session-starter.port';
export declare abstract class BaseDefaultMongoDbRepositoryAdapter<TDoc extends Document, TEntity, TCreateRequest extends {
    data: Partial<TDoc>;
}, TFindOneRequest extends {
    id: string;
}, TPartialUpdateRequest extends {
    id: string;
    data: Partial<TDoc>;
}> extends Base implements BaseSessionStarterPort {
    protected readonly baseConfig: BaseConfigEntity;
    protected readonly logger: LoggerService;
    protected readonly cls: ClsService;
    protected readonly model: Model<TDoc>;
    constructor(className: string, baseConfig: BaseConfigEntity, logger: LoggerService, cls: ClsService, model: Model<TDoc>);
    protected abstract toEntity(doc: TDoc): TEntity;
    startSession(): Promise<BaseSessionPort>;
    create({ request, previousSession, }: {
        request: TCreateRequest & {
            populate?: string;
        };
        previousSession?: BaseSessionPort;
    }): Promise<TEntity>;
    findOne({ request, previousSession, }: {
        request: TFindOneRequest & {
            populate?: string;
        };
        previousSession?: BaseSessionPort;
    }): Promise<TEntity>;
    private _partialUpdateTransactionFn;
    private _partialUpdate;
    partialUpdate({ request, previousSession, }: {
        request: TPartialUpdateRequest & {
            populate?: string;
        };
        previousSession?: BaseSessionPort;
    }): Promise<TEntity>;
    remove({ request, previousSession, }: {
        request: {
            id: string;
        };
        previousSession?: BaseSessionPort;
    }): Promise<void>;
}
