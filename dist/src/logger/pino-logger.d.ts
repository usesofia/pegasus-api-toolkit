import { BaseConfigEntity } from '../config/base-config.entity';
import { LoggerService, LogLevel } from '@nestjs/common';
export declare class PinoLoggerAdapter implements LoggerService {
    private readonly baseConfig;
    private readonly remoteLogger;
    private readonly consoleLogger;
    private readonly shouldConsoleLog;
    private readonly environment;
    private readonly remoteLoggerTransport;
    private readonly remoteLoggerTransportClose;
    constructor(baseConfig: BaseConfigEntity);
    logLevel(level: LogLevel, message: string, ...optionalParams: unknown[]): void;
    log(message: string, ...optionalParams: unknown[]): void;
    error(message: string, ...optionalParams: unknown[]): void;
    warn(message: string, ...optionalParams: unknown[]): void;
    debug?(message: string, ...optionalParams: unknown[]): void;
    verbose?(message: string, ...optionalParams: unknown[]): void;
    fatal?(message: string, ...optionalParams: unknown[]): void;
    setLogLevels?(): void;
    flush(): Promise<void>;
}
