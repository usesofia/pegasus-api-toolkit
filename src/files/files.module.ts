import { BASE_CONFIG, BaseConfigEntity } from '@app/config/base-config.entity';
import { PRIMARY_MONGOOSE_CONNECTION } from '@app/database/primary-mongodb-database.module';
import { FilesServiceAdapter } from '@app/files/adapters/files-service.adapter';
import { GcsObjectStorageServiceAdapter } from '@app/files/adapters/gcs-object-storage-service.adapter';
import { MongoDbFilesRepositoryAdapter } from '@app/files/adapters/mongodb-files-repository.adapter';
import { FilesUploadController } from '@app/files/controllers/files-upload.controller';
import { FilesController } from '@app/files/controllers/files.controller';
import { COLLECTION_NAME, MODEL } from '@app/files/files.constants';
import { MongoDbFileModelSchema } from '@app/files/models/mongodb-file.model';
import { FILES_REPOSITORY_PORT } from '@app/files/ports/files-repository.port';
import { FILES_SERVICE_PORT } from '@app/files/ports/files-service.port';
import { OBJECT_STORAGE_SERVICE_PORT } from '@app/files/ports/object-storage-service.port';
import { Environment } from '@app/utils/environment.utils';
import { Inject, Module, OnModuleInit } from '@nestjs/common';
import { Connection } from 'mongoose';

@Module({
  imports: [],
  controllers: [FilesUploadController, FilesController],
  providers: [
    {
      provide: MODEL,
      useFactory: (connection: Connection) => {
        return connection.model(COLLECTION_NAME, MongoDbFileModelSchema);
      },
      inject: [PRIMARY_MONGOOSE_CONNECTION],
    },
    {
      provide: FILES_SERVICE_PORT,
      useClass: FilesServiceAdapter,
    },
    {
      provide: FILES_REPOSITORY_PORT,
      useClass: MongoDbFilesRepositoryAdapter,
    },
    {
      provide: OBJECT_STORAGE_SERVICE_PORT,
      useClass: GcsObjectStorageServiceAdapter,
    },
  ],
  exports: [FILES_SERVICE_PORT, FILES_REPOSITORY_PORT, OBJECT_STORAGE_SERVICE_PORT],
})
export class FilesModule implements OnModuleInit {
  constructor(
    @Inject(BASE_CONFIG)
    private readonly baseConfig: BaseConfigEntity,
    @Inject(PRIMARY_MONGOOSE_CONNECTION)
    private readonly connection: Connection,
  ) {}

  async onModuleInit() {
    /* istanbul ignore next */
    if (this.baseConfig.env !== Environment.INTEGRATION_TEST) {
      await this.createIndexes();
    }
  }

  /* istanbul ignore next */
  async createIndexes() {
    const model = this.connection.model(COLLECTION_NAME);
    await model.createIndexes();
  }
}
