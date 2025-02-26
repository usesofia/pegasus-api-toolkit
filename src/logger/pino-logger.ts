import pino, { Logger } from 'pino';
import { Inject, Injectable, LoggerService, LogLevel } from '@nestjs/common';
import { MaskActions, maskAttribute } from 'nested-mask-attributes';
import { BaseConfigEntity, BASE_CONFIG } from '../config/base-config.entity';
import createBetterStackTransport from './integration-test-better-stack-transport';
import { Transform } from 'stream';
import { getStringfyReplacer } from '../utils/json.utils';
import { Environment } from '../utils/environment.utils';

const sensitiveFields = [
  'password',
  'passwordHash',
  'accessToken',
  'refreshToken',
  'token',
];

@Injectable()
export class PinoLoggerAdapter implements LoggerService {
  private readonly remoteLogger: Logger;
  private readonly consoleLogger: Logger;
  private readonly shouldConsoleLog: boolean;
  private readonly environment: string;
  private readonly remoteLoggerTransport: Transform;
  private readonly remoteLoggerTransportClose: () => Promise<void>;
  
  constructor(
    @Inject(BASE_CONFIG) private readonly baseConfig: BaseConfigEntity,
  ) {
    const {
      transport: remoteLoggerTransport,
      close: remoteLoggerTransportClose,
    } = createBetterStackTransport({
      apiToken: baseConfig.logger.betterStackSourceToken,
    });
    this.remoteLoggerTransport = remoteLoggerTransport;
    this.remoteLoggerTransportClose = remoteLoggerTransportClose;
    this.remoteLogger = pino({
      level: baseConfig.logger.level,
    }, this.remoteLoggerTransport);
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

    const isAddressAlreadyInUseOnTest = message.startsWith('Error: listen EADDRINUSE: address already in use') && this.baseConfig.env === Environment.INTEGRATION_TEST;

    if(optionalParams.length > 1 && !isAddressAlreadyInUseOnTest) {
      console.error({level, message, optionalParams});
      throw new Error('Invalid number of parameters for log.');
    }

    if(optionalParams.length === 1) {
      data = {
        ...(
          maskAttribute(
            JSON.parse(JSON.stringify(optionalParams[0], getStringfyReplacer())),
            sensitiveFields,
            {
              action: MaskActions.MASK,
            },
          ) as Record<string, unknown>
        ),
        environment: this.environment,
      };
    } else {
      data = {
        environment: this.environment,
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
    await new Promise((resolve) => {
      this.remoteLogger.flush(() => resolve(void 0));
    });
    await this.remoteLoggerTransportClose();
  }
}
