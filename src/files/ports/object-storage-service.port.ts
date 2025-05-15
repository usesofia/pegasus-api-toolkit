import { AuthUserEntity } from '@app/auth/entities/auth-user.entity';
import type { FileType } from '@app/files/entities/file.entity';
import type { Writable } from 'stream';

export const OBJECT_STORAGE_SERVICE_PORT = Symbol('ObjectStorageServicePort');

export interface ObjectStorageServicePort {
  createStream({ objectName }: { objectName: string }): Writable;

  createSignedUploadUrl({
    objectName,
    mimeType,
    expiresInMinutes,
  }: {
    objectName: string;
    mimeType: string;
    expiresInMinutes?: number;
  }): Promise<string>;

  createSignedDownloadUrl({
    objectName,
    expiresInMinutes,
  }: {
    objectName: string;
    expiresInMinutes?: number;
  }): Promise<string>;

  getObjectSize({ objectName }: { objectName: string }): Promise<number>;

  createManySignedDownloadUrls({
    objectNames,
    expiresInMinutes,
  }: {
    objectNames: string[];
    expiresInMinutes?: number;
  }): Promise<string[]>;

  generateUniqueObjectName({
    requester,
    fileType,
    originalFileName,
  }: {
    requester: AuthUserEntity;
    fileType: FileType;
    originalFileName: string;
  }): string;
}
