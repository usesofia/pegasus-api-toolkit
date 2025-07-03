import { Base } from '../../base';
import { BaseConfigEntity } from '../../config/base-config.entity';
import { CanActivate, ExecutionContext, LoggerService } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
export declare const tasksQueueSecretHeaderKey = "x-tasks-queue-secret";
export declare class TaskQueueGuard extends Base implements CanActivate {
    protected readonly baseConfig: BaseConfigEntity;
    protected readonly logger: LoggerService;
    protected readonly cls: ClsService;
    constructor(baseConfig: BaseConfigEntity, logger: LoggerService, cls: ClsService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
