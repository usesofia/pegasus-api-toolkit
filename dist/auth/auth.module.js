"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const clerk_auth_service_adapter_1 = require("./adapters/clerk-auth-service.adapter");
const auth_service_port_1 = require("./ports/auth-service.port");
const auth_guard_1 = require("./guards/auth.guard");
const core_1 = require("@nestjs/core");
const gcp_service_account_guard_1 = require("./guards/gcp-service-account.guard");
const base_config_entity_1 = require("../config/base-config.entity");
const organization_roles_guard_1 = require("./guards/organization-roles.guard");
const organization_types_guard_1 = require("./guards/organization-types.guard");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [],
        providers: [
            {
                provide: auth_guard_1.AUTH_GUARD,
                useClass: auth_guard_1.AuthGuard,
            },
            {
                provide: gcp_service_account_guard_1.GCP_SERVICE_ACCOUNT_GUARD,
                useClass: gcp_service_account_guard_1.GcpServiceAccountGuard,
            },
            {
                provide: organization_roles_guard_1.ORGANIZATION_ROLES_GUARD,
                useClass: organization_roles_guard_1.OrganizationRolesGuard,
            },
            {
                provide: organization_types_guard_1.ORGANIZATION_TYPES_GUARD,
                useClass: organization_types_guard_1.OrganizationTypesGuard,
            },
            clerk_auth_service_adapter_1.ClerkAuthServiceAdapter,
            {
                provide: auth_service_port_1.AUTH_SERVICE_PORT,
                useClass: clerk_auth_service_adapter_1.ClerkAuthServiceAdapter,
            },
            {
                provide: core_1.APP_GUARD,
                useFactory: (baseConfig, authGuard) => {
                    if (baseConfig.auth.applyAuthGuardToAllRoutes) {
                        return authGuard;
                    }
                    return null;
                },
                inject: [base_config_entity_1.BASE_CONFIG, auth_guard_1.AUTH_GUARD],
            },
            {
                provide: core_1.APP_GUARD,
                useFactory: (organizationRolesGuard) => {
                    return organizationRolesGuard;
                },
                inject: [organization_roles_guard_1.ORGANIZATION_ROLES_GUARD],
            },
            {
                provide: core_1.APP_GUARD,
                useFactory: (organizationTypesGuard) => {
                    return organizationTypesGuard;
                },
                inject: [organization_types_guard_1.ORGANIZATION_TYPES_GUARD],
            },
            {
                provide: core_1.APP_GUARD,
                useFactory: (baseConfig, gcpServiceAccountGuard) => {
                    if (baseConfig.auth.applyGcpServiceAccountGuardToAllRoutes) {
                        return gcpServiceAccountGuard;
                    }
                    return null;
                },
                inject: [base_config_entity_1.BASE_CONFIG, gcp_service_account_guard_1.GCP_SERVICE_ACCOUNT_GUARD],
            },
        ],
        controllers: [],
        exports: [auth_service_port_1.AUTH_SERVICE_PORT],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map