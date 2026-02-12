import { LoggerService, MiddlewareConsumer, NestModule, OnApplicationShutdown } from '@nestjs/common';
import { PinoLoggerAdapter } from '../logger/pino-logger';
import { correlationIdKey } from '../correlation/correlation.constants';
import { BaseConfigEntity } from '../config/base-config.entity';
declare module 'express' {
    interface Request {
        [correlationIdKey]: string;
    }
}
export declare const LOGGER_SERVICE_PORT: unique symbol;
export declare class LoggerModule implements NestModule, OnApplicationShutdown {
    private readonly baseConfig;
    private readonly pinoLoggerAdapter;
    private readonly loggerService;
    constructor(baseConfig: BaseConfigEntity, pinoLoggerAdapter: PinoLoggerAdapter, loggerService: LoggerService);
    configure(consumer: MiddlewareConsumer): void;
    onApplicationShutdown(): Promise<void>;
}
