"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisCacheServiceAdapter = void 0;
const ioredis_1 = require("ioredis");
const base_config_entity_1 = require("../../config/base-config.entity");
const common_1 = require("@nestjs/common");
let RedisCacheServiceAdapter = class RedisCacheServiceAdapter {
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
};
exports.RedisCacheServiceAdapter = RedisCacheServiceAdapter;
exports.RedisCacheServiceAdapter = RedisCacheServiceAdapter = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [base_config_entity_1.BaseConfigEntity,
        ioredis_1.Redis])
], RedisCacheServiceAdapter);
//# sourceMappingURL=redis-cache-service.adapter.js.map