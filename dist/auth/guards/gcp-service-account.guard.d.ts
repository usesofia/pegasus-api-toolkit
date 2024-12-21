import { CanActivate, ExecutionContext, LoggerService } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { BaseConfigEntity } from '../../config/base-config.entity';
import { ClsService } from 'nestjs-cls';
import { Base } from '../../base';
export declare class GcpServiceAccountGuard extends Base implements CanActivate {
    protected readonly baseConfig: BaseConfigEntity;
    protected readonly logger: LoggerService;
    protected readonly cls: ClsService;
    private reflector;
    private client;
    constructor(baseConfig: BaseConfigEntity, logger: LoggerService, cls: ClsService, reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
}