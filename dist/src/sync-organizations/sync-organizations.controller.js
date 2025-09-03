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
var SyncOrganizationsController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncOrganizationsController = void 0;
const app_exceptions_filter_1 = require("../app-exceptions.filter");
const ignore_auth_guard_decorator_1 = require("../auth/decorators/ignore-auth-guard.decorator");
const gcp_service_account_guard_1 = require("../auth/guards/gcp-service-account.guard");
const base_1 = require("../base");
const base_config_entity_1 = require("../config/base-config.entity");
const logger_module_1 = require("../logger/logger.module");
const sync_organizations_service_port_1 = require("./ports/sync-organizations-service.port");
const log_utils_1 = require("../utils/log.utils");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const nestjs_cls_1 = require("nestjs-cls");
let SyncOrganizationsController = SyncOrganizationsController_1 = class SyncOrganizationsController extends base_1.Base {
    constructor(baseConfig, logger, cls, syncOrganizationsService) {
        super(SyncOrganizationsController_1.name, baseConfig, logger, cls);
        this.baseConfig = baseConfig;
        this.logger = logger;
        this.cls = cls;
        this.syncOrganizationsService = syncOrganizationsService;
    }
    async syncOrganizations() {
        await this.syncOrganizationsService.sync();
    }
};
exports.SyncOrganizationsController = SyncOrganizationsController;
__decorate([
    (0, swagger_1.ApiOperation)({
        operationId: 'syncOrganizations',
        summary: 'Sincroniza todas as organizações.',
    }),
    (0, ignore_auth_guard_decorator_1.IgnoreAuthGuard)(),
    (0, common_1.UseGuards)(gcp_service_account_guard_1.GcpServiceAccountGuard),
    (0, common_1.Post)('/internal/sync-organizations'),
    (0, log_utils_1.Log)('controller'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SyncOrganizationsController.prototype, "syncOrganizations", null);
exports.SyncOrganizationsController = SyncOrganizationsController = SyncOrganizationsController_1 = __decorate([
    (0, swagger_1.ApiTags)('Sync Organizations'),
    (0, swagger_1.ApiResponse)({
        type: app_exceptions_filter_1.ExceptionResponseEntity,
    }),
    (0, common_1.Controller)(),
    __param(0, (0, common_1.Inject)(base_config_entity_1.BASE_CONFIG)),
    __param(1, (0, common_1.Inject)(logger_module_1.LOGGER_SERVICE_PORT)),
    __param(3, (0, common_1.Inject)(sync_organizations_service_port_1.SYNC_ORGANIZATIONS_SERVICE_PORT)),
    __metadata("design:paramtypes", [base_config_entity_1.BaseConfigEntity, Object, nestjs_cls_1.ClsService, Object])
], SyncOrganizationsController);
//# sourceMappingURL=sync-organizations.controller.js.map