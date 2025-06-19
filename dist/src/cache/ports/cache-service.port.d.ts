export interface CacheServicePort {
    get(key: string): Promise<string | null>;
    set(key: string, value: string, ttlInSeconds?: number): Promise<void>;
    delete(key: string): Promise<void>;
}
export declare const CACHE_SERVICE_PORT: unique symbol;
