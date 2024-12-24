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
var AuthController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const nestjs_cls_1 = require("nestjs-cls");
const swagger_1 = require("@nestjs/swagger");
const auth_service_port_1 = require("./ports/auth-service.port");
const auth_user_entity_1 = require("./entities/auth-user.entity");
const pub_sub_message_dto_1 = require("../pub-sub/pub-sub-message.dto");
const cache_hit_on_get_auth_user_payload_1 = require("./payloads/cache-hit-on-get-auth-user.payload");
const base_config_entity_1 = require("../config/base-config.entity");
const gcp_service_account_guard_1 = require("./guards/gcp-service-account.guard");
const ignore_auth_guard_decorator_1 = require("./decorators/ignore-auth-guard.decorator");
const app_exceptions_filter_1 = require("../app-exceptions.filter");
const base_1 = require("../base");
const logger_module_1 = require("../logger/logger.module");
const log_utils_1 = require("../utils/log.utils");
let AuthController = AuthController_1 = class AuthController extends base_1.Base {
    constructor(baseConfig, logger, cls, authService) {
        super(AuthController_1.name, baseConfig, logger, cls);
        this.baseConfig = baseConfig;
        this.logger = logger;
        this.cls = cls;
        this.authService = authService;
    }
    async refreshAuthUserOnCache(body) {
        const payload = body.extractPayload(cache_hit_on_get_auth_user_payload_1.CacheHitOnGetAuthUserPayload);
        await this.authService.getUser({
            userId: payload.userId,
            organizationId: payload.organizationId,
            organizationRole: payload.organizationRole,
            ignoreCache: true,
        });
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, swagger_1.ApiOperation)({
        operationId: 'refreshAuthUserOnCache',
        summary: 'Atualiza os dados do usuário na cache.',
    }),
    (0, swagger_1.ApiBody)({
        type: pub_sub_message_dto_1.PubSubMessageBodyDto,
    }),
    (0, swagger_1.ApiOkResponse)({
        type: auth_user_entity_1.AuthUserEntity,
    }),
    (0, ignore_auth_guard_decorator_1.IgnoreAuthGuard)(),
    (0, common_1.UseGuards)(gcp_service_account_guard_1.GcpServiceAccountGuard),
    (0, common_1.Post)('/internal/auth/users/cache/refresh'),
    (0, log_utils_1.Log)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pub_sub_message_dto_1.PubSubMessageBodyDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshAuthUserOnCache", null);
exports.AuthController = AuthController = AuthController_1 = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, swagger_1.ApiResponse)({
        type: app_exceptions_filter_1.ExceptionResponseEntity,
    }),
    (0, common_1.Controller)(),
    __param(0, (0, common_1.Inject)(base_config_entity_1.BASE_CONFIG)),
    __param(1, (0, common_1.Inject)(logger_module_1.LOGGER_SERVICE_PORT)),
    __param(3, (0, common_1.Inject)(auth_service_port_1.AUTH_SERVICE_PORT)),
    __metadata("design:paramtypes", [base_config_entity_1.BaseConfigEntity, Object, nestjs_cls_1.ClsService, Object])
], AuthController);
//# sourceMappingURL=auth.controller.js.map