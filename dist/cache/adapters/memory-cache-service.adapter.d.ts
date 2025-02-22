import { CacheServicePort } from '../ports/cache-service.port';
import { BaseConfigEntity } from '../../config/base-config.entity';
export declare class MemoryCacheServiceAdapter implements CacheServicePort {
    private readonly baseConfig;
    private records;
    constructor(baseConfig: BaseConfigEntity);
    get(key: string): Promise<string | null>;
    set(key: string, value: string, ttlInSeconds?: number): Promise<void>;
    delete(key: string): Promise<void>;
}
