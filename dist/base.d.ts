import { LoggerService, LogLevel } from '@nestjs/common';
import { BaseConfigEntity } from './config/base-config.entity';
import { ClsService } from 'nestjs-cls';
export declare class Base {
    private readonly className;
    protected readonly baseConfig: BaseConfigEntity;
    protected readonly logger: LoggerService;
    protected readonly cls: ClsService;
    constructor(className: string, baseConfig: BaseConfigEntity, logger: LoggerService, cls: ClsService);
    logLevel({ functionName, level, suffix, data, }: {
        functionName: string;
        level: LogLevel;
        suffix: string;
        data: any;
    }): void;
    log({ functionName, suffix, data, }: {
        functionName: string;
        suffix: string;
        data: any;
    }): void;
    logDebug({ functionName, suffix, data, }: {
        functionName: string;
        suffix: string;
        data: any;
    }): void;
    logError({ functionName, suffix, data, }: {
        functionName: string;
        suffix: string;
        data: any;
    }): void;
    logWarn({ functionName, suffix, data, }: {
        functionName: string;
        suffix: string;
        data: any;
    }): void;
    logFatal({ functionName, suffix, data, }: {
        functionName: string;
        suffix: string;
        data: any;
    }): void;
    logVerbose({ functionName, suffix, data, }: {
        functionName: string;
        suffix: string;
        data: any;
    }): void;
}
