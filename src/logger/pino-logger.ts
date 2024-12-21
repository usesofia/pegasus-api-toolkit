import pino, { Logger } from 'pino';
import { Inject, Injectable, LoggerService, LogLevel } from '@nestjs/common';
import { MaskActions, maskAttribute } from 'nested-mask-attributes';
import { BaseConfigEntity, BASE_CONFIG } from '../config/base-config.entity';
const sensitiveFields = [
  'password',
  'passwordHash',
  'accessToken',
  'refreshToken',
  'code',
  'token',
];

const getStringfyReplacer = () => {
  const seen = new WeakSet();
  return (key: any, value: any) => {
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

  constructor(@Inject(BASE_CONFIG) private readonly baseConfig: BaseConfigEntity) {
    this.remoteLogger = pino({
      transport: {
        target: '@logtail/pino',
        options: {
          sourceToken: baseConfig.logger.betterStackSourceToken,
          options: {
            batchInterval: 100,
            retryCount: 16,
            retryBackoff: 400,
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

  logLevel(level: LogLevel, message: any, ...optionalParams: any[]) {
    let data: any = {
      environment: this.environment,
    };

    if (
      optionalParams.length === 1 &&
      typeof optionalParams[0] === 'object' &&
      !(optionalParams[0] instanceof Error)
    ) {
      data = {
        ...maskAttribute(
          JSON.parse(JSON.stringify(optionalParams[0], getStringfyReplacer())),
          sensitiveFields,
          {
            action: MaskActions.MASK,
          },
        ),
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

  log(message: any, ...optionalParams: any[]) {
    this.logLevel('log', message, ...optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    this.logLevel('error', message, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    this.logLevel('warn', message, ...optionalParams);
  }

  debug?(message: any, ...optionalParams: any[]) {
    this.logLevel('debug', message, ...optionalParams);
  }

  verbose?(message: any, ...optionalParams: any[]) {
    this.logLevel('verbose', message, ...optionalParams);
  }

  fatal?(message: any, ...optionalParams: any[]) {
    this.logLevel('fatal', message, ...optionalParams);
  }

  setLogLevels?(_: LogLevel[]) {
    throw new Error('Not implemented.');
  }

  async flush(): Promise<void> {
    await new Promise<void>((resolve) => {
      this.remoteLogger.flush((_?: Error) => {
        resolve();
      });
    });
  }
}
