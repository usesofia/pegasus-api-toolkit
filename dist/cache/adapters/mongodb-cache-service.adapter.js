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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDbCacheServiceAdapter = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const base_config_entity_1 = require("../../config/base-config.entity");
const primary_mongodb_database_module_1 = require("../../database/primary-mongodb-database.module");
const mongoose_2 = require("mongoose");
const CacheRecordSchema = new mongoose_2.Schema({
    key: { type: String, required: true, index: true },
    value: { type: String, required: true },
    expiresAt: { type: Date, required: true, index: true },
}, { timestamps: true });
let MongoDbCacheServiceAdapter = class MongoDbCacheServiceAdapter {
    constructor(baseConfig, connection) {
        this.baseConfig = baseConfig;
        this.connection = connection;
        this.cacheModel = this.connection.model('CacheRecord', CacheRecordSchema);
    }
    async createTTLIndex() {
        await this.cacheModel.collection.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
    }
    async get(key) {
        const keyPrefix = this.baseConfig.cache.mongodb?.keyPrefix ?? '';
        const finalKey = `${keyPrefix}${key}`;
        const now = new Date();
        const record = await this.cacheModel.findOne({
            key: finalKey,
            expiresAt: { $gt: now }
        });
        if (!record) {
            return null;
        }
        return record.value;
    }
    async set(key, value, ttlInSeconds) {
        const keyPrefix = this.baseConfig.cache.mongodb?.keyPrefix ?? '';
        const finalKey = `${keyPrefix}${key}`;
        const ttl = ttlInSeconds ?? this.baseConfig.cache.ttlInSeconds;
        const expiresAt = new Date();
        expiresAt.setSeconds(expiresAt.getSeconds() + ttl);
        await this.cacheModel.findOneAndUpdate({ key: finalKey }, { key: finalKey, value, expiresAt }, { upsert: true, new: true });
    }
    async delete(key) {
        const keyPrefix = this.baseConfig.cache.mongodb?.keyPrefix ?? '';
        const finalKey = `${keyPrefix}${key}`;
        await this.cacheModel.deleteOne({ key: finalKey });
    }
};
exports.MongoDbCacheServiceAdapter = MongoDbCacheServiceAdapter;
exports.MongoDbCacheServiceAdapter = MongoDbCacheServiceAdapter = __decorate([
    __param(1, (0, common_1.Inject)(primary_mongodb_database_module_1.PRIMARY_MONGOOSE_CONNECTION)),
    __metadata("design:paramtypes", [base_config_entity_1.BaseConfigEntity,
        mongoose_1.Connection])
], MongoDbCacheServiceAdapter);
//# sourceMappingURL=mongodb-cache-service.adapter.js.map