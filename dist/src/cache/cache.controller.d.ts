import { LoggerService } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { z } from 'zod';
import { Base } from '@app/base';
import { BaseConfigEntity } from '@app/config/base-config.entity';
import { CacheServicePort } from '@app/cache/ports/cache-service.port';
declare const CacheSetDto_base: import("nestjs-zod").ZodDto<{
    value: string;
}, z.ZodObjectDef<{
    value: z.ZodString;
}, "strip", z.ZodTypeAny>, {
    value: string;
}>;
declare class CacheSetDto extends CacheSetDto_base {
}
declare const CacheGetResponseDto_base: import("nestjs-zod").ZodDto<{
    value: string | null;
}, z.ZodObjectDef<{
    value: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny>, {
    value: string | null;
}>;
declare class CacheGetResponseDto extends CacheGetResponseDto_base {
}
export declare class CacheController extends Base {
    protected readonly baseConfig: BaseConfigEntity;
    protected readonly logger: LoggerService;
    protected readonly cacheService: CacheServicePort;
    protected readonly cls: ClsService;
    constructor(baseConfig: BaseConfigEntity, logger: LoggerService, cacheService: CacheServicePort, cls: ClsService);
    setCacheValue(body: CacheSetDto): Promise<void>;
    getCacheValue(): Promise<CacheGetResponseDto>;
}
export {};
