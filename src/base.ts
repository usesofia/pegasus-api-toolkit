import { LoggerService, LogLevel } from '@nestjs/common';
import { BaseConfigEntity } from '@app/config/base-config.entity';
import { ClsService } from 'nestjs-cls';
import { correlationIdKey } from '@app/correlation/correlation.constants';

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
    correlationId,
  }: {
    functionName: string;
    level: LogLevel;
    suffix: string;
    data: Record<string, unknown>;
    correlationId?: string;
  }) {
    switch (level) {
      case 'log':
        this.logger.log(
          `[${correlationId ?? this.cls.getId()}] ${this.className}.${functionName}.${suffix}`,
          {
            [correlationIdKey]: correlationId ?? this.cls.getId(),
            ...data,
          },
        );
        break;
      case 'error':
        this.logger.error(
          `[${correlationId ?? this.cls.getId()}] ${this.className}.${functionName}.${suffix}`,
          {
            [correlationIdKey]: correlationId ?? this.cls.getId(),
            ...data,
          },
        );
        break;
      case 'warn':
        this.logger.warn(
          `[${correlationId ?? this.cls.getId()}] ${this.className}.${functionName}.${suffix}`,
          {
            [correlationIdKey]: correlationId ?? this.cls.getId(),
            ...data,
          },
        );
        break;
      case 'debug':
        if (!this.logger.debug) {
          throw new Error('Logger does not have debug method.');
        }
        this.logger.debug(
          `[${correlationId ?? this.cls.getId()}] ${this.className}.${functionName}.${suffix}`,
          {
            [correlationIdKey]: correlationId ?? this.cls.getId(),
            ...data,
          },
        );
        break;
      case 'verbose':
        if (!this.logger.verbose) {
          throw new Error('Logger does not have verbose method.');
        }
        this.logger.verbose(
          `[${correlationId ?? this.cls.getId()}] ${this.className}.${functionName}.${suffix}`,
          {
            [correlationIdKey]: correlationId ?? this.cls.getId(),
            ...data,
          },
        );
        break;
      case 'fatal':
        if (!this.logger.fatal) {
          throw new Error('Logger does not have fatal method.');
        }
        this.logger.fatal(
          `[${correlationId ?? this.cls.getId()}] ${this.className}.${functionName}.${suffix}`,
          {
            [correlationIdKey]: correlationId ?? this.cls.getId(),
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
    correlationId,
  }: {
    functionName: string;
    suffix: string;
    data: Record<string, unknown>;
    correlationId?: string;
  }) {
    this.logLevel({
      functionName,
      level: 'log',
      suffix,
      data,
      correlationId,
    });
  }

  logDebug({
    functionName,
    suffix,
    data,
    correlationId,
  }: {
    functionName: string;
    suffix: string;
    data: Record<string, unknown>;
    correlationId?: string;
  }) {
    this.logLevel({
      functionName,
      level: 'debug',
      suffix,
      data,
      correlationId,
    });
  }

  logError({
    functionName,
    suffix,
    data,
    correlationId,
  }: {
    functionName: string;
    suffix: string;
    data: Record<string, unknown>;
    correlationId?: string;
  }) {
    this.logLevel({
      functionName,
      level: 'error',
      suffix,
      data,
      correlationId,
    });
  }

  logWarn({
    functionName,
    suffix,
    data,
    correlationId,
  }: {
    functionName: string;
    suffix: string;
    data: Record<string, unknown>;
    correlationId?: string;
  }) {
    this.logLevel({ functionName, level: 'warn', suffix, data, correlationId });
  }

  logFatal({
    functionName,
    suffix,
    data,
    correlationId,
  }: {
    functionName: string;
    suffix: string;
    data: Record<string, unknown>;
    correlationId?: string;
  }) {
    this.logLevel({
      functionName,
      level: 'fatal',
      suffix,
      data,
      correlationId,
    });
  }

  logVerbose({
    functionName,
    suffix,
    data,
    correlationId,
  }: {
    functionName: string;
    suffix: string;
    data: Record<string, unknown>;
    correlationId?: string;
  }) {
    this.logLevel({
      functionName,
      level: 'verbose',
      suffix,
      data,
      correlationId,
    });
  }
}
