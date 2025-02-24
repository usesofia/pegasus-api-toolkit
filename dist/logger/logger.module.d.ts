import { LoggerService, MiddlewareConsumer, NestModule, OnApplicationShutdown } from '@nestjs/common';
import { PinoLoggerAdapter } from './pino-logger';
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
    onApplicationShutdown(): Promise<void>;
    configure(consumer: MiddlewareConsumer): void;
}
