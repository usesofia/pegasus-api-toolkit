import { ConfirmFileUploadRequestEntity } from '@app/files/entities/confirm-file-upload-request.entity';
import { CreateFileUploadRequestEntity } from '@app/files/entities/create-file-upload-request.entity';
import { FileEntity } from '@app/files/entities/file.entity';
import { RemoveFileRequestEntity } from '@app/files/entities/remove-file-request.entity';
import { AuthUserEntity } from '@app/auth/entities/auth-user.entity';

export const FILES_SERVICE_PORT = Symbol('FilesServicePort');

export interface PopulatesFile {
  populatedFiles?: FileEntity[];
}
export interface BuildableEntity<T> {
  build: (entity: T) => T;
}

export interface FilesServicePort {
  createUploadRequest({
    requester,
    request,
  }: {
    requester: AuthUserEntity;
    request: CreateFileUploadRequestEntity;
  }): Promise<{ file: FileEntity; uploadUrl: string }>;

  confirmUploadRequest({
    requester,
    request,
  }: {
    requester: AuthUserEntity;
    request: ConfirmFileUploadRequestEntity;
  }): Promise<FileEntity>;

  removeOrThrow({ requester, request }: { requester: AuthUserEntity; request: RemoveFileRequestEntity }): Promise<void>;

  getFilesSignedUrlsOrThrow(files: FileEntity[]): Promise<FileEntity[]>;

  enrichEntityWithFileSignedUrls<T extends PopulatesFile>(entity: T, buildableEntity: BuildableEntity<T>): Promise<T>;

  enrichEntitiesWithFileSignedUrls<T extends PopulatesFile>(
    entities: T[],
    buildableEntity: BuildableEntity<T>,
  ): Promise<T[]>;

  getSignedUrlFromUrl({
    requester,
    url,
  }: {
    requester: AuthUserEntity;
    url: string;
  }): Promise<string>;
}
