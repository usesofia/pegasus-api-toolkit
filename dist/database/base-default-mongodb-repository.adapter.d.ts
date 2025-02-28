import { Model, Document } from 'mongoose';
import { LoggerService } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { BaseConfigEntity } from '@app/config/base-config.entity';
import { Base } from '@app/base';
import { BaseSessionPort } from '@app/database/base-session.port';
import { BaseSessionStarterPort } from '@app/database/base-session-starter.port';
import { DeepPartial } from '@app/utils/deep-partial.type';
export declare abstract class BaseDefaultMongoDbRepositoryAdapter<TDoc extends Document, TEntity, TCreateRequest extends {
    data: DeepPartial<TDoc>;
}, TFindOneRequest extends {
    id: string;
}, TPartialUpdateRequest extends {
    id: string;
    data: DeepPartial<TDoc>;
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
    findByIdOrThrow({ request, previousSession, }: {
        request: TFindOneRequest & {
            populate?: string;
        };
        previousSession?: BaseSessionPort;
    }): Promise<TEntity>;
    findById({ request, previousSession, }: {
        request: TFindOneRequest & {
            populate?: string;
        };
        previousSession?: BaseSessionPort;
    }): Promise<TEntity | null>;
    private _partialUpdateTransactionFn;
    private _partialUpdate;
    partialUpdateOrThrow({ request, previousSession, }: {
        request: TPartialUpdateRequest & {
            populate?: string;
        };
        previousSession?: BaseSessionPort;
    }): Promise<TEntity>;
    partialUpdate({ request, previousSession, }: {
        request: TPartialUpdateRequest & {
            populate?: string;
        };
        previousSession?: BaseSessionPort;
    }): Promise<TEntity | null>;
    removeOrThrow({ request, previousSession, }: {
        request: {
            id: string;
        };
        previousSession?: BaseSessionPort;
    }): Promise<void>;
    remove({ request, previousSession, }: {
        request: {
            id: string;
        };
        previousSession?: BaseSessionPort;
    }): Promise<void>;
}
