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
import { BaseConfigEntity, BASE_CONFIG } from '@app/config/base-config.entity';
import { ClsService } from 'nestjs-cls';
import { IGNORE_GCP_SERVICE_ACCOUNT_GUARD_KEY } from '@app/auth/decorators/ignore-gcp-service-account-guard.decorator';
import { LOGGER_SERVICE_PORT } from '@app/logger/logger.module';
import { Base } from '@app/base';
import {
  AuthUserEntity,
  AuthUserEntitySchema,
} from '@app/auth/entities/auth-user.entity';
import { z } from 'zod';
import { Environment, getEnvironment } from '@app/utils/environment.utils';
import * as Sentry from '@sentry/node';

export const GCP_SERVICE_ACCOUNT_TOKEN_FOR_TESTS = 'gcp-service-account-token';

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

    if (!authorization?.startsWith('Bearer ')) {
      throw new UnauthorizedException();
    }

    const token = authorization.split(' ')[1];

    if (
      getEnvironment() === Environment.INTEGRATION_TEST &&
      token === GCP_SERVICE_ACCOUNT_TOKEN_FOR_TESTS
    ) {
      request.user = AuthUserEntity.buildFromGcpServiceAccount(this.baseConfig);
      return true;
    }

    try {
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

      Sentry.setUser({
        id: request.user.id,
        email: request.user.primaryEmail,
        organization: request.user.organization,
      });

      return true;
    } catch (error) {
      this.logWarn({
        functionName: this.canActivate.name,
        suffix: 'failedToVerifyGcpServiceAccountToken',
        data: {
          token,
          error,
        },
      });
      throw new UnauthorizedException();
    }
  }
}

export const GCP_SERVICE_ACCOUNT_GUARD = Symbol('GcpServiceAccountGuard');
