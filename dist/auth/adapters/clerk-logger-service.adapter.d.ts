import { LoggerService } from '@nestjs/common';
import { ClerkLogger } from '@usesofia/clerk-backend';
import { Base } from '../../base';
import { BaseConfigEntity } from '../../config/base-config.entity';
import { ClsService } from 'nestjs-cls';
export declare class ClerkLoggerServiceAdapter extends Base implements ClerkLogger {
    protected readonly baseConfig: BaseConfigEntity;
    protected readonly logger: LoggerService;
    protected readonly cls: ClsService;
    constructor(baseConfig: BaseConfigEntity, logger: LoggerService, cls: ClsService);
    logClerkInput({ functionName, args, }: {
        functionName: string;
        args: any[];
    }): void;
    logClerkOutput({ functionName, output, }: {
        functionName: string;
        output: any;
    }): void;
    logClerkRetryError({ functionName, currentAttempt, error, }: {
        functionName: string;
        currentAttempt: number;
        error: any;
    }): void;
    logClerkError({ functionName, error, }: {
        functionName: string;
        error: any;
    }): void;
}
