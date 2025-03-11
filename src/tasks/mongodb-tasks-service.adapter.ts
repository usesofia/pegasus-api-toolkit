import { Base } from "@app/base";
import { BASE_CONFIG, BaseConfigEntity } from "@app/config/base-config.entity";
import { PRIMARY_MONGOOSE_CONNECTION } from "@app/database/primary-mongodb-database.module";
import { LOGGER_SERVICE_PORT } from "@app/logger/logger.module";
import { TaskEntity } from "@app/tasks/task.entity";
import { TasksServicePort } from "@app/tasks/tasks-service.port";
import { Inject, Injectable, LoggerService } from "@nestjs/common";
import { Connection, Model, Schema } from "mongoose";
import { ClsService } from "nestjs-cls";

export const TASKS_COLLECTION_NAME = '_Tasks';

interface Task {
  correlationId: string;
  queue: string;
  microservice: string;
  payload: Record<string, unknown>;
}

const TaskSchema = new Schema<Task>({
  correlationId: { type: String, required: true },
  queue: { type: String, required: true },
  microservice: { type: String, required: true },
  payload: { type: Object, required: true },
}, {
  timestamps: true,
  collection: TASKS_COLLECTION_NAME,
});

@Injectable()
export class MongodbTasksServiceAdapter extends Base implements TasksServicePort {
  private readonly taskModel: Model<Task>;

  constructor(
    @Inject(BASE_CONFIG)
    protected readonly baseConfig: BaseConfigEntity,
    @Inject(LOGGER_SERVICE_PORT)
    protected readonly logger: LoggerService,
    protected readonly cls: ClsService,
    @Inject(PRIMARY_MONGOOSE_CONNECTION) private readonly connection: Connection,
  ) {
    super(MongodbTasksServiceAdapter.name, baseConfig, logger, cls);
    this.taskModel = this.connection.model<Task>('Task', TaskSchema);
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
}
