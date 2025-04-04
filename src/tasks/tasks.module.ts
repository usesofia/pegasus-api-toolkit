import { BASE_CONFIG, BaseConfigEntity } from '@app/config/base-config.entity';
import { PrimaryMongoDbDatabaseModule } from '@app/database/primary-mongodb-database.module';
import { GcpTasksServiceAdapter } from '@app/tasks/gcp-tasks-service.adapter';
import { MongodbTasksServiceAdapter } from '@app/tasks/mongodb-tasks-service.adapter';
import { TASKS_SERVICE_PORT } from '@app/tasks/tasks-service.port';
import { Environment, getEnvironment } from '@app/utils/environment.utils';
import { CloudTasksClient } from '@google-cloud/tasks';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [PrimaryMongoDbDatabaseModule],
  providers: [
    {
      provide: TASKS_SERVICE_PORT,
      useClass:
        getEnvironment() === Environment.LOCAL ||
        getEnvironment() === Environment.INTEGRATION_TEST
          ? MongodbTasksServiceAdapter
          : GcpTasksServiceAdapter,
    },
    GcpTasksServiceAdapter,
    MongodbTasksServiceAdapter,
    {
      provide: CloudTasksClient,
      useFactory: (baseConfig: BaseConfigEntity) => {
        return new CloudTasksClient({
          credentials: baseConfig.gcp.credentials,
          projectId: baseConfig.gcp.credentials.project_id,
        });
      },
      inject: [BASE_CONFIG],
    },
  ],
  exports: [TASKS_SERVICE_PORT],
})
export class TasksModule {}
