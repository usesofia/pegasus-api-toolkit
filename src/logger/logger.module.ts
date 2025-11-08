import {
  Global,
  Inject,
  LoggerService,
  MiddlewareConsumer,
  Module,
  NestModule,
  OnApplicationShutdown,
} from '@nestjs/common';
import { PinoLoggerAdapter } from '@app/logger/pino-logger';
import morgan from 'morgan';
import {
  correlationIdKey,
  correlationIdTokenKey,
} from '@app/correlation/correlation.constants';
import { Request } from 'express';
import { BASE_CONFIG, BaseConfigEntity } from '@app/config/base-config.entity';
import { isCli } from '@app/utils/environment.utils';
import { CliConsoleLoggerAdapter } from '@app/logger/cli-console-logger';

declare module 'express' {
  interface Request {
    [correlationIdKey]: string;
  }
}

export const LOGGER_SERVICE_PORT = Symbol('LoggerServicePort');

morgan.token(correlationIdTokenKey, (req: Request) => req[correlationIdKey]);

@Global()
@Module({
  providers: [
    PinoLoggerAdapter,
    CliConsoleLoggerAdapter,
    {
      provide: LOGGER_SERVICE_PORT,
      useFactory: (pinoLoggerAdapter: PinoLoggerAdapter, consoleLoggerAdapter: CliConsoleLoggerAdapter) => {
				if (isCli()) {
					return consoleLoggerAdapter;
				}
				return pinoLoggerAdapter;
			},
      inject: [PinoLoggerAdapter, CliConsoleLoggerAdapter],
    },
  ],
  exports: [LOGGER_SERVICE_PORT],
})
export class LoggerModule implements NestModule, OnApplicationShutdown {
  constructor(
    @Inject(BASE_CONFIG)
    private readonly baseConfig: BaseConfigEntity,
    @Inject(PinoLoggerAdapter)
    private readonly pinoLoggerAdapter: PinoLoggerAdapter,
    @Inject(LOGGER_SERVICE_PORT)
    private readonly loggerService: LoggerService,
  ) {}

  public configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(
        morgan(
          (tokens, req, res) => {
            return [
              `[${tokens[correlationIdTokenKey](req, res) ?? ''}]`,
              tokens.method(req, res),
              tokens.url(req, res),
              tokens.status(req, res),
              tokens.res(req, res, 'content-length'),
              'bytes',
              tokens['response-time'](req, res),
              'ms',
            ].join(' ');
          },
          {
            stream: {
              write: (message: string) => {
                const [
                  correlationIdWithBrackets,
                  method,
                  url,
                  statusCodeString,
                  contentLengthString,
                  ,
                  responseTimeInMsString,
                  ,
                ] = message.split(' ');
                const correlationId = correlationIdWithBrackets.replace(
                  /\[|\]/g,
                  '',
                );
                const statusCode = parseInt(statusCodeString);
                const contentLengthInBytes = contentLengthString
                  ? parseInt(contentLengthString)
                  : 0;
                const responseTimeInMs = parseFloat(responseTimeInMsString);
                const parsedMessage = [
                  correlationIdWithBrackets,
                  method,
                  url,
                  statusCodeString,
                  contentLengthInBytes,
                  'bytes',
                  responseTimeInMsString,
                  'ms',
                ].join(' ');
                this.loggerService.log(parsedMessage.replace(/\n$/, ''), {
                  correlationId,
                  method,
                  url,
                  statusCode,
                  contentLengthInBytes,
                  responseTimeInMs,
                });
              },
            },
          },
        ),
      )
      .forRoutes('*');
  }

  async onApplicationShutdown() {
    await this.pinoLoggerAdapter.flush();
  }
}
