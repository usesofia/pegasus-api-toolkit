import { Base } from '@app/base';
import { BaseConfigEntity } from '@app/config/base-config.entity';
import { TaskEntity } from '@app/tasks/task.entity';
import { TasksServicePort } from '@app/tasks/tasks-service.port';
import { v2beta2 } from '@google-cloud/tasks';
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
    constructor(baseConfig: BaseConfigEntity, logger: LoggerService, cls: ClsService, cloudTasksClient: v2beta2.CloudTasksClient);
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
    getQueueSize({ queueName, }: {
        queueName: string;
    }): Promise<number>;
}
