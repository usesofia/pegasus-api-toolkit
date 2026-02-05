import { LoggerService } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { z } from 'zod';
import { Base } from '@app/base';
import { BaseConfigEntity } from '@app/config/base-config.entity';
import { CacheServicePort } from '@app/cache/ports/cache-service.port';
declare const CacheSetDto_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    value: z.ZodString;
}, z.core.$strip>> & {
    io: "input";
};
declare class CacheSetDto extends CacheSetDto_base {
}
declare const CacheGetResponseDto_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    value: z.ZodNullable<z.ZodString>;
}, z.core.$strip>> & {
    io: "input";
};
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
