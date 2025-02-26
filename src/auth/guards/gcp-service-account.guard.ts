import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Inject,
  LoggerService,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { OAuth2Client } from 'google-auth-library';
import { BaseConfigEntity, BASE_CONFIG } from '../../config/base-config.entity';
import { ClsService } from 'nestjs-cls';
import { IGNORE_GCP_SERVICE_ACCOUNT_GUARD_KEY } from '../decorators/ignore-gcp-service-account-guard.decorator';
import { LOGGER_SERVICE_PORT } from '../../logger/logger.module';
import { Base } from '../../base';
import { AuthUserEntity, AuthUserEntitySchema } from '../entities/auth-user.entity';
import { z } from 'zod';

@Injectable()
export class GcpServiceAccountGuard extends Base implements CanActivate {
  private client: OAuth2Client;

  constructor(
    @Inject(BASE_CONFIG) protected readonly baseConfig: BaseConfigEntity,
    @Inject(LOGGER_SERVICE_PORT) protected readonly logger: LoggerService,
    protected readonly cls: ClsService,
    private reflector: Reflector,
  ) {
    super(GcpServiceAccountGuard.name, baseConfig, logger, cls);
    this.client = new OAuth2Client();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<{
      user: z.input<typeof AuthUserEntitySchema>;
      headers: {
        authorization?: string;
      };
    }>();
    const authorization = request.headers.authorization;

    const isIgnoreGcpServiceAccountGuard = this.reflector.get<boolean>(
      IGNORE_GCP_SERVICE_ACCOUNT_GUARD_KEY,
      context.getHandler(),
    );

    if (isIgnoreGcpServiceAccountGuard) {
      return true;
    }

    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new UnauthorizedException();
    }

    const token = authorization.split(' ')[1];

    const ticket = await this.client.verifyIdToken({
      idToken: token,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      throw new UnauthorizedException();
    }

    if (payload.email !== this.baseConfig.gcp.credentials.client_email) {
      throw new UnauthorizedException();
    }

    request.user = AuthUserEntity.buildFromGcpServiceAccount(this.baseConfig);

    return true;
  }
}

export const GCP_SERVICE_ACCOUNT_GUARD = Symbol('GcpServiceAccountGuard');
