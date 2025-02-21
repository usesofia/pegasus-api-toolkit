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
exports.ORGANIZATION_ROLES_GUARD = exports.OrganizationRolesGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const organization_roles_decorator_1 = require("../decorators/organization-roles.decorator");
const auth_guard_1 = require("./auth.guard");
const base_config_entity_1 = require("../../config/base-config.entity");
const nestjs_cls_1 = require("nestjs-cls");
const logger_module_1 = require("../../logger/logger.module");
const auth_service_port_1 = require("../ports/auth-service.port");
let OrganizationRolesGuard = class OrganizationRolesGuard extends auth_guard_1.AuthGuard {
    constructor(baseConfig, logger, cls, reflector, authService) {
        super(baseConfig, logger, cls, reflector, authService);
        this.baseConfig = baseConfig;
        this.logger = logger;
        this.cls = cls;
        this.reflector = reflector;
        this.authService = authService;
    }
    async canActivate(context) {
        const allowedRoles = this.reflector.get(organization_roles_decorator_1.ORGANIZATION_ROLES_KEY, context.getHandler());
        if (!allowedRoles) {
            return true;
        }
        let { user } = context.switchToHttp().getRequest();
        if (!user) {
            await super.canActivate(context);
            user = context.switchToHttp().getRequest().user;
        }
        const userOrgRole = user.organization.role;
        if (!userOrgRole) {
            return false;
        }
        return allowedRoles.includes(userOrgRole);
    }
};
exports.OrganizationRolesGuard = OrganizationRolesGuard;
exports.OrganizationRolesGuard = OrganizationRolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(base_config_entity_1.BASE_CONFIG)),
    __param(1, (0, common_1.Inject)(logger_module_1.LOGGER_SERVICE_PORT)),
    __param(4, (0, common_1.Inject)(auth_service_port_1.AUTH_SERVICE_PORT)),
    __metadata("design:paramtypes", [base_config_entity_1.BaseConfigEntity, Object, nestjs_cls_1.ClsService,
        core_1.Reflector, Object])
], OrganizationRolesGuard);
exports.ORGANIZATION_ROLES_GUARD = Symbol('OrganizationRolesGuard');
//# sourceMappingURL=organization-roles.guard.js.map