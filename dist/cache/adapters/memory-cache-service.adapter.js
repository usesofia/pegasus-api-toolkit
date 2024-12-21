"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryCacheServiceAdapter = void 0;
const cache = require('memory-cache-ttl');
class MemoryCacheServiceAdapter {
    constructor(baseConfig) {
        this.baseConfig = baseConfig;
        cache.init({ interval: 1 });
    }
    async get(key) {
        return cache.get(key) || null;
    }
    async set(key, value, ttlInSeconds) {
        cache.set(key, value, ttlInSeconds ?? this.baseConfig.cache.ttlInSeconds);
    }
    async delete(key) {
        cache.del(key);
    }
}
exports.MemoryCacheServiceAdapter = MemoryCacheServiceAdapter;
//# sourceMappingURL=memory-cache-service.adapter.js.map