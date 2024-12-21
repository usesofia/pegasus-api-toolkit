import { LoggerService, LogLevel } from '@nestjs/common';
import { BaseConfigEntity } from './config/base-config.entity';
import { ClsService } from 'nestjs-cls';
import { correlationIdKey } from './correlation/correlation.constants';

export class Base {
  constructor(
    private readonly className: string,
    protected readonly baseConfig: BaseConfigEntity,
    protected readonly logger: LoggerService,
    protected readonly cls: ClsService,
  ) {}

  public logLevel({
    functionName,
    level,
    suffix,
    data,
  }: {
    functionName: string;
    level: LogLevel;
    suffix: string;
    data: any;
  }) {
    switch (level) {
      case 'log':
        this.logger.log(
          `[${this.cls.getId()}] ${this.className}.${functionName}.${suffix}`,
          {
            [correlationIdKey]: this.cls.getId(),
            ...data,
          },
        );
        break;
      case 'error':
        this.logger.error(
          `[${this.cls.getId()}] ${this.className}.${functionName}.${suffix}`,
          {
            [correlationIdKey]: this.cls.getId(),
            ...data,
          },
        );
        break;
      case 'warn':
        this.logger.warn(
          `[${this.cls.getId()}] ${this.className}.${functionName}.${suffix}`,
          {
            [correlationIdKey]: this.cls.getId(),
            ...data,
          },
        );
        break;
      case 'debug':
        this.logger.debug!(
          `[${this.cls.getId()}] ${this.className}.${functionName}.${suffix}`,
          {
            [correlationIdKey]: this.cls.getId(),
            ...data,
          },
        );
        break;
      case 'verbose':
        this.logger.verbose!(
          `[${this.cls.getId()}] ${this.className}.${functionName}.${suffix}`,
          {
            [correlationIdKey]: this.cls.getId(),
            ...data,
          },
        );
        break;
      case 'fatal':
        this.logger.fatal!(
          `[${this.cls.getId()}] ${this.className}.${functionName}.${suffix}`,
          {
            [correlationIdKey]: this.cls.getId(),
            ...data,
          },
        );
        break;
      default:
        throw new Error('Invalid log level.');
    }
  }

  log({
    functionName,
    suffix,
    data,
  }: {
    functionName: string;
    suffix: string;
    data: any;
  }) {
    this.logLevel({
      functionName,
      level: 'log',
      suffix,
      data,
    });
  }

  logDebug({
    functionName,
    suffix,
    data,
  }: {
    functionName: string;
    suffix: string;
    data: any;
  }) {
    this.logLevel({ functionName, level: 'debug', suffix, data });
  }

  logError({
    functionName,
    suffix,
    data,
  }: {
    functionName: string;
    suffix: string;
    data: any;
  }) {
    this.logLevel({ functionName, level: 'error', suffix, data });
  }

  logWarn({
    functionName,
    suffix,
    data,
  }: {
    functionName: string;
    suffix: string;
    data: any;
  }) {
    this.logLevel({ functionName, level: 'warn', suffix, data });
  }

  logFatal({
    functionName,
    suffix,
    data,
  }: {
    functionName: string;
    suffix: string;
    data: any;
  }) {
    this.logLevel({ functionName, level: 'fatal', suffix, data });
  }

  logVerbose({
    functionName,
    suffix,
    data,
  }: {
    functionName: string;
    suffix: string;
    data: any;
  }) {
    this.logLevel({ functionName, level: 'verbose', suffix, data });
  }
}
