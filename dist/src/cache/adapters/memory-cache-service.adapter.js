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
exports.MemoryCacheServiceAdapter = void 0;
const base_config_entity_1 = require("../../config/base-config.entity");
const common_1 = require("@nestjs/common");
const luxon_1 = require("luxon");
let MemoryCacheServiceAdapter = class MemoryCacheServiceAdapter {
    constructor(baseConfig) {
        this.baseConfig = baseConfig;
        this.records = new Map();
    }
    get(key) {
        const record = this.records.get(key);
        if (!record) {
            return Promise.resolve(null);
        }
        const isExpired = record.createdAt.plus({ seconds: record.ttlInSeconds }).diffNow()
            .seconds > 0;
        if (isExpired) {
            this.records.delete(key);
            return Promise.resolve(null);
        }
        return Promise.resolve(record.value);
    }
    set(key, value, ttlInSeconds) {
        this.records.set(key, {
            value,
            createdAt: luxon_1.DateTime.now(),
            ttlInSeconds: ttlInSeconds ?? this.baseConfig.cache.ttlInSeconds,
        });
        return Promise.resolve();
    }
    delete(key) {
        this.records.delete(key);
        return Promise.resolve();
    }
};
exports.MemoryCacheServiceAdapter = MemoryCacheServiceAdapter;
exports.MemoryCacheServiceAdapter = MemoryCacheServiceAdapter = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [base_config_entity_1.BaseConfigEntity])
], MemoryCacheServiceAdapter);
//# sourceMappingURL=memory-cache-service.adapter.js.map