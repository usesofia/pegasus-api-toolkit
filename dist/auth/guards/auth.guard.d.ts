import { CanActivate, ExecutionContext, LoggerService } from '@nestjs/common';
import { AuthServicePort } from '@app/auth/ports/auth-service.port';
import { Reflector } from '@nestjs/core';
import { BaseConfigEntity } from '@app/config/base-config.entity';
import { ClsService } from 'nestjs-cls';
import { Base } from '@app/base';
export declare class AuthGuard extends Base implements CanActivate {
    protected readonly baseConfig: BaseConfigEntity;
    protected readonly logger: LoggerService;
    protected readonly cls: ClsService;
    protected readonly reflector: Reflector;
    protected readonly authService: AuthServicePort;
    constructor(baseConfig: BaseConfigEntity, logger: LoggerService, cls: ClsService, reflector: Reflector, authService: AuthServicePort);
    private extractTokenFromHeader;
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export declare const AUTH_GUARD: unique symbol;
