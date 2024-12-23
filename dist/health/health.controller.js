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
var HealthController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthController = void 0;
const common_1 = require("@nestjs/common");
const nestjs_cls_1 = require("nestjs-cls");
const swagger_1 = require("@nestjs/swagger");
const zod_1 = require("zod");
const nestjs_zod_1 = require("nestjs-zod");
const ignore_gcp_service_account_guard_decorator_1 = require("../auth/decorators/ignore-gcp-service-account-guard.decorator");
const app_exceptions_filter_1 = require("../app-exceptions.filter");
const base_1 = require("../base");
const logger_module_1 = require("../logger/logger.module");
const base_config_entity_1 = require("../config/base-config.entity");
const ignore_auth_guard_decorator_1 = require("../auth/decorators/ignore-auth-guard.decorator");
const log_utils_1 = require("../utils/log.utils");
const HealthResponseDtoSchema = zod_1.z.object({
    status: zod_1.z.string(),
});
class HealthResponseDto extends (0, nestjs_zod_1.createZodDto)(HealthResponseDtoSchema) {
}
let HealthController = HealthController_1 = class HealthController extends base_1.Base {
    constructor(baseConfig, logger, cls) {
        super(HealthController_1.name, baseConfig, logger, cls);
        this.baseConfig = baseConfig;
        this.logger = logger;
        this.cls = cls;
    }
    async health() {
        return { status: 'ok' };
    }
    async healthPost() {
        return { status: 'ok' };
    }
    async error() {
        throw new Error('Test error.');
    }
};
exports.HealthController = HealthController;
__decorate([
    (0, swagger_1.ApiOperation)({
        operationId: 'health',
        summary: 'Verifica o status do serviço.',
    }),
    (0, swagger_1.ApiOkResponse)({
        type: HealthResponseDto,
        description: 'Status do serviço.',
    }),
    (0, ignore_auth_guard_decorator_1.IgnoreAuthGuard)(),
    (0, ignore_gcp_service_account_guard_decorator_1.IgnoreGcpServiceAccountGuard)(),
    (0, common_1.Get)('/'),
    (0, log_utils_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "health", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        operationId: 'healthPost',
        summary: 'Verifica o status do serviço.',
    }),
    (0, swagger_1.ApiOkResponse)({
        type: HealthResponseDto,
        description: 'Status do serviço.',
    }),
    (0, ignore_auth_guard_decorator_1.IgnoreAuthGuard)(),
    (0, ignore_gcp_service_account_guard_decorator_1.IgnoreGcpServiceAccountGuard)(),
    (0, common_1.Post)('/'),
    (0, log_utils_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "healthPost", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        operationId: 'error',
        summary: 'Gera um erro de teste.',
    }),
    (0, ignore_auth_guard_decorator_1.IgnoreAuthGuard)(),
    (0, ignore_gcp_service_account_guard_decorator_1.IgnoreGcpServiceAccountGuard)(),
    (0, common_1.Get)('/error'),
    (0, log_utils_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "error", null);
exports.HealthController = HealthController = HealthController_1 = __decorate([
    (0, swagger_1.ApiTags)('Health'),
    (0, swagger_1.ApiResponse)({
        type: app_exceptions_filter_1.ExceptionResponseEntity,
    }),
    (0, common_1.Controller)(),
    __param(0, (0, common_1.Inject)(base_config_entity_1.BASE_CONFIG)),
    __param(1, (0, common_1.Inject)(logger_module_1.LOGGER_SERVICE_PORT)),
    __metadata("design:paramtypes", [base_config_entity_1.BaseConfigEntity, Object, nestjs_cls_1.ClsService])
], HealthController);
//# sourceMappingURL=health.controller.js.map