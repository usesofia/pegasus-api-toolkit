import { LoggerService } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { z } from 'zod';
import { Base } from '@app/base';
import { BaseConfigEntity } from '@app/config/base-config.entity';
declare const HealthResponseDto_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    status: z.ZodString;
}, z.core.$strip>> & {
    io: "input";
};
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
