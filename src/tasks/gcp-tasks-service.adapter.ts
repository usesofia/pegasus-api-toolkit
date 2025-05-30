import { tasksQueueSecretHeaderKey } from '@app/auth/guards/task-queue.guard';
import { Base } from '@app/base';
import { BASE_CONFIG, BaseConfigEntity } from '@app/config/base-config.entity';
import { correlationIdHeaderKey } from '@app/correlation/correlation.constants';
import { LOGGER_SERVICE_PORT } from '@app/logger/logger.module';
import { TaskEntity } from '@app/tasks/task.entity';
import { TasksServicePort } from '@app/tasks/tasks-service.port';
import { Log } from '@app/utils/log.utils';
import { CloudTasksClient } from '@google-cloud/tasks';
import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { v4 as uuidv4 } from 'uuid';

const MAX_TASKS_BUFFER_SIZE = 16 * 1024;

interface TaskBufferItem {
  correlationId: string;
  id: string;
  task: TaskEntity;
}

@Injectable()
export class GcpTasksServiceAdapter extends Base implements TasksServicePort {
  private tasksBuffer: TaskBufferItem[] = [];
  private tasksBufferFlushInterval: NodeJS.Timeout;
  private flushing: boolean;

  constructor(
    @Inject(BASE_CONFIG)
    protected readonly baseConfig: BaseConfigEntity,
    @Inject(LOGGER_SERVICE_PORT)
    protected readonly logger: LoggerService,
    protected readonly cls: ClsService,
    private readonly cloudTasksClient: CloudTasksClient,
  ) {
    super(GcpTasksServiceAdapter.name, baseConfig, logger, cls);
    this.flushing = false;
    this.tasksBufferFlushInterval = setInterval(
      () => void this.flushTasksBuffer({ max: 512 }),
      400,
    );
  }

  @Log()
  async appendTask({
    task,
    correlationId,
  }: {
    task: TaskEntity;
    correlationId?: string;
  }): Promise<void> {
    const baseUrl = this.baseConfig.microservices.find(
      (m) => m.name === task.microservice,
    )?.internalBaseUrl;
    if (!baseUrl) {
      throw new Error(`Microservice ${task.microservice} not found.`);
    }
    const url = `${baseUrl}/internal/queues/${task.queue}`;
    const finalCorrelationId = correlationId ?? this.cls.getId();

    const headers = {
      [tasksQueueSecretHeaderKey]: this.baseConfig.tasks.secret,
      'Content-Type': 'application/json',
      [correlationIdHeaderKey]: finalCorrelationId,
    };

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

  @Log()
  unsafeAppendTask({
    task,
  }: {
    task: TaskEntity;
  }): void {
    if (this.tasksBuffer.length >= MAX_TASKS_BUFFER_SIZE) {
      throw new Error(
        `Tasks buffer is full. It has ${this.tasksBuffer.length.toString()} items.`,
      );
    }
    this.tasksBuffer.push({
      correlationId: this.cls.getId(),
      id: uuidv4(),
      task,
    });
  }

  async flushTasksBuffer({ max }: { max?: number }): Promise<void> {
    if (this.tasksBuffer.length === 0) {
      return;
    }

    if (this.flushing) {
      return;
    }

    this.flushing = true;

    const calculatedMax = max ?? this.tasksBuffer.length;

    const itemsToBeProcessed = this.tasksBuffer.slice(0, calculatedMax);
    const successItemIdsProcessed: string[] = [];

    await Promise.all(
      itemsToBeProcessed.map(async (item) => {
        try {
          await this.appendTask({
            task: item.task,
            correlationId: item.correlationId,
          });
          successItemIdsProcessed.push(item.id);
        } catch (error) {
          this.logWarn({
            correlationId: item.correlationId,
            functionName: 'flushTasksBuffer',
            suffix: 'itemFailedToBeProcessed',
            data: {
              error,
              item,
            },
          });
        }
      }),
    );

    this.tasksBuffer = this.tasksBuffer.filter(
      (item) => !successItemIdsProcessed.includes(item.id),
    );

    this.flushing = false;
  }

  @Log()
  async stopAutoFlushTasksBuffer(): Promise<void> {
    try {
      clearInterval(this.tasksBufferFlushInterval);
      // Wait until is flushing is false for 10 seconds at max
      let attempts = 0;
      while (this.flushing && attempts < 100) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        attempts++;
      }
      await this.flushTasksBuffer({});
    } catch {
      // Just ignore the error
    }
  }
}
