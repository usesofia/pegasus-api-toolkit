import { Base } from '../base';
import { BaseConfigEntity } from '../config/base-config.entity';
import { TaskEntity } from '../tasks/task.entity';
import { TasksServicePort } from '../tasks/tasks-service.port';
import { CloudTasksClient } from '@google-cloud/tasks';
import { LoggerService } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
export declare class GcpTasksServiceAdapter extends Base implements TasksServicePort {
    protected readonly baseConfig: BaseConfigEntity;
    protected readonly logger: LoggerService;
    protected readonly cls: ClsService;
    private readonly cloudTasksClient;
    private tasksBuffer;
    private tasksBufferFlushInterval;
    private flushing;
    constructor(baseConfig: BaseConfigEntity, logger: LoggerService, cls: ClsService, cloudTasksClient: CloudTasksClient);
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
