import { LoggerService } from "@nestjs/common";
export declare class CliConsoleLoggerAdapter implements LoggerService {
    log(message: string, ...optionalParams: unknown[]): void;
    error(message: string, ...optionalParams: unknown[]): void;
    warn(message: string, ...optionalParams: unknown[]): void;
    debug?(): void;
    verbose?(message: string, ...optionalParams: unknown[]): void;
    fatal?(message: string, ...optionalParams: unknown[]): void;
    setLogLevels?(): void;
}
