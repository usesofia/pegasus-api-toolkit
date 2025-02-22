import {
  Global,
  Inject,
  LoggerService,
  MiddlewareConsumer,
  Module,
  NestModule,
  OnApplicationShutdown,
} from '@nestjs/common';
import { PinoLoggerAdapter } from './pino-logger';
import * as morgan from 'morgan';
import {
  correlationIdKey,
  correlationIdTokenKey,
} from '../correlation/correlation.constants';

export const LOGGER_SERVICE_PORT = Symbol('LoggerServicePort');

morgan.token(correlationIdTokenKey, (req: any) => req[correlationIdKey]);

@Global()
@Module({
  providers: [
    PinoLoggerAdapter,
    {
      provide: LOGGER_SERVICE_PORT,
      useFactory: (pinoLoggerAdapter: PinoLoggerAdapter) => {
        return pinoLoggerAdapter;
      },
      inject: [PinoLoggerAdapter],
    },
  ],
  exports: [LOGGER_SERVICE_PORT],
})
export class LoggerModule implements NestModule, OnApplicationShutdown {
  constructor(
    @Inject(PinoLoggerAdapter)
    private readonly pinoLoggerAdapter: PinoLoggerAdapter,
    @Inject(LOGGER_SERVICE_PORT)
    private readonly loggerService: LoggerService,
  ) {}

  async onApplicationShutdown() {
    await this.pinoLoggerAdapter.flush();
    await new Promise((resolve) => setTimeout(resolve, 4000));
  }

  public configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(
        morgan(
          (tokens, req, res) => {
            return [
              `[${tokens[correlationIdTokenKey](req, res)}]`,
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
                  _,
                  responseTimeInMsString,
                  __,
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
}
