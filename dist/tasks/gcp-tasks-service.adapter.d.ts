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
    constructor(baseConfig: BaseConfigEntity, logger: LoggerService, cls: ClsService, cloudTasksClient: CloudTasksClient);
    appendTask({ task, correlationId, }: {
        task: TaskEntity;
        correlationId?: string;
    }): Promise<void>;
}
