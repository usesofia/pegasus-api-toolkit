import { CacheServicePort } from '../ports/cache-service.port';
import { BaseConfigEntity } from '../../config/base-config.entity';
import { DateTime } from 'luxon';

interface CacheRecord {
  value: string;
  createdAt: DateTime;
  ttlInSeconds: number;
}

export class MemoryCacheServiceAdapter implements CacheServicePort {
  private records: Record<string, CacheRecord> = {};

  constructor(private readonly baseConfig: BaseConfigEntity) {
    this.records = {};
  }

  async get(key: string): Promise<string | null> {
    const record = this.records[key];

    if (!record) {
      return null;
    }

    const isExpired = record.createdAt.plus({ seconds: record.ttlInSeconds }).diffNow().seconds > 0;

    if (isExpired) {
      delete this.records[key];
      return null;
    }

    return record.value;
  }

  async set(key: string, value: string, ttlInSeconds?: number): Promise<void> {
    this.records[key] = {
      value,
      createdAt: DateTime.now(),
      ttlInSeconds: ttlInSeconds ?? this.baseConfig.cache.ttlInSeconds,
    };
  }

  async delete(key: string): Promise<void> {
    delete this.records[key];
  }
}
