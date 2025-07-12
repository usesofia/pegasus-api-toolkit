import { AuthUserEntity } from '@app/auth/entities/auth-user.entity';
import { Base } from '@app/base';
import { BaseConfigEntity } from '@app/config/base-config.entity';
import type { FileType } from '@app/files/entities/file.entity';
import { type ObjectStorageServicePort } from '@app/files/ports/object-storage-service.port';
import { LoggerService } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import type { Readable, Writable } from 'stream';
export declare class GcsObjectStorageServiceAdapter extends Base implements ObjectStorageServicePort {
    protected readonly baseConfig: BaseConfigEntity;
    protected readonly logger: LoggerService;
    protected readonly cls: ClsService;
    private storage;
    private bucketName;
    constructor(baseConfig: BaseConfigEntity, logger: LoggerService, cls: ClsService);
    createWritableStream({ objectName }: {
        objectName: string;
    }): Writable;
    createReadableStream({ objectName }: {
        objectName: string;
    }): Readable;
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
    extractObjectNameFromUrl({ url }: {
        url: string;
    }): string;
}
