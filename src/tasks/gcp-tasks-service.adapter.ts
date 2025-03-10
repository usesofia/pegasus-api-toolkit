import { Base } from "@app/base";
import { BASE_CONFIG, BaseConfigEntity } from "@app/config/base-config.entity";
import { correlationIdHeaderKey } from "@app/correlation/correlation.constants";
import { LOGGER_SERVICE_PORT } from "@app/logger/logger.module";
import { TaskEntity } from "@app/tasks/task.entity";
import { TasksServicePort } from "@app/tasks/tasks-service.port";
import { CloudTasksClient } from "@google-cloud/tasks";
import { Inject, Injectable, LoggerService } from "@nestjs/common";
import { GoogleAuth } from "google-auth-library";
import { ClsService } from "nestjs-cls";

@Injectable()
export class GcpTasksServiceAdapter extends Base implements TasksServicePort {
  constructor(
    @Inject(BASE_CONFIG)
    protected readonly baseConfig: BaseConfigEntity,
    @Inject(LOGGER_SERVICE_PORT)
    protected readonly logger: LoggerService,
    protected readonly cls: ClsService,
    private readonly cloudTasksClient: CloudTasksClient,
  ) {
    super(GcpTasksServiceAdapter.name, baseConfig, logger, cls);
  }

  private async getToken(): Promise<string> {
    const auth = new GoogleAuth({
      credentials: this.baseConfig.gcp.credentials,
      scopes: []
    });
  
    const client = await auth.getIdTokenClient('*');
    const accessToken = await client.idTokenProvider.fetchIdToken('*');

    return accessToken;
  }

  async appendTask({
    task,
    correlationId,
  }: {
    task: TaskEntity;
    correlationId?: string;
  }): Promise<void> {
    const baseUrl = this.baseConfig.microservices.find((m) => m.name === task.microservice)?.baseUrl;
    if (!baseUrl) {
      throw new Error(`Microservice ${task.microservice} not found.`);
    }
    const url = `${baseUrl}/external/queues/${task.queue}`;
    const finalCorrelationId = correlationId ?? this.cls.getId();
    const token = await this.getToken();

    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      [correlationIdHeaderKey]: finalCorrelationId,
    }

    await this.cloudTasksClient.createTask({
      parent: this.cloudTasksClient.queuePath(
        this.baseConfig.gcp.credentials.project_id,
        this.baseConfig.gcp.location,
        task.queue,
      ),
      task: {
        httpRequest: {
          httpMethod: 'POST',
          url,
          body: Buffer.from(JSON.stringify(task.payload)).toString('base64'),
          headers,
        },
      },
    });
  }
}
