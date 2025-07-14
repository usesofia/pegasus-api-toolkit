import { BASE_CONFIG, BaseConfigEntity } from '@app/config/base-config.entity';
import type { ConfirmFileUploadRequestEntity } from '@app/files/entities/confirm-file-upload-request.entity';
import { CreateFileRequestEntity } from '@app/files/entities/create-file-request.entity';
import type { CreateFileUploadRequestEntity } from '@app/files/entities/create-file-upload-request.entity';
import { BaseFileEntity, FileEntity, FileStatus } from '@app/files/entities/file.entity';
import { FindByIdFileRequestEntity } from '@app/files/entities/find-by-id-file-request.entity';
import { PartialUpdateFileRequestEntity } from '@app/files/entities/partial-update-file-request.entity';
import type { RemoveFileRequestEntity } from '@app/files/entities/remove-file-request.entity';
import { FILES_REPOSITORY_PORT, type FilesRepositoryPort } from '@app/files/ports/files-repository.port';
import { type BuildableEntity, type FilesServicePort, type PopulatesFile } from '@app/files/ports/files-service.port';
import {
  OBJECT_STORAGE_SERVICE_PORT,
  type ObjectStorageServicePort,
} from '@app/files/ports/object-storage-service.port';
import { ForbiddenException, Inject, Injectable, LoggerService, NotFoundException } from '@nestjs/common';
import { AuthUserEntity } from '@app/auth/entities/auth-user.entity';
import { ClsService } from 'nestjs-cls';
import { LOGGER_SERVICE_PORT } from '@app/logger/logger.module';
import { Base } from '@app/base';
import { Log } from '@app/utils/log.utils';
import { Duration } from 'luxon';
import axios from 'axios';

@Injectable()
export class FilesServiceAdapter extends Base implements FilesServicePort {
  constructor(
    @Inject(BASE_CONFIG) protected readonly baseConfig: BaseConfigEntity,
    @Inject(LOGGER_SERVICE_PORT) protected readonly logger: LoggerService,
    protected readonly cls: ClsService,
    @Inject(FILES_REPOSITORY_PORT)
    private readonly filesRepository: FilesRepositoryPort,
    @Inject(OBJECT_STORAGE_SERVICE_PORT)
    private readonly objectStorageService: ObjectStorageServicePort,
  ) {
    super(FilesServiceAdapter.name, baseConfig, logger, cls);
  }

  @Log()
  async createUploadRequest({
    requester,
    request,
  }: {
    requester: AuthUserEntity;
    request: CreateFileUploadRequestEntity;
  }): Promise<{ file: FileEntity; uploadUrl: string }> {
    const objectName = this.objectStorageService.generateUniqueObjectName({
      requester,
      fileType: request.data.fileType,
      originalFileName: request.data.originalFileName,
    });

    const file = await this.filesRepository.create({
      requester,
      request: CreateFileRequestEntity.build({
        data: { ...request.data, status: FileStatus.PENDING, objectName },
        channel: request.channel,
      }),
    });

    const uploadUrl = await this.objectStorageService.createSignedUploadUrl({
      objectName,
      mimeType: request.data.mimeType,
    });

    return { file: await this.enhanceBaseFile(file), uploadUrl };
  }

  @Log()
  async confirmUploadRequest({
    requester,
    request,
  }: {
    requester: AuthUserEntity;
    request: ConfirmFileUploadRequestEntity;
  }): Promise<FileEntity> {
    const session = await this.filesRepository.startSession();
    const file =  await session.withTransaction(async () => {
      await this.filesRepository.findByIdOrThrow({
        requester,
        request: FindByIdFileRequestEntity.build({ id: request.data.id, status: FileStatus.PENDING }),
        previousSession: session,
      });

      const file = await this.filesRepository.partialUpdateOrThrow({
        requester,
        request: PartialUpdateFileRequestEntity.build({
          id: request.data.id,
          data: { status: request.data.status },
          channel: request.channel,
        }),
        previousSession: session,
      });

      return file
    });

    return this.enhanceBaseFile(file);
  }

