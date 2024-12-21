import { Redis } from 'ioredis';
import { BaseConfigEntity } from '../../config/base-config.entity';
import { CacheServicePort } from '../ports/cache-service.port';
export declare class RedisCacheServiceAdapter implements CacheServicePort {
    private readonly baseConfig;
    private readonly redis;
    constructor(baseConfig: BaseConfigEntity, redis: Redis);
    get(key: string): Promise<string | null>;
    set(key: string, value: string, ttlInSeconds?: number): Promise<void>;
    delete(key: string): Promise<void>;
}
