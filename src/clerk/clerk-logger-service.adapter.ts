import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { ClerkLogger } from '@usesofia/clerk-backend';
import { Base } from '@app/base';
import { BASE_CONFIG, BaseConfigEntity } from '@app/config/base-config.entity';
import { LOGGER_SERVICE_PORT } from '@app/logger/logger.module';
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
    args: unknown[];
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
    output: unknown;
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
    error: unknown;
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
    error: unknown;
  }): void {
    this.logError({
      functionName,
      suffix: 'error',
      data: { error },
    });
  }
}
