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
import Redis from 'ioredis';

const REDIS = Symbol('Redis');

@Global()
@Module({
  providers: [
    {
      provide: REDIS,
      useFactory: (baseConfig: BaseConfigEntity) => {
        if (baseConfig.cache.type === 'redis') {
          return new Redis(baseConfig.cache.redis!.url, {
            keyPrefix: baseConfig.cache.redis!.keyPrefix,
          });
        }
        return null;
      },
      inject: [BASE_CONFIG],
    },
    {
      provide: CACHE_SERVICE_PORT,
      useFactory: (baseConfig: BaseConfigEntity, redis: Redis) => {
        if (baseConfig.cache.type === 'redis') {
          return new RedisCacheServiceAdapter(baseConfig, redis);
        } else {
          return new MemoryCacheServiceAdapter(baseConfig);
        }
      },
      inject: [BASE_CONFIG, REDIS],
    },
  ],
  exports: [CACHE_SERVICE_PORT],
})
export class CacheModule implements OnApplicationShutdown {
  constructor(@Inject(REDIS) private readonly redis: Redis | null) {}

  async onApplicationShutdown() {
    if (this.redis) {
      await this.redis.quit();
    }
  }
}
