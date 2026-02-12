import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  LoggerService,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@app/auth/guards/auth.guard';
import { BASE_CONFIG, BaseConfigEntity } from '@app/config/base-config.entity';
import { ClsService } from 'nestjs-cls';
import { LOGGER_SERVICE_PORT } from '@app/logger/logger.module';
import {
  AUTH_SERVICE_PORT,
  AuthServicePort,
} from '@app/auth/ports/auth-service.port';
import * as Sentry from '@sentry/node';

export const adminSecretHeaderKey = 'x-admin-secret';

@Injectable()
export class AdminGuard extends AuthGuard implements CanActivate {
  constructor(
    @Inject(BASE_CONFIG) protected readonly baseConfig: BaseConfigEntity,
    @Inject(LOGGER_SERVICE_PORT) protected readonly logger: LoggerService,
    protected readonly cls: ClsService,
    protected readonly reflector: Reflector,
    @Inject(AUTH_SERVICE_PORT)
    protected readonly authService: AuthServicePort,
  ) {
    super(baseConfig, logger, cls, reflector, authService);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<{
      headers: {
        [adminSecretHeaderKey]: string;
      };
    }>();

    const secret = request.headers[adminSecretHeaderKey];

    if(!this.baseConfig.admin.secret) {
      throw new Error('Admin secret is not configured.');
    }

    if (secret !== this.baseConfig.admin.secret) {
      throw new UnauthorizedException();
    }

    Sentry.setUser({
      id: 'admin',
      email: 'admin@usesofia.com',
    });

    return Promise.resolve(true);
  }
}

export const ADMIN_GUARD = Symbol('AdminGuard');
