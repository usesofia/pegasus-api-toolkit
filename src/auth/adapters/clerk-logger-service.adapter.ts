import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { ClerkLogger } from '@usesofia/clerk-backend';
import { Base } from '../../base';
import { BASE_CONFIG, BaseConfigEntity } from '../../config/base-config.entity';
import { LOGGER_SERVICE_PORT } from '../../logger/logger.module';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class ClerkLoggerServiceAdapter extends Base implements ClerkLogger {
  constructor(
    @Inject(BASE_CONFIG)
    protected readonly baseConfig: BaseConfigEntity,
    @Inject(LOGGER_SERVICE_PORT) protected readonly logger: LoggerService,
    protected readonly cls: ClsService,
  ) {
    super(ClerkLoggerServiceAdapter.name, baseConfig, logger, cls);
  }

  logClerkInput({
    functionName,
    args,
  }: {
    functionName: string;
    args: any[];
  }): void {
    this.logDebug({
      functionName,
      suffix: 'input',
      data: { args },
    });
  }

  logClerkOutput({
    functionName,
    output,
  }: {
    functionName: string;
    output: any;
  }): void {
    this.logDebug({
      functionName,
      suffix: 'output',
      data: { output },
    });
  }

  logClerkRetryError({
    functionName,
    currentAttempt,
    error,
  }: {
    functionName: string;
    currentAttempt: number;
    error: any;
  }): void {
    this.logWarn({
      functionName,
      suffix: 'retry',
      data: { currentAttempt, error },
    });
  }

  logClerkError({
    functionName,
    error,
  }: {
    functionName: string;
    error: any;
  }): void {
    this.logError({
      functionName,
      suffix: 'error',
      data: { error },
    });
  }
}
