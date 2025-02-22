import { LoggerService, MiddlewareConsumer, NestModule, OnApplicationShutdown } from '@nestjs/common';
import { PinoLoggerAdapter } from './pino-logger';
export declare const LOGGER_SERVICE_PORT: unique symbol;
export declare class LoggerModule implements NestModule, OnApplicationShutdown {
    private readonly pinoLoggerAdapter;
    private readonly loggerService;
    constructor(pinoLoggerAdapter: PinoLoggerAdapter, loggerService: LoggerService);
    onApplicationShutdown(): Promise<void>;
    configure(consumer: MiddlewareConsumer): void;
}
