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
var ClerkSyncOrganizationsServiceAdapter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClerkSyncOrganizationsServiceAdapter = void 0;
const base_1 = require("../../base");
const clerk_constants_1 = require("../../clerk/clerk.constants");
const base_config_entity_1 = require("../../config/base-config.entity");
const logger_module_1 = require("../../logger/logger.module");
const organizations_repository_port_1 = require("../ports/organizations-repository.port");
const sync_organizations_constants_1 = require("../sync-organizations.constants");
const common_1 = require("@nestjs/common");
const clerk_backend_1 = require("@usesofia/clerk-backend");
const luxon_1 = require("luxon");
const nestjs_cls_1 = require("nestjs-cls");
let ClerkSyncOrganizationsServiceAdapter = ClerkSyncOrganizationsServiceAdapter_1 = class ClerkSyncOrganizationsServiceAdapter extends base_1.Base {
    constructor(baseConfig, logger, cls, organizationsRepository, clerkClient) {
        super(ClerkSyncOrganizationsServiceAdapter_1.name, baseConfig, logger, cls);
        this.baseConfig = baseConfig;
        this.logger = logger;
        this.cls = cls;
        this.organizationsRepository = organizationsRepository;
        this.clerkClient = clerkClient;
    }
    async sync() {
        const limit = 100;
        let offset = 0;
        let hasMore = true;
        const allOrganizations = [];
        while (hasMore) {
            const organizationsPage = await this.clerkClient.organizations.getOrganizationList({
                limit,
                offset,
            });
            for (const organization of organizationsPage.data) {
                allOrganizations.push(organization);
            }
            offset += limit;
            hasMore = organizationsPage.data.length === limit;
        }
        this.log({
            functionName: this.sync.name,
            suffix: 'syncingOrganizations',
            data: { totalOrganizations: allOrganizations.length },
        });
        for (const organization of allOrganizations) {
            try {
                await this.organizationsRepository.createOrUpdate({
                    organizationId: organization.id,
                    organizationName: organization.name,
                    organizationCreatedAt: luxon_1.DateTime.fromMillis(organization.createdAt).toJSDate(),
                    organizationSubscriptionStatus: (organization.publicMetadata?.subscriptionStatus ?? sync_organizations_constants_1.OrganizationSubscriptionStatus.TRIAL),
                    organizationSubtype: (organization.publicMetadata?.subtype ?? sync_organizations_constants_1.OrganizationSubtype.DEFAULT_BUSINESS),
                    bpoOfficeOrganizationId: (organization.publicMetadata?.bpoOfficeOrganizationId ?? null),
                    bpoOfficeName: (organization.publicMetadata?.bpoOfficeName ?? null),
                });
            }
            catch (error) {
                this.logWarn({
                    functionName: this.sync.name,
                    suffix: 'failedToSyncOrganization',
                    data: { organizationId: organization.id, organizationName: organization.name, error },
                });
            }
        }
    }
};
exports.ClerkSyncOrganizationsServiceAdapter = ClerkSyncOrganizationsServiceAdapter;
exports.ClerkSyncOrganizationsServiceAdapter = ClerkSyncOrganizationsServiceAdapter = ClerkSyncOrganizationsServiceAdapter_1 = __decorate([
    __param(0, (0, common_1.Inject)(base_config_entity_1.BASE_CONFIG)),
    __param(1, (0, common_1.Inject)(logger_module_1.LOGGER_SERVICE_PORT)),
    __param(3, (0, common_1.Inject)(organizations_repository_port_1.ORGANIZATIONS_REPOSITORY_PORT)),
    __param(4, (0, common_1.Inject)(clerk_constants_1.CLERK_CLIENT)),
    __metadata("design:paramtypes", [base_config_entity_1.BaseConfigEntity, Object, nestjs_cls_1.ClsService, Object, clerk_backend_1.ClerkClient])
], ClerkSyncOrganizationsServiceAdapter);
//# sourceMappingURL=clerk-sync-organizations-service.adapter.js.map