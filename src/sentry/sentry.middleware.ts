import {
  Inject,
  Injectable,
  LoggerService,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as Sentry from '@sentry/node';
import { Base } from '@app/base';
import { BASE_CONFIG, BaseConfigEntity } from '@app/config/base-config.entity';
import { LOGGER_SERVICE_PORT } from '@app/logger/logger.module';
import { ClsService } from 'nestjs-cls';
import { correlationIdKey } from '@app/correlation/correlation.constants';

@Injectable()
export class SentryMiddleware extends Base implements NestMiddleware {
  constructor(
    @Inject(BASE_CONFIG) protected readonly baseConfig: BaseConfigEntity,
    @Inject(LOGGER_SERVICE_PORT) protected readonly logger: LoggerService,
    protected readonly cls: ClsService,
  ) {
    super(SentryMiddleware.name, baseConfig, logger, cls);
  }

  use(req: Request, res: Response, next: NextFunction) {
    Sentry.setExtra(correlationIdKey, this.cls.getId());
    next();
  }
}
