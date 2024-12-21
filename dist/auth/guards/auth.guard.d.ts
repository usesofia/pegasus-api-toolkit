import { CanActivate, ExecutionContext, LoggerService } from '@nestjs/common';
import { AuthServicePort } from '../ports/auth-service.port';
import { Reflector } from '@nestjs/core';
import { Base } from '../../base';
import { BaseConfigEntity } from '../../config/base-config.entity';
import { ClsService } from 'nestjs-cls';
export declare class AuthGuard extends Base implements CanActivate {
    protected readonly baseConfig: BaseConfigEntity;
    protected readonly logger: LoggerService;
    protected readonly cls: ClsService;
    private reflector;
    private readonly authService;
    constructor(baseConfig: BaseConfigEntity, logger: LoggerService, cls: ClsService, reflector: Reflector, authService: AuthServicePort);
    private extractTokenFromHeader;
    canActivate(context: ExecutionContext): Promise<boolean>;
}
