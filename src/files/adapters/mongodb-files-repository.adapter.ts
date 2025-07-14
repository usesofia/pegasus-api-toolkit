import type { CreateFileRequestEntity } from '@app/files/entities/create-file-request.entity';
import { BaseFileEntity } from '@app/files/entities/file.entity';
import type { FindByIdFileRequestEntity } from '@app/files/entities/find-by-id-file-request.entity';
import type { PartialUpdateFileRequestEntity } from '@app/files/entities/partial-update-file-request.entity';
import { FILE_MODEL } from '@app/files/files.constants';
import { MongoDbFileModel } from '@app/files/models/mongodb-file.model';
import { FilesRepositoryPort } from '@app/files/ports/files-repository.port';
import { Inject, Injectable, LoggerService, NotFoundException } from '@nestjs/common';
import { BaseMultitenantMongoDbRepositoryAdapter } from '@app/database/base-multitenant-mongodb-repository.adapter';
import { ClientSession, Model } from 'mongoose';
import { ClsService } from 'nestjs-cls';
import { BASE_CONFIG, BaseConfigEntity } from '@app/config/base-config.entity';
import { LOGGER_SERVICE_PORT } from '@app/logger/logger.module';
import { AuthUserEntity } from '@app/auth/entities/auth-user.entity';
import { BaseSessionPort } from '@app/database/base-session.port';
import { Log } from '@app/utils/log.utils';

@Injectable()
export class MongoDbFilesRepositoryAdapter
  extends BaseMultitenantMongoDbRepositoryAdapter<
    MongoDbFileModel,
    BaseFileEntity,
    CreateFileRequestEntity,
    FindByIdFileRequestEntity,
    PartialUpdateFileRequestEntity
  >
  implements FilesRepositoryPort
{
  constructor(
    @Inject(BASE_CONFIG) protected readonly baseConfig: BaseConfigEntity,
    @Inject(LOGGER_SERVICE_PORT) protected readonly logger: LoggerService,
    protected readonly cls: ClsService,
    @Inject(FILE_MODEL) fileModel: Model<MongoDbFileModel>,
  ) {
    super(MongoDbFilesRepositoryAdapter.name, baseConfig, logger, cls, fileModel);
  }

  protected override getOwnerOrganization({ requester, }: { requester: AuthUserEntity; }): string {
    return requester.organization?.id ?? 'system';
  }

  public toEntity({
    doc,
  }: {
    doc: MongoDbFileModel;
  }): Promise<BaseFileEntity> {
    /* eslint-disable */
    return Promise.resolve(BaseFileEntity.build({ ...doc.toObject(), id: doc.id.toString() }));
    /* eslint-enable */
  }

  @Log()
  async systemFindByIdOrThrow({ id, previousSession }: { id: string, previousSession?: BaseSessionPort }): Promise<BaseFileEntity> {
    const session = previousSession
      ? (previousSession.getSession() as ClientSession)
      : null;
    
    const file = await this.model.findById(id).session(session);

    if (!file) {
      throw new NotFoundException('Arquivo não encontrado.');
    }
    
    return this.toEntity({ doc: file });
  }
}
