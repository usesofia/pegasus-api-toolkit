import { CanActivate, ExecutionContext, LoggerService } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@app/auth/guards/auth.guard';
import { BaseConfigEntity } from '@app/config/base-config.entity';
import { ClsService } from 'nestjs-cls';
import { AuthServicePort } from '@app/auth/ports/auth-service.port';
export declare class OrganizationTypesGuard extends AuthGuard implements CanActivate {
    protected readonly baseConfig: BaseConfigEntity;
    protected readonly logger: LoggerService;
    protected readonly cls: ClsService;
    protected readonly reflector: Reflector;
    protected readonly authService: AuthServicePort;
    constructor(baseConfig: BaseConfigEntity, logger: LoggerService, cls: ClsService, reflector: Reflector, authService: AuthServicePort);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export declare const ORGANIZATION_TYPES_GUARD: unique symbol;
