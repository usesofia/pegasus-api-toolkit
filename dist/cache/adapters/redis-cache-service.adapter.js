"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisCacheServiceAdapter = void 0;
class RedisCacheServiceAdapter {
    constructor(baseConfig, redis) {
        this.baseConfig = baseConfig;
        this.redis = redis;
    }
    async get(key) {
        return await this.redis.get(key);
    }
    async set(key, value, ttlInSeconds) {
        await this.redis.set(key, value, 'EX', ttlInSeconds ?? this.baseConfig.cache.ttlInSeconds);
    }
    async delete(key) {
        await this.redis.del(key);
    }
}
exports.RedisCacheServiceAdapter = RedisCacheServiceAdapter;
//# sourceMappingURL=redis-cache-service.adapter.js.map