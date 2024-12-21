import { LoggerService, MiddlewareConsumer, NestModule } from '@nestjs/common';
export declare const LOGGER_SERVICE_PORT: unique symbol;
export declare class LoggerModule implements NestModule {
    private readonly loggerService;
    constructor(loggerService: LoggerService);
    configure(consumer: MiddlewareConsumer): void;
}
