import { LoggerService } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { z } from 'zod';
import { Base } from '@app/base';
import { BaseConfigEntity } from '@app/config/base-config.entity';
declare const HealthResponseDto_base: import("nestjs-zod").ZodDto<{
    status: string;
}, z.ZodObjectDef<{
    status: z.ZodString;
}, "strip", z.ZodTypeAny>, {
    status: string;
}>;
declare class HealthResponseDto extends HealthResponseDto_base {
}
export declare class HealthController extends Base {
    protected readonly baseConfig: BaseConfigEntity;
    protected readonly logger: LoggerService;
    protected readonly cls: ClsService;
    constructor(baseConfig: BaseConfigEntity, logger: LoggerService, cls: ClsService);
    health(): Promise<HealthResponseDto>;
    healthPost(): Promise<HealthResponseDto>;
    error(): Promise<never>;
}
export {};
