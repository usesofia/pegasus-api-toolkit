import { AuthUserEntity } from '@app/auth/entities/auth-user.entity';
import { Base } from '@app/base';
import { BASE_CONFIG, BaseConfigEntity } from '@app/config/base-config.entity';
import type { FileType } from '@app/files/entities/file.entity';
import { type ObjectStorageServicePort } from '@app/files/ports/object-storage-service.port';
import { LOGGER_SERVICE_PORT } from '@app/logger/logger.module';
import { Storage } from '@google-cloud/storage';
import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { DateTime } from 'luxon';
import { ClsService } from 'nestjs-cls';
import type { Readable, Writable } from 'stream';
import { v4 } from 'uuid';
import { z } from 'zod';

@Injectable()
export class GcsObjectStorageServiceAdapter extends Base implements ObjectStorageServicePort {
  private storage: Storage;
  private bucketName: string;

  constructor(
    @Inject(BASE_CONFIG) protected readonly baseConfig: BaseConfigEntity,
    @Inject(LOGGER_SERVICE_PORT) protected readonly logger: LoggerService,
    protected readonly cls: ClsService,
  ) {
    super(GcsObjectStorageServiceAdapter.name, baseConfig, logger, cls);
    this.bucketName = baseConfig.objectStorage.organizationFilesBucket.name;
    this.storage = new Storage({
      projectId: baseConfig.objectStorage.organizationFilesBucket.projectId,
      credentials: {
        client_email: baseConfig.objectStorage.organizationFilesBucket.clientEmail,
        private_key: baseConfig.objectStorage.organizationFilesBucket.privateKey,
        audience: baseConfig.objectStorage.organizationFilesBucket.audience,
        subject_token_type: baseConfig.objectStorage.organizationFilesBucket.subjectTokenType,
      },
    });
  }

  createWritableStream({ objectName }: { objectName: string }): Writable {
    return this.storage.bucket(this.bucketName).file(objectName).createWriteStream();
  }

  createReadableStream({ objectName }: { objectName: string }): Readable {
    return this.storage.bucket(this.bucketName).file(objectName).createReadStream();
  }

  async createSignedUploadUrl({
    objectName,
    mimeType,
    expiresInMinutes = 15,
  }: {
    requester: AuthUserEntity;
    objectName: string;
    mimeType: string;
    expiresInMinutes?: number;
  }): Promise<string> {
    const [url] = await this.storage
      .bucket(this.bucketName)
      .file(objectName)
      .getSignedUrl({
        version: 'v4',
        action: 'write',
        expires: DateTime.now().plus({ minutes: expiresInMinutes }).toJSDate(),
        contentType: mimeType,
      });

    return url;
  }

  async createSignedDownloadUrl({
    objectName,
    expiresInMinutes = 60 * 24,
  }: {
    objectName: string;
    expiresInMinutes?: number;
  }): Promise<string> {
    const [url] = await this.storage
      .bucket(this.bucketName)
      .file(objectName)
      .getSignedUrl({
        version: 'v4',
        action: 'read',
        expires: DateTime.now().plus({ minutes: expiresInMinutes }).toJSDate(),
      });

    return url;
  }

  async getObjectSize({ objectName }: { objectName: string }): Promise<number> {
    const [metadata] = await this.storage.bucket(this.bucketName).file(objectName).getMetadata();
    return z.number({ coerce: true }).parse(metadata.size);
  }

  async createManySignedDownloadUrls({
    objectNames,
    expiresInMinutes,
  }: {
    objectNames: string[];
    expiresInMinutes?: number;
  }): Promise<string[]> {
    // TODO: Enhance this to make only one request to the storage.
    return await Promise.all(
      objectNames.map((objectName) => this.createSignedDownloadUrl({ objectName, expiresInMinutes })),
    );
  }

  generateUniqueObjectName({
    requester,
    fileType,
    originalFileName,
  }: {
    requester: AuthUserEntity;
    fileType: FileType;
    originalFileName: string;
  }): string {
    return `${requester.getOrganizationOrThrow().id}/${fileType}/${v4()}/${originalFileName}`;
  }

  extractObjectNameFromUrl({ url }: { url: string }): string {
    const urlObject = new URL(url);
    return urlObject.pathname.split('/').slice(2).join('/');
  }
}
