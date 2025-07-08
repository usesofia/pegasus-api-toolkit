import { LoggerService, LogLevel } from '@nestjs/common';
import { BaseConfigEntity } from '@app/config/base-config.entity';
import { ClsService } from 'nestjs-cls';
export declare class Base {
    private readonly className;
    protected readonly baseConfig: BaseConfigEntity;
    protected readonly logger: LoggerService;
    protected readonly cls: ClsService;
    constructor(className: string, baseConfig: BaseConfigEntity, logger: LoggerService, cls: ClsService);
    logLevel({ functionName, level, suffix, data, correlationId, }: {
        functionName: string;
        level: LogLevel;
        suffix: string;
        data: Record<string, unknown>;
        correlationId?: string;
    }): void;
    log({ functionName, suffix, data, correlationId, }: {
        functionName: string;
        suffix: string;
        data: Record<string, unknown>;
        correlationId?: string;
    }): void;
    logDebug({ functionName, suffix, data, correlationId, }: {
        functionName: string;
        suffix: string;
        data: Record<string, unknown>;
        correlationId?: string;
    }): void;
    logError({ functionName, suffix, data, correlationId, }: {
        functionName: string;
        suffix: string;
        data: Record<string, unknown>;
        correlationId?: string;
    }): void;
    logWarn({ functionName, suffix, data, correlationId, }: {
        functionName: string;
        suffix: string;
        data: Record<string, unknown>;
        correlationId?: string;
    }): void;
    logFatal({ functionName, suffix, data, correlationId, }: {
        functionName: string;
        suffix: string;
        data: Record<string, unknown>;
        correlationId?: string;
    }): void;
    logVerbose({ functionName, suffix, data, correlationId, }: {
        functionName: string;
        suffix: string;
        data: Record<string, unknown>;
        correlationId?: string;
    }): void;
}
