import { CacheServicePort } from '../ports/cache-service.port';
import { BaseConfigEntity } from '../../config/base-config.entity';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const cache = require('memory-cache-ttl');

export class MemoryCacheServiceAdapter implements CacheServicePort {
  constructor(private readonly baseConfig: BaseConfigEntity) {
    cache.init({ interval: 1 });
  }

  async get(key: string): Promise<string | null> {
    return (cache.get(key) as string) || null;
  }

  async set(key: string, value: string, ttlInSeconds?: number): Promise<void> {
    cache.set(key, value, ttlInSeconds ?? this.baseConfig.cache.ttlInSeconds);
  }

  async delete(key: string): Promise<void> {
    cache.del(key);
  }
}
