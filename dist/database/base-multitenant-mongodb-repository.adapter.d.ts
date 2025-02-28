import { Model, Document } from 'mongoose';
import { LoggerService } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { BaseConfigEntity } from '@app/config/base-config.entity';
import { AuthUserEntity } from '@app/auth/entities/auth-user.entity';
import { Base } from '@app/base';
import { BaseSessionPort } from '@app/database/base-session.port';
import { BaseSessionStarterPort } from '@app/database/base-session-starter.port';
export declare abstract class BaseMultitenantMongoDbRepositoryAdapter<TDoc extends Document, TEntity, TCreateRequest extends {
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
    protected getOwnerOrganization({ requester, }: {
        requester: AuthUserEntity;
    }): string;
    startSession(): Promise<BaseSessionPort>;
    create({ requester, request, previousSession, }: {
        requester: AuthUserEntity;
        request: TCreateRequest & {
            populate?: string;
        };
        previousSession?: BaseSessionPort;
    }): Promise<TEntity>;
    findByIdOrThrow({ requester, request, previousSession, }: {
        requester: AuthUserEntity;
        request: TFindOneRequest & {
            populate?: string;
        };
        previousSession?: BaseSessionPort;
    }): Promise<TEntity>;
    findById({ requester, request, previousSession, }: {
        requester: AuthUserEntity;
        request: TFindOneRequest & {
            populate?: string;
        };
        previousSession?: BaseSessionPort;
    }): Promise<TEntity | null>;
    private _partialUpdateTransactionFn;
    private _partialUpdate;
    partialUpdateOrThrow({ requester, request, previousSession, }: {
        requester: AuthUserEntity;
        request: TPartialUpdateRequest & {
            populate?: string;
        };
        previousSession?: BaseSessionPort;
    }): Promise<TEntity>;
    partialUpdate({ requester, request, previousSession, }: {
        requester: AuthUserEntity;
        request: TPartialUpdateRequest & {
            populate?: string;
        };
        previousSession?: BaseSessionPort;
    }): Promise<TEntity | null>;
    removeOrThrow({ requester, request, previousSession, }: {
        requester: AuthUserEntity;
        request: {
            id: string;
        };
        previousSession?: BaseSessionPort;
    }): Promise<void>;
    remove({ requester, request, previousSession, }: {
        requester: AuthUserEntity;
        request: {
            id: string;
        };
        previousSession?: BaseSessionPort;
    }): Promise<void>;
}
