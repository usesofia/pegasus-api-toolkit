import { Inject, Injectable } from '@nestjs/common';
import { Connection } from 'mongoose';
import { BaseConfigEntity } from '@app/config/base-config.entity';
import { CacheServicePort } from '@app/cache/ports/cache-service.port';
import { PRIMARY_MONGOOSE_CONNECTION } from '@app/database/primary-mongodb-database.module';
import { Schema } from 'mongoose';

interface CacheRecord {
  key: string;
  value: string;
  expiresAt: Date;
}

export const CACHE_RECORD_COLLECTION_NAME = '_CacheRecords';

const CacheRecordSchema = new Schema<CacheRecord>(
  {
    key: { type: String, required: true, index: true },
    value: { type: String, required: true },
    expiresAt: { type: Date, required: true, index: true },
  },
  {
    timestamps: true,
    collection: CACHE_RECORD_COLLECTION_NAME,
  },
);

@Injectable()
export class MongoDbCacheServiceAdapter implements CacheServicePort {
  private readonly cacheModel;

  constructor(
    private readonly baseConfig: BaseConfigEntity,
    @Inject(PRIMARY_MONGOOSE_CONNECTION)
    private readonly connection: Connection,
  ) {
    // Create the model only once per instance
    this.cacheModel = this.connection.model<CacheRecord>(
      CACHE_RECORD_COLLECTION_NAME,
      CacheRecordSchema,
    );
  }

  async createTTLIndex() {
    const indexName = 'ttlIndex';

    // Wait for collection to exist
    const db = this.connection.db;
    if (db) {
      const collectionExists = await db.listCollections({ name: CACHE_RECORD_COLLECTION_NAME }).hasNext();
      if (!collectionExists) {
        // Create a document to ensure collection exists
        await this.cacheModel.create({
          key: '_init',
          value: 'initialized',
          expiresAt: new Date(Date.now() + 60000), // Expires in 1 minute
        });
      }
    }

    const indexExists = await this.cacheModel.collection.indexExists(indexName);

    if (!indexExists) {
      await this.cacheModel.collection.createIndex(
        { expiresAt: 1 },
        { expireAfterSeconds: 0, name: indexName },
      );
    }
  }

  async get(key: string): Promise<string | null> {
    const keyPrefix = this.baseConfig.cache.mongodb?.keyPrefix ?? '';
    const finalKey = `${keyPrefix}${key}`;
    const now = new Date();
    const record = await this.cacheModel.findOne({
      key: finalKey,
      expiresAt: { $gt: now },
    });

    if (!record) {
      return null;
    }

    return record.value;
  }

  async set(key: string, value: string, ttlInSeconds?: number): Promise<void> {
    const keyPrefix = this.baseConfig.cache.mongodb?.keyPrefix ?? '';
    const finalKey = `${keyPrefix}${key}`;
    const ttl = ttlInSeconds ?? this.baseConfig.cache.ttlInSeconds;
    const expiresAt = new Date();
    expiresAt.setSeconds(expiresAt.getSeconds() + ttl);

    await this.cacheModel.findOneAndUpdate(
      { key: finalKey },
      { key: finalKey, value, expiresAt },
      { upsert: true, new: true },
    );
  }

  async delete(key: string): Promise<void> {
    const keyPrefix = this.baseConfig.cache.mongodb?.keyPrefix ?? '';
    const finalKey = `${keyPrefix}${key}`;
    await this.cacheModel.deleteOne({ key: finalKey });
  }
}
