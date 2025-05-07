import { Base } from '@app/base';
import { BASE_CONFIG, BaseConfigEntity } from '@app/config/base-config.entity';
import { PRIMARY_MONGOOSE_CONNECTION } from '@app/database/primary-mongodb-database.module';
import { LOGGER_SERVICE_PORT } from '@app/logger/logger.module';
import { TaskEntity } from '@app/tasks/task.entity';
import { TasksServicePort } from '@app/tasks/tasks-service.port';
import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { Connection, Model, Schema } from 'mongoose';
import { ClsService } from 'nestjs-cls';
import { v4 as uuidv4 } from 'uuid';

export const TASKS_COLLECTION_NAME = '_Tasks';

const MAX_TASKS_BUFFER_SIZE = 4096;

interface Task {
  correlationId: string;
  queue: string;
  microservice: string;
  payload: Record<string, unknown>;
}

interface TaskBufferItem {
  correlationId: string;
  id: string;
  task: TaskEntity;
}

const TaskSchema = new Schema<Task>(
  {
    correlationId: { type: String, required: true },
    queue: { type: String, required: true },
    microservice: { type: String, required: true },
    payload: { type: Object, required: true },
  },
  {
    timestamps: true,
    collection: TASKS_COLLECTION_NAME,
  },
);

@Injectable()
export class MongodbTasksServiceAdapter
  extends Base
  implements TasksServicePort
{
  private readonly taskModel: Model<Task>;
  private tasksBuffer: TaskBufferItem[] = [];
  private tasksBufferFlushInterval: NodeJS.Timeout;
  private flushing: boolean;

  constructor(
    @Inject(BASE_CONFIG)
    protected readonly baseConfig: BaseConfigEntity,
    @Inject(LOGGER_SERVICE_PORT)
    protected readonly logger: LoggerService,
    protected readonly cls: ClsService,
    @Inject(PRIMARY_MONGOOSE_CONNECTION)
    private readonly connection: Connection,
  ) {
    super(MongodbTasksServiceAdapter.name, baseConfig, logger, cls);
    this.taskModel = this.connection.model<Task>('Task', TaskSchema);
    this.flushing = false;
    this.tasksBufferFlushInterval = setInterval(
      () => void this.flushTasksBuffer({ max: 512 }),
      400,
    );
  }

  async appendTask({
    task,
    correlationId,
  }: {
    task: TaskEntity;
    correlationId?: string;
  }): Promise<void> {
    const finalCorrelationId = correlationId ?? this.cls.getId();
    await this.taskModel.create({
      correlationId: finalCorrelationId,
      queue: task.queue,
      microservice: task.microservice,
      payload: task.payload,
    });
  }

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

  async stopAutoFlushTasksBuffer(): Promise<void> {
    clearInterval(this.tasksBufferFlushInterval);
    // Wait until is flushing is false for 10 seconds at max
    let attempts = 0;
    while (this.flushing && attempts < 100) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      attempts++;
    }
    await this.flushTasksBuffer({});
  }
}
