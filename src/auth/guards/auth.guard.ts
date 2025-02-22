import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  LoggerService,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthServicePort, AUTH_SERVICE_PORT } from '../ports/auth-service.port';
import { Reflector } from '@nestjs/core';
import { BaseConfigEntity, BASE_CONFIG } from '../../config/base-config.entity';
import { ClsService } from 'nestjs-cls';
import { IGNORE_AUTH_GUARD_KEY } from '../decorators/ignore-auth-guard.decorator';
import { Base } from '../../base';
import { LOGGER_SERVICE_PORT } from '../../logger/logger.module';
import { z } from 'zod';
import { AuthUserEntitySchema } from '../entities/auth-user.entity';

@Injectable()
export class AuthGuard extends Base implements CanActivate {
  constructor(
    @Inject(BASE_CONFIG) protected readonly baseConfig: BaseConfigEntity,
    @Inject(LOGGER_SERVICE_PORT) protected readonly logger: LoggerService,
    protected readonly cls: ClsService,
    protected readonly reflector: Reflector,
    @Inject(AUTH_SERVICE_PORT)
    protected readonly authService: AuthServicePort,
  ) {
    super(AuthGuard.name, baseConfig, logger, cls);
  }

  private extractTokenFromHeader(request: {
    headers: {
      authorization?: string;
    };
  }): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isIgnoreAuthGuard = this.reflector.get<boolean>(
      IGNORE_AUTH_GUARD_KEY,
      context.getHandler(),
    );
    if (isIgnoreAuthGuard) {
      return true;
    }

    const request = context.switchToHttp().getRequest<{
      headers: {
        authorization?: string;
      };
      user: z.infer<typeof AuthUserEntitySchema>;
    }>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const user = await this.authService.verifyToken(token);
      request.user = user;
      return true;
    } catch (error) {
      this.logWarn({
        functionName: 'canActivate',
        suffix: 'verifyTokenError',
        data: {
          error,
        },
      });
      throw new UnauthorizedException();
    }
  }
}

export const AUTH_GUARD = Symbol('AuthGuard');
