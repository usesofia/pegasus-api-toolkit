import { BaseConfigEntity } from '../../config/base-config.entity';
import type { ConfirmFileUploadRequestEntity } from '../../files/entities/confirm-file-upload-request.entity';
import type { CreateFileUploadRequestEntity } from '../../files/entities/create-file-upload-request.entity';
import { FileEntity } from '../../files/entities/file.entity';
import type { RemoveFileRequestEntity } from '../../files/entities/remove-file-request.entity';
import { type FilesRepositoryPort } from '../../files/ports/files-repository.port';
import { type BuildableEntity, type FilesServicePort, type PopulatesFile } from '../../files/ports/files-service.port';
import { type ObjectStorageServicePort } from '../../files/ports/object-storage-service.port';
import { LoggerService } from '@nestjs/common';
import { AuthUserEntity } from '../../auth/entities/auth-user.entity';
import { ClsService } from 'nestjs-cls';
import { Base } from '../../base';
export declare class FilesServiceAdapter extends Base implements FilesServicePort {
    protected readonly baseConfig: BaseConfigEntity;
    protected readonly logger: LoggerService;
    protected readonly cls: ClsService;
    private readonly filesRepository;
    private readonly objectStorageService;
    constructor(baseConfig: BaseConfigEntity, logger: LoggerService, cls: ClsService, filesRepository: FilesRepositoryPort, objectStorageService: ObjectStorageServicePort);
    createUploadRequest({ requester, request, }: {
        requester: AuthUserEntity;
        request: CreateFileUploadRequestEntity;
    }): Promise<{
        file: FileEntity;
        uploadUrl: string;
    }>;
    confirmUploadRequest({ requester, request, }: {
        requester: AuthUserEntity;
        request: ConfirmFileUploadRequestEntity;
    }): Promise<FileEntity>;
    removeOrThrow({ requester, request, }: {
        requester: AuthUserEntity;
        request: RemoveFileRequestEntity;
    }): Promise<void>;
    getFilesSignedUrlsOrThrow(files: FileEntity[]): Promise<FileEntity[]>;
    enrichEntityWithFileSignedUrls<T extends PopulatesFile>(entity: T, buildableEntity: BuildableEntity<T>): Promise<T>;
    enrichEntitiesWithFileSignedUrls<T extends PopulatesFile>(entities: T[], buildableEntity: BuildableEntity<T>): Promise<T[]>;
    getSignedUrlFromUrl({ requester, url, }: {
        requester: AuthUserEntity;
        url: string;
    }): Promise<string>;
}
