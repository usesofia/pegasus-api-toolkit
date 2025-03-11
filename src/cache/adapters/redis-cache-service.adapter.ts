import { Redis } from 'ioredis';
import { BaseConfigEntity } from '@app/config/base-config.entity';
import { CacheServicePort } from '@app/cache/ports/cache-service.port';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RedisCacheServiceAdapter implements CacheServicePort {
  constructor(
    private readonly baseConfig: BaseConfigEntity,
    private readonly redis: Redis,
  ) {}

  async get(key: string): Promise<string | null> {
    return await this.redis.get(key);
  }

  async set(key: string, value: string, ttlInSeconds?: number): Promise<void> {
    await this.redis.set(
      key,
      value,
      'EX',
      ttlInSeconds ?? this.baseConfig.cache.ttlInSeconds,
    );
  }

  async delete(key: string): Promise<void> {
    await this.redis.del(key);
  }
}
