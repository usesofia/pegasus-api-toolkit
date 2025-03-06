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
var CacheController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheController = void 0;
const common_1 = require("@nestjs/common");
const nestjs_cls_1 = require("nestjs-cls");
const swagger_1 = require("@nestjs/swagger");
const zod_1 = require("zod");
const nestjs_zod_1 = require("nestjs-zod");
const base_1 = require("../base");
const logger_module_1 = require("../logger/logger.module");
const base_config_entity_1 = require("../config/base-config.entity");
const cache_service_port_1 = require("./ports/cache-service.port");
const app_exceptions_filter_1 = require("../app-exceptions.filter");
const log_utils_1 = require("../utils/log.utils");
const ignore_auth_guard_decorator_1 = require("../auth/decorators/ignore-auth-guard.decorator");
const ignore_gcp_service_account_guard_decorator_1 = require("../auth/decorators/ignore-gcp-service-account-guard.decorator");
const CacheSetDtoSchema = zod_1.z.object({
    value: zod_1.z.string().describe('String value to cache'),
});
class CacheSetDto extends (0, nestjs_zod_1.createZodDto)(CacheSetDtoSchema) {
}
const CacheGetResponseDtoSchema = zod_1.z.object({
    value: zod_1.z.string().nullable().describe('Cached string value, null if not found'),
});
class CacheGetResponseDto extends (0, nestjs_zod_1.createZodDto)(CacheGetResponseDtoSchema) {
}
const key = 'default';
let CacheController = CacheController_1 = class CacheController extends base_1.Base {
    constructor(baseConfig, logger, cacheService, cls) {
        super(CacheController_1.name, baseConfig, logger, cls);
        this.baseConfig = baseConfig;
        this.logger = logger;
        this.cacheService = cacheService;
        this.cls = cls;
    }
    async setCacheValue(body) {
        await this.cacheService.set(key, body.value, 10);
    }
    async getCacheValue() {
        const value = await this.cacheService.get(key);
        return { value };
    }
};
exports.CacheController = CacheController;
__decorate([
    (0, swagger_1.ApiOperation)({
        operationId: 'setCacheValue',
        summary: 'Set string value in cache with 10-second TTL'
    }),
    (0, swagger_1.ApiBody)({ type: CacheSetDto }),
    (0, swagger_1.ApiOkResponse)({ description: 'Successfully set value in cache' }),
    (0, ignore_auth_guard_decorator_1.IgnoreAuthGuard)(),
    (0, ignore_gcp_service_account_guard_decorator_1.IgnoreGcpServiceAccountGuard)(),
    (0, common_1.Put)('/external/cache'),
    (0, log_utils_1.Log)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CacheSetDto]),
    __metadata("design:returntype", Promise)
], CacheController.prototype, "setCacheValue", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        operationId: 'getCacheValue',
        summary: 'Get string value from cache'
    }),
    (0, swagger_1.ApiOkResponse)({ type: CacheGetResponseDto, description: 'Returns the cached string value or null if not found/expired' }),
    (0, ignore_auth_guard_decorator_1.IgnoreAuthGuard)(),
    (0, ignore_gcp_service_account_guard_decorator_1.IgnoreGcpServiceAccountGuard)(),
    (0, common_1.Get)('/external/cache'),
    (0, log_utils_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CacheController.prototype, "getCacheValue", null);
exports.CacheController = CacheController = CacheController_1 = __decorate([
    (0, swagger_1.ApiTags)('Cache'),
    (0, swagger_1.ApiResponse)({
        type: app_exceptions_filter_1.ExceptionResponseEntity,
    }),
    (0, common_1.Controller)(),
    __param(0, (0, common_1.Inject)(base_config_entity_1.BASE_CONFIG)),
    __param(1, (0, common_1.Inject)(logger_module_1.LOGGER_SERVICE_PORT)),
    __param(2, (0, common_1.Inject)(cache_service_port_1.CACHE_SERVICE_PORT)),
    __metadata("design:paramtypes", [base_config_entity_1.BaseConfigEntity, Object, Object, nestjs_cls_1.ClsService])
], CacheController);
//# sourceMappingURL=cache.controller.js.map