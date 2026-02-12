import { OnApplicationShutdown } from '@nestjs/common';
import Redis from 'ioredis';
export declare class CacheModule implements OnApplicationShutdown {
    private readonly redis;
    constructor(redis: Redis | null);
    onApplicationShutdown(): Promise<void>;
}
