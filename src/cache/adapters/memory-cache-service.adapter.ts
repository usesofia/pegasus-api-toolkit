import { CacheServicePort } from '@app/cache/ports/cache-service.port';
import { BaseConfigEntity } from '@app/config/base-config.entity';
import { DateTime } from 'luxon';

interface CacheRecord {
  value: string;
  createdAt: DateTime;
  ttlInSeconds: number;
}

export class MemoryCacheServiceAdapter implements CacheServicePort {
  private records = new Map<string, CacheRecord>();

  constructor(private readonly baseConfig: BaseConfigEntity) {}

  get(key: string): Promise<string | null> {
    const record = this.records.get(key);

    if (!record) {
      return Promise.resolve(null);
    }

    const isExpired =
      record.createdAt.plus({ seconds: record.ttlInSeconds }).diffNow()
        .seconds > 0;

    if (isExpired) {
      this.records.delete(key);
      return Promise.resolve(null);
    }

    return Promise.resolve(record.value);
  }

  set(key: string, value: string, ttlInSeconds?: number): Promise<void> {
    this.records.set(key, {
      value,
      createdAt: DateTime.now(),
      ttlInSeconds: ttlInSeconds ?? this.baseConfig.cache.ttlInSeconds,
    });

    return Promise.resolve();
  }

  delete(key: string): Promise<void> {
    this.records.delete(key);
    return Promise.resolve();
  }
}
