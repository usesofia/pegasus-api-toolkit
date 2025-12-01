import { Model, Document, ClientSession, PipelineStage, PopulateOptions } from 'mongoose';
import { LoggerService } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { BaseConfigEntity } from '../config/base-config.entity';
import { AuthUserEntity } from '../auth/entities/auth-user.entity';
import { Base } from '../base';
import { BaseSessionPort } from '../database/base-session.port';
import { BaseSessionStarterPort } from '../database/base-session-starter.port';
import { Duration } from 'luxon';
import { DeepPartial } from '../utils/deep-partial.type';
export declare abstract class BaseMultitenantMongoDbRepositoryAdapter<TDoc extends Document, TEntity, TCreateRequest extends {
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
    protected abstract toEntity({ doc, requester, }: {
        doc: TDoc;
        requester?: AuthUserEntity;
    }): Promise<TEntity>;
    protected getOwnerOrganization({ requester, }: {
        requester: AuthUserEntity;
    }): string;
    protected filterPopulate(populate: string | undefined): string | undefined;
    startSession(): Promise<BaseSessionPort>;
    protected buildPopulatePaths(populate: string, session?: ClientSession): PopulateOptions[];
    create({ requester, request, previousSession, }: {
        requester: AuthUserEntity;
        request: TCreateRequest & {
            populate?: string;
        };
        previousSession?: BaseSessionPort;
    }): Promise<TEntity>;
    findByIdOrThrow({ requester, request, previousSession, maxTimeMS, }: {
        requester: AuthUserEntity;
        request: TFindOneRequest & {
            populate?: string;
        };
        previousSession?: BaseSessionPort;
        maxTimeMS?: number;
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
    protected getTextSearchPipeline({ requester, textSearchTerm, indexName, stringSearchableFields, }: {
        requester: AuthUserEntity;
        textSearchTerm: string;
        indexName?: string;
        stringSearchableFields: {
            path: string;
            sanitizer: (rawValue: string | null | undefined) => string | undefined;
        }[];
    }): PipelineStage;
    protected getSemanticSearchPipeline({ requester, indexName, queryVector, path, limit, }: {
        requester: AuthUserEntity;
        indexName?: string;
        queryVector: number[];
        path: string;
        limit: number;
    }): PipelineStage;
    findAllWithOutdatedMarkdownEmbedding({ limit, deltaDurationToConsiderAsOutdated, previousSession, lastRunAt, }: {
        limit: number;
        deltaDurationToConsiderAsOutdated: Duration;
        previousSession?: BaseSessionPort;
        lastRunAt?: Date;
    }): Promise<{
        id: string;
        ownerOrganization: string;
    }[]>;
}
