import { Base } from '@app/base';
import { BaseConfigEntity } from '@app/config/base-config.entity';
import { TaskEntity } from '@app/tasks/task.entity';
import { TasksServicePort } from '@app/tasks/tasks-service.port';
import { LoggerService } from '@nestjs/common';
import { Connection } from 'mongoose';
import { ClsService } from 'nestjs-cls';
export declare const TASKS_COLLECTION_NAME = "_Tasks";
export declare class MongodbTasksServiceAdapter extends Base implements TasksServicePort {
    protected readonly baseConfig: BaseConfigEntity;
    protected readonly logger: LoggerService;
    protected readonly cls: ClsService;
    private readonly connection;
    private readonly taskModel;
    private tasksBuffer;
    private tasksBufferFlushInterval;
    private flushing;
    constructor(baseConfig: BaseConfigEntity, logger: LoggerService, cls: ClsService, connection: Connection);
    appendTask({ task, correlationId, }: {
        task: TaskEntity;
        correlationId?: string;
    }): Promise<void>;
    unsafeAppendTask({ task, }: {
        task: TaskEntity;
    }): void;
    flushTasksBuffer({ max }: {
        max?: number;
    }): Promise<void>;
    stopAutoFlushTasksBuffer(): Promise<void>;
}
