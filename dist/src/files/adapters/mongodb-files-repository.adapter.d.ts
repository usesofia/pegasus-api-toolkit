import type { CreateFileRequestEntity } from '../../files/entities/create-file-request.entity';
import { BaseFileEntity } from '../../files/entities/file.entity';
import type { FindByIdFileRequestEntity } from '../../files/entities/find-by-id-file-request.entity';
import type { PartialUpdateFileRequestEntity } from '../../files/entities/partial-update-file-request.entity';
import { MongoDbFileModel } from '../../files/models/mongodb-file.model';
import { FilesRepositoryPort } from '../../files/ports/files-repository.port';
import { LoggerService } from '@nestjs/common';
import { BaseMultitenantMongoDbRepositoryAdapter } from '../../database/base-multitenant-mongodb-repository.adapter';
import { Model } from 'mongoose';
import { ClsService } from 'nestjs-cls';
import { BaseConfigEntity } from '../../config/base-config.entity';
import { AuthUserEntity } from '../../auth/entities/auth-user.entity';
import { BaseSessionPort } from '../../database/base-session.port';
export declare class MongoDbFilesRepositoryAdapter extends BaseMultitenantMongoDbRepositoryAdapter<MongoDbFileModel, BaseFileEntity, CreateFileRequestEntity, FindByIdFileRequestEntity, PartialUpdateFileRequestEntity> implements FilesRepositoryPort {
    protected readonly baseConfig: BaseConfigEntity;
    protected readonly logger: LoggerService;
    protected readonly cls: ClsService;
    constructor(baseConfig: BaseConfigEntity, logger: LoggerService, cls: ClsService, fileModel: Model<MongoDbFileModel>);
    protected getOwnerOrganization({ requester, }: {
        requester: AuthUserEntity;
    }): string;
    toEntity({ doc, }: {
        doc: MongoDbFileModel;
    }): Promise<BaseFileEntity>;
    systemFindByIdOrThrow({ id, previousSession }: {
        id: string;
        previousSession?: BaseSessionPort;
    }): Promise<BaseFileEntity>;
}
