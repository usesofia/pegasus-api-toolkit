import { BASE_CONFIG, BaseConfigEntity } from '@app/config/base-config.entity';
import { PRIMARY_MONGOOSE_CONNECTION, PrimaryMongoDbDatabaseModule } from '@app/database/primary-mongodb-database.module';
import { LOGGER_SERVICE_PORT } from '@app/logger/logger.module';
import { GcpTasksServiceAdapter } from '@app/tasks/gcp-tasks-service.adapter';
import { MongodbTasksServiceAdapter } from '@app/tasks/mongodb-tasks-service.adapter';
import { TASKS_SERVICE_PORT, TasksServicePort } from '@app/tasks/tasks-service.port';
import { Environment, getEnvironment } from '@app/utils/environment.utils';
import { CloudTasksClient } from '@google-cloud/tasks';
import { Global, Inject, LoggerService, Module, OnApplicationShutdown } from '@nestjs/common';
import { Connection } from 'mongoose';
import { ClsService } from 'nestjs-cls';

@Global()
@Module({
  imports: [PrimaryMongoDbDatabaseModule],
  providers: [
    {
      provide: TASKS_SERVICE_PORT,
      useFactory: (
        baseConfig: BaseConfigEntity,
        logger: LoggerService,
        cls: ClsService,
        cloudTasksClient: CloudTasksClient,
        connection: Connection,
      ) => {
        return getEnvironment() === Environment.LOCAL ||
          getEnvironment() === Environment.INTEGRATION_TEST
          ? new MongodbTasksServiceAdapter(baseConfig, logger, cls, connection)
          : new GcpTasksServiceAdapter(baseConfig, logger, cls, cloudTasksClient);
      },
      inject: [BASE_CONFIG, LOGGER_SERVICE_PORT, ClsService, CloudTasksClient, PRIMARY_MONGOOSE_CONNECTION],
    },
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
export class TasksModule implements OnApplicationShutdown {
  constructor(
    @Inject(TASKS_SERVICE_PORT)
    private readonly tasksService: TasksServicePort,
  ) {}

  async onApplicationShutdown() {
    await this.tasksService.stopAutoFlushTasksBuffer();
  }
}
