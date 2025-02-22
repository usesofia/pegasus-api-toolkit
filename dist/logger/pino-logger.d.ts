import { LoggerService, LogLevel } from '@nestjs/common';
import { BaseConfigEntity } from '../config/base-config.entity';
export declare class PinoLoggerAdapter implements LoggerService {
    private readonly baseConfig;
    private readonly remoteLogger;
    private readonly consoleLogger;
    private readonly shouldConsoleLog;
    private readonly environment;
    private readonly batchInterval;
    constructor(baseConfig: BaseConfigEntity);
    logLevel(level: LogLevel, message: any, ...optionalParams: any[]): void;
    log(message: any, ...optionalParams: any[]): void;
    error(message: any, ...optionalParams: any[]): void;
    warn(message: any, ...optionalParams: any[]): void;
    debug?(message: any, ...optionalParams: any[]): void;
    verbose?(message: any, ...optionalParams: any[]): void;
    fatal?(message: any, ...optionalParams: any[]): void;
    setLogLevels?(_: LogLevel[]): void;
    flush(): Promise<void>;
}
