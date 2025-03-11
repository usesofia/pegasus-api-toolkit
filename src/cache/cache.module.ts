import {
  Global,
  Module,
  Inject,
  OnApplicationShutdown,
} from '@nestjs/common';
import { RedisCacheServiceAdapter } from '@app/cache/adapters/redis-cache-service.adapter';
import { CACHE_SERVICE_PORT } from '@app/cache/ports/cache-service.port';
import { BaseConfigEntity, BASE_CONFIG } from '@app/config/base-config.entity';
import { MemoryCacheServiceAdapter } from '@app/cache/adapters/memory-cache-service.adapter';
import { MongoDbCacheServiceAdapter } from '@app/cache/adapters/mongodb-cache-service.adapter';
import { PRIMARY_MONGOOSE_CONNECTION } from '@app/database/primary-mongodb-database.module';
import Redis from 'ioredis';
import mongoose from 'mongoose';
import { CacheController } from '@app/cache/cache.controller';

const REDIS = Symbol('Redis');

@Global()
@Module({
  controllers: [CacheController],
  providers: [
    {
      provide: REDIS,
      useFactory: (baseConfig: BaseConfigEntity) => {
        if (baseConfig.cache.type === 'redis') {
          return new Redis(baseConfig.cache.redis?.url ?? '', {
            keyPrefix: baseConfig.cache.redis?.keyPrefix ?? '',
          });
        }
        return null;
      },
      inject: [BASE_CONFIG],
    },
    {
      provide: CACHE_SERVICE_PORT,
      useFactory: async (
        baseConfig: BaseConfigEntity, 
        redis: Redis | null,
        mongoConnection: mongoose.Connection
      ) => {
        if (baseConfig.cache.type === 'redis' && redis) {
          return new RedisCacheServiceAdapter(baseConfig, redis);
        } else if (baseConfig.cache.type === 'mongodb') {
          const cacheService = new MongoDbCacheServiceAdapter(baseConfig, mongoConnection);
          await cacheService.createTTLIndex();
          return cacheService;
        } else {
          return new MemoryCacheServiceAdapter(baseConfig);
        }
      },
      inject: [BASE_CONFIG, REDIS, PRIMARY_MONGOOSE_CONNECTION],
    },
  ],
  exports: [CACHE_SERVICE_PORT],
})
export class CacheModule implements OnApplicationShutdown {
  constructor(
    @Inject(REDIS) private readonly redis: Redis | null
  ) {}

  async onApplicationShutdown() {
    if (this.redis) {
      await this.redis.quit();
    }
  }
}
