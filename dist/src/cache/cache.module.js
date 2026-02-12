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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheModule = void 0;
const common_1 = require("@nestjs/common");
const redis_cache_service_adapter_1 = require("./adapters/redis-cache-service.adapter");
const cache_service_port_1 = require("./ports/cache-service.port");
const base_config_entity_1 = require("../config/base-config.entity");
const memory_cache_service_adapter_1 = require("./adapters/memory-cache-service.adapter");
const mongodb_cache_service_adapter_1 = require("./adapters/mongodb-cache-service.adapter");
const primary_mongodb_database_module_1 = require("../database/primary-mongodb-database.module");
const ioredis_1 = __importDefault(require("ioredis"));
const cache_controller_1 = require("./cache.controller");
const REDIS = Symbol('Redis');
let CacheModule = class CacheModule {
    constructor(redis) {
        this.redis = redis;
    }
    async onApplicationShutdown() {
        if (this.redis) {
            await this.redis.quit();
        }
    }
};
exports.CacheModule = CacheModule;
exports.CacheModule = CacheModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        controllers: [cache_controller_1.CacheController],
        providers: [
            {
                provide: REDIS,
                useFactory: (baseConfig) => {
                    if (baseConfig.cache.type === 'redis') {
                        return new ioredis_1.default(baseConfig.cache.redis?.url ?? '', {
                            keyPrefix: baseConfig.cache.redis?.keyPrefix ?? '',
                        });
                    }
                    return null;
                },
                inject: [base_config_entity_1.BASE_CONFIG],
            },
            {
                provide: cache_service_port_1.CACHE_SERVICE_PORT,
                useFactory: async (baseConfig, redis, mongoConnection) => {
                    if (baseConfig.cache.type === 'redis' && redis) {
                        return new redis_cache_service_adapter_1.RedisCacheServiceAdapter(baseConfig, redis);
                    }
                    else if (baseConfig.cache.type === 'mongodb') {
                        const cacheService = new mongodb_cache_service_adapter_1.MongoDbCacheServiceAdapter(baseConfig, mongoConnection);
                        await cacheService.createTTLIndex();
                        return cacheService;
                    }
                    else {
                        return new memory_cache_service_adapter_1.MemoryCacheServiceAdapter(baseConfig);
                    }
                },
                inject: [base_config_entity_1.BASE_CONFIG, REDIS, primary_mongodb_database_module_1.PRIMARY_MONGOOSE_CONNECTION],
            },
        ],
        exports: [cache_service_port_1.CACHE_SERVICE_PORT],
    }),
    __param(0, (0, common_1.Inject)(REDIS)),
    __metadata("design:paramtypes", [Object])
], CacheModule);
//# sourceMappingURL=cache.module.js.map