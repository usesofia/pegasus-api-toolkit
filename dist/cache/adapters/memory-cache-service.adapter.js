"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryCacheServiceAdapter = void 0;
const luxon_1 = require("luxon");
class MemoryCacheServiceAdapter {
    constructor(baseConfig) {
        this.baseConfig = baseConfig;
        this.records = {};
        this.records = {};
    }
    get(key) {
        const record = this.records[key];
        if (!record) {
            return Promise.resolve(null);
        }
        const isExpired = record.createdAt.plus({ seconds: record.ttlInSeconds }).diffNow()
            .seconds > 0;
        if (isExpired) {
            delete this.records[key];
            return Promise.resolve(null);
        }
        return Promise.resolve(record.value);
    }
    set(key, value, ttlInSeconds) {
        this.records[key] = {
            value,
            createdAt: luxon_1.DateTime.now(),
            ttlInSeconds: ttlInSeconds ?? this.baseConfig.cache.ttlInSeconds,
        };
        return Promise.resolve();
    }
    delete(key) {
        delete this.records[key];
        return Promise.resolve();
    }
}
exports.MemoryCacheServiceAdapter = MemoryCacheServiceAdapter;
//# sourceMappingURL=memory-cache-service.adapter.js.map