  @Log()
  async removeOrThrow({
    requester,
    request,
  }: {
    requester: AuthUserEntity;
    request: RemoveFileRequestEntity;
  }): Promise<void> {
    const session = await this.filesRepository.startSession();
    await session.withTransaction(async () => {
      await this.filesRepository.partialUpdateOrThrow({
        requester,
        request: PartialUpdateFileRequestEntity.build({
          id: request.id,
          data: { status: FileStatus.DELETED, deletedAt: new Date() },
          channel: request.channel,
        }),
        previousSession: session,
      });
    });
  }

  @Log()
  async getFilesSignedUrlsOrThrow(files: FileEntity[]): Promise<FileEntity[]> {
    const objectNames = files.map((file) => file.objectName);
    const signedUrls = await this.objectStorageService.createManySignedDownloadUrls({ objectNames });

    return files.map((file, index) => (FileEntity.build({ ...file, signedUrl: signedUrls[index] })));
  }

  @Log()
  async enrichEntityWithFileSignedUrls<T extends PopulatesFile>(
    entity: T,
    buildableEntity: BuildableEntity<T>,
  ): Promise<T> {
    if (!entity.files || entity.files.length === 0) {
      return entity;
    }

    const populatedFiles = await Promise.all(entity.files.map((fileId) => this.systemFindByIdOrThrow({ id: fileId })));

    return buildableEntity.build({ ...entity, populatedFiles });
  }

  @Log()
  async enrichEntitiesWithFileSignedUrls<T extends PopulatesFile>(
    entities: T[],
    buildableEntity: BuildableEntity<T>,
  ): Promise<T[]> {
    return Promise.all(entities.map((entity) => this.enrichEntityWithFileSignedUrls(entity, buildableEntity)));
  }

  @Log()
  async getSignedUrlFromUrl({
    requester,
    url,
  }: {
    requester: AuthUserEntity;
    url: string;
  }): Promise<string> {
    // Checking if the url is public with axios
    const response = await axios.head(url);
    
    if(response.status === 200) {
      return url;
    }

    const objectName = this.objectStorageService.extractObjectNameFromUrl({ url });

    if(!objectName.startsWith(requester.getOrganizationOrThrow().id)) {
      throw new ForbiddenException('Você não tem permissão para acessar este arquivo.');
    }

    const signedUrl = await this.objectStorageService.createSignedDownloadUrl({ objectName, expiresInMinutes: Duration.fromObject({ days: 1 }).as('minutes') });

    return signedUrl;
  }

  @Log()
  async enhanceBaseFile(file: BaseFileEntity): Promise<FileEntity> {
    const signedUrls = await this.objectStorageService.createManySignedDownloadUrls({ objectNames: [file.objectName], expiresInMinutes: Duration.fromObject({ days: 1 }).as('minutes') });
    const signedUrl = signedUrls[0];
    const url = this.removeQueryParamsFromUrl(signedUrl);

    if(!url) {
      throw new Error('URL não encontrada.');
    }

    return FileEntity.build({
      ...file,
      signedUrl,
      url: url,
    });
  }

  @Log()
  private removeQueryParamsFromUrl(url: string): string {
    return url.split('?')[0];
  }

  @Log()
  async findByIdOrThrow({
    requester,
    id,
  }: {
    requester: AuthUserEntity;
    id: string;
  }): Promise<FileEntity> {
    const file = await this.filesRepository.findByIdOrThrow({ requester, request: FindByIdFileRequestEntity.build({ id }) });

    if(file.status === FileStatus.DELETED || file.status === FileStatus.PENDING) {
      throw new NotFoundException('Arquivo não encontrado.');
    }

    return this.enhanceBaseFile(file);
  }

  @Log()
  async systemFindByIdOrThrow({ id }: { id: string }): Promise<FileEntity> {
    const file = await this.filesRepository.systemFindByIdOrThrow({ id });
    return this.enhanceBaseFile(file);
  }
}
