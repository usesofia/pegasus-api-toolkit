import pino, { Logger } from 'pino';
import { Inject, Injectable, LoggerService, LogLevel } from '@nestjs/common';
import { MaskActions, maskAttribute } from 'nested-mask-attributes';
import { BaseConfigEntity, BASE_CONFIG } from '../config/base-config.entity';
import { Environment } from '../utils/environment.utils';

const sensitiveFields = [
  'password',
  'passwordHash',
  'accessToken',
  'refreshToken',
  'token',
];

const getStringfyReplacer = () => {
  const seen = new WeakSet();
  return (key: string, value: unknown) => {
    if (value instanceof Error) {
      return {
        name: value.name,
        message: value.message,
        stack: value.stack,
      };
    }
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

@Injectable()
export class PinoLoggerAdapter implements LoggerService {
  private readonly remoteLogger: Logger;
  private readonly consoleLogger: Logger;
  private readonly shouldConsoleLog: boolean;
  private readonly environment: string;

  constructor(
    @Inject(BASE_CONFIG) private readonly baseConfig: BaseConfigEntity,
  ) {
    const batchInterval = baseConfig.env === Environment.INTEGRATION_TEST ? 50 : 100;
    const retryBackoff = baseConfig.env === Environment.INTEGRATION_TEST ? 100 : 400;
    this.remoteLogger = pino({
      transport: {
        target: '@logtail/pino',
        options: {
          sourceToken: baseConfig.logger.betterStackSourceToken,
          options: {
            batchInterval,
            retryCount: 16,
            retryBackoff,
            endpoint: baseConfig.logger.betterStackEndpoint ?? 'https://in.logs.betterstack.com',
          },
        },
      },
      level: baseConfig.logger.level,
    });
    this.consoleLogger = pino({
      transport: {
        target: 'pino-pretty',
      },
      level: baseConfig.logger.level,
    });
    this.shouldConsoleLog = baseConfig.logger.consoleLog;
    this.environment = baseConfig.env.toString();
  }

  logLevel(level: LogLevel, message: string, ...optionalParams: unknown[]) {
    let data: Record<string, unknown> = {
      environment: this.environment,
    };

    if (
      optionalParams.length === 1 &&
      typeof optionalParams[0] === 'object' &&
      !(optionalParams[0] instanceof Error)
    ) {
      data = {
        ...(maskAttribute(
          JSON.parse(JSON.stringify(optionalParams[0], getStringfyReplacer())),
          sensitiveFields,
          {
            action: MaskActions.MASK,
          },
        ) as Record<string, unknown>),
        environment: this.environment,
      };
    } else if (
      optionalParams.length === 1 &&
      optionalParams[0] instanceof Error
    ) {
      data = {
        environment: this.environment,
        err: optionalParams[0],
      };
    }

    switch (level) {
      case 'log':
        this.remoteLogger.info(data, `${message}`);
        if (this.shouldConsoleLog) this.consoleLogger.info(data, message);
        break;
      case 'error':
        this.remoteLogger.error(data, message);
        if (this.shouldConsoleLog) this.consoleLogger.error(data, message);
        break;
      case 'warn':
        this.remoteLogger.warn(data, message);
        if (this.shouldConsoleLog) this.consoleLogger.warn(data, message);
        break;
      case 'debug':
        this.remoteLogger.debug(data, message);
        if (this.shouldConsoleLog) this.consoleLogger.debug(data, message);
        break;
      case 'verbose':
        this.remoteLogger.info(data, message);
        if (this.shouldConsoleLog) this.consoleLogger.info(data, message);
        break;
      case 'fatal':
        this.remoteLogger.fatal(data, message);
        if (this.shouldConsoleLog) this.consoleLogger.error(data, message);
        break;
      default:
        throw new Error('Invalid log level.');
    }
  }

  log(message: string, ...optionalParams: unknown[]) {
    this.logLevel('log', message, ...optionalParams);
  }

  error(message: string, ...optionalParams: unknown[]) {
    this.logLevel('error', message, ...optionalParams);
  }

  warn(message: string, ...optionalParams: unknown[]) {
    this.logLevel('warn', message, ...optionalParams);
  }

  debug?(message: string, ...optionalParams: unknown[]) {
    this.logLevel('debug', message, ...optionalParams);
  }

  verbose?(message: string, ...optionalParams: unknown[]) {
    this.logLevel('verbose', message, ...optionalParams);
  }

  fatal?(message: string, ...optionalParams: unknown[]) {
    this.logLevel('fatal', message, ...optionalParams);
  }

  setLogLevels?() {
    throw new Error('Not implemented.');
  }

  async flush(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.remoteLogger.flush((error?: Error) => {
        if (error) reject(error);
        resolve();
      });
    });
  }
}
