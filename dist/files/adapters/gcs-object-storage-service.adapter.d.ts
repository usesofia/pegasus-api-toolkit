import { BaseConfigEntity } from '../../config/base-config.entity';
import type { FileType } from '../../files/entities/file.entity';
import { type ObjectStorageServicePort } from '../../files/ports/object-storage-service.port';
import { LoggerService } from '@nestjs/common';
import { Base } from '../../base';
import { AuthUserEntity } from '../../auth/entities/auth-user.entity';
import { ClsService } from 'nestjs-cls';
import type { Writable } from 'stream';
export declare class GcsObjectStorageServiceAdapter extends Base implements ObjectStorageServicePort {
    protected readonly baseConfig: BaseConfigEntity;
    protected readonly logger: LoggerService;
    protected readonly cls: ClsService;
    private storage;
    private bucketName;
    constructor(baseConfig: BaseConfigEntity, logger: LoggerService, cls: ClsService);
    createStream({ objectName }: {
        objectName: string;
    }): Writable;
    createSignedUploadUrl({ objectName, mimeType, expiresInMinutes, }: {
        requester: AuthUserEntity;
        objectName: string;
        mimeType: string;
        expiresInMinutes?: number;
    }): Promise<string>;
    createSignedDownloadUrl({ objectName, expiresInMinutes, }: {
        objectName: string;
        expiresInMinutes?: number;
    }): Promise<string>;
    getObjectSize({ objectName }: {
        objectName: string;
    }): Promise<number>;
    createManySignedDownloadUrls({ objectNames, expiresInMinutes, }: {
        objectNames: string[];
        expiresInMinutes?: number;
    }): Promise<string[]>;
    generateUniqueObjectName({ requester, fileType, originalFileName, }: {
        requester: AuthUserEntity;
        fileType: FileType;
        originalFileName: string;
    }): string;
}
