import { BASE_CONFIG, BaseConfigEntity } from '@app/config/base-config.entity';
import { GcpTasksServiceAdapter } from '@app/tasks/gcp-tasks-service.adapter';
import { MongodbTasksServiceAdapter } from '@app/tasks/mongodb-tasks-service.adapter';
import { TASKS_SERVICE_PORT } from '@app/tasks/tasks-service.port';
import { Environment, getEnvironment, isCli } from '@app/utils/environment.utils';
import { v2beta2 } from '@google-cloud/tasks';
import { Global, Module, OnApplicationShutdown } from '@nestjs/common';

@Global()
@Module({
  providers: [
    {
      provide: TASKS_SERVICE_PORT,
      useFactory: (
        mongodbTasksServiceAdapter: MongodbTasksServiceAdapter,
        gcpTasksServiceAdapter: GcpTasksServiceAdapter,
      ) => {
        return getEnvironment() === Environment.LOCAL ||
          getEnvironment() === Environment.INTEGRATION_TEST ||
          isCli()
          ? mongodbTasksServiceAdapter
          : gcpTasksServiceAdapter;
      },
      inject: [MongodbTasksServiceAdapter, GcpTasksServiceAdapter],
    },
    MongodbTasksServiceAdapter,
    GcpTasksServiceAdapter,
    {
      provide: v2beta2.CloudTasksClient,
      useFactory: (baseConfig: BaseConfigEntity) => {
        return new v2beta2.CloudTasksClient({
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
    private readonly mongoDbTasksServiceAdapter: MongodbTasksServiceAdapter,
    private readonly gcpTasksServiceAdapter: GcpTasksServiceAdapter,
  ) {}

  async onApplicationShutdown() {
    await this.mongoDbTasksServiceAdapter.stopAutoFlushTasksBuffer();
    await this.gcpTasksServiceAdapter.stopAutoFlushTasksBuffer();
  }
}
