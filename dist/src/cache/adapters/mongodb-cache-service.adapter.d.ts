import { Connection } from 'mongoose';
import { BaseConfigEntity } from '@app/config/base-config.entity';
import { CacheServicePort } from '@app/cache/ports/cache-service.port';
export declare const CACHE_RECORD_COLLECTION_NAME = "_CacheRecords";
export declare class MongoDbCacheServiceAdapter implements CacheServicePort {
    private readonly baseConfig;
    private readonly connection;
    private readonly cacheModel;
    constructor(baseConfig: BaseConfigEntity, connection: Connection);
    createTTLIndex(): Promise<void>;
    get(key: string): Promise<string | null>;
    set(key: string, value: string, ttlInSeconds?: number): Promise<void>;
    delete(key: string): Promise<void>;
}
