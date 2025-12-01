import { CanActivate, ExecutionContext, LoggerService } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { BaseConfigEntity } from '../../config/base-config.entity';
import { ClsService } from 'nestjs-cls';
import { AuthServicePort } from '../../auth/ports/auth-service.port';
export declare const adminSecretHeaderKey = "x-admin-secret";
export declare class AdminGuard extends AuthGuard implements CanActivate {
    protected readonly baseConfig: BaseConfigEntity;
    protected readonly logger: LoggerService;
    protected readonly cls: ClsService;
    protected readonly reflector: Reflector;
    protected readonly authService: AuthServicePort;
    constructor(baseConfig: BaseConfigEntity, logger: LoggerService, cls: ClsService, reflector: Reflector, authService: AuthServicePort);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export declare const ADMIN_GUARD: unique symbol;
