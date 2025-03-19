import { AuthUserEntity, AuthUserEntitySchema } from '@app/auth/entities/auth-user.entity';
import { Base } from '@app/base';
import { BASE_CONFIG, BaseConfigEntity } from '@app/config/base-config.entity';
import { LOGGER_SERVICE_PORT } from '@app/logger/logger.module';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  LoggerService,
  UnauthorizedException,
} from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { z } from 'zod';
import * as Sentry from '@sentry/node';
export const tasksQueueSecretHeaderKey = 'x-tasks-queue-secret';

@Injectable()
export class TaskQueueGuard extends Base implements CanActivate {
  constructor(
    @Inject(BASE_CONFIG) protected readonly baseConfig: BaseConfigEntity,
    @Inject(LOGGER_SERVICE_PORT) protected readonly logger: LoggerService,
    protected readonly cls: ClsService,
  ) {
    super(TaskQueueGuard.name, baseConfig, logger, cls);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<{
      headers: {
        [tasksQueueSecretHeaderKey]: string;
      };
    }>();

    const secret = request.headers[tasksQueueSecretHeaderKey];

    if (secret !== this.baseConfig.tasks.secret) {
      throw new UnauthorizedException();
    }

    Sentry.setUser({
      id: 'queue',
      email: 'queue@usesofia.com',
    });

    return Promise.resolve(true);
  }
}
