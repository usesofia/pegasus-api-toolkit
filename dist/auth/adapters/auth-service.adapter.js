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
var AuthServiceAdapter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServiceAdapter = void 0;
const common_1 = require("@nestjs/common");
const auth_user_entity_1 = require("../entities/auth-user.entity");
const base_config_entity_1 = require("../../config/base-config.entity");
const organization_role_enum_1 = require("../constants/organization-role.enum");
const cache_service_port_1 = require("../../cache/ports/cache-service.port");
const luxon_1 = require("luxon");
const base_1 = require("../../base");
const nestjs_cls_1 = require("nestjs-cls");
const logger_module_1 = require("../../logger/logger.module");
const clerk_backend_1 = require("@usesofia/clerk-backend");
const log_utils_1 = require("../../utils/log.utils");
const clerk_constants_1 = require("../../clerk/clerk.constants");
const google_auth_library_1 = require("google-auth-library");
let AuthServiceAdapter = AuthServiceAdapter_1 = class AuthServiceAdapter extends base_1.Base {
    constructor(baseConfig, logger, cls, cacheService, clerkClient, clerkVerifyToken, googleAuth) {
        super(AuthServiceAdapter_1.name, baseConfig, logger, cls);
        this.baseConfig = baseConfig;
        this.logger = logger;
        this.cls = cls;
        this.cacheService = cacheService;
        this.clerkClient = clerkClient;
        this.clerkVerifyToken = clerkVerifyToken;
        this.googleAuth = googleAuth;
    }
    async verifyToken(token) {
        const jwt = await this.clerkVerifyToken(token, {
            jwtKey: this.baseConfig.clerk.jwtKey,
        });
        const user = await this.getUser({
            userId: jwt.sub,
            organizationId: jwt.org_id,
            organizationRole: jwt.org_role,
        });
        return user;
    }
    async getOrganizationEntity({ organizationId, organizationRole, ignoreCache = false, }) {
        const clerkOrganization = await this.getCachedClerkOrganization({
            organizationId,
            ignoreCache,
        });
        let parentOrganization = null;
        if (clerkOrganization.publicMetadata?.parent) {
            parentOrganization = await this.getCachedClerkOrganization({
                organizationId: clerkOrganization.publicMetadata.parent,
                ignoreCache,
            });
        }
        let childrenOrganizations = null;
        if (clerkOrganization.publicMetadata?.children) {
            childrenOrganizations = await Promise.all(clerkOrganization.publicMetadata.children.map((child) => this.getCachedClerkOrganization({
                organizationId: child,
                ignoreCache,
            })));
        }
        return auth_user_entity_1.OrganizationEntity.build({
            id: clerkOrganization.id,
            name: clerkOrganization.name,
            role: organizationRole,
            type: clerkOrganization.publicMetadata?.type,
            parent: parentOrganization
                ? {
                    id: parentOrganization.id,
                    name: parentOrganization.name,
                    sharedContacts: parentOrganization.publicMetadata
                        ?.sharedContacts,
                    sharedSubcategories: parentOrganization.publicMetadata
                        ?.sharedSubcategories,
                    sharedTags: parentOrganization.publicMetadata
                        ?.sharedTags,
                }
                : undefined,
            children: childrenOrganizations
                ? childrenOrganizations.map((child) => ({
                    id: child.id,
                    name: child.name,
                }))
                : undefined,
        });
    }
    async getUser({ userId, organizationId, organizationRole, ignoreCache, }) {
        const { clerkUser, clerkOrganization } = await this.getCachedClerkUserAndOrganization({
            userId,
            organizationId,
            ignoreCache,
        });
        if (clerkOrganization) {
            const organizationEntity = await this.getOrganizationEntity({
                organizationId: clerkOrganization.id,
                organizationRole: organizationRole,
                ignoreCache,
            });
            return auth_user_entity_1.AuthUserEntity.build({
                id: clerkUser.id,
                primaryEmail: clerkUser.emailAddresses[0].emailAddress,
                primaryPhoneNumber: clerkUser.phoneNumbers[0].phoneNumber,
                firstName: clerkUser.firstName ?? '',
                lastName: clerkUser.lastName ?? '',
                organization: organizationEntity,
            });
        }
        else {
            return auth_user_entity_1.AuthUserEntity.build({
                id: clerkUser.id,
                primaryEmail: clerkUser.emailAddresses[0].emailAddress,
                primaryPhoneNumber: clerkUser.phoneNumbers[0].phoneNumber,
                firstName: clerkUser.firstName ?? '',
                lastName: clerkUser.lastName ?? '',
                organization: null,
            });
        }
    }
    async getClerkUserAndOrganization({ userId, organizationId, }) {
        const [clerkUser, clerkOrganization] = await Promise.all([
            this.clerkClient.users.getUser(userId),
            organizationId
                ? this.clerkClient.organizations.getOrganization({
                    organizationId,
                })
                : undefined,
        ]);
        return {
            clerkUser,
            clerkOrganization,
        };
    }
    async getClerkOrganization({ organizationId, }) {
        return await this.clerkClient.organizations.getOrganization({
            organizationId,
        });
    }
    async getCachedClerkUserAndOrganization({ userId, organizationId, ignoreCache = false, }) {
        const cacheKey = `${this.constructor.name}.getCachedClerkUserAndOrganization(${JSON.stringify({
            userId,
            organizationId,
        })})`;
        const cached = await this.cacheService.get(cacheKey);
        if (cached && !ignoreCache) {
            return JSON.parse(cached);
        }
        const { clerkUser, clerkOrganization } = await this.getClerkUserAndOrganization({
            userId,
            organizationId,
        });
        await this.cacheService.set(cacheKey, JSON.stringify({
            clerkUser,
            clerkOrganization,
        }), luxon_1.Duration.fromObject({
            hours: 1,
        }).as('seconds'));
        return {
            clerkUser,
            clerkOrganization,
        };
    }
    async getCachedClerkOrganization({ organizationId, ignoreCache = false, }) {
        const cacheKey = `${this.constructor.name}.getCachedClerkOrganization(${JSON.stringify({
            organizationId,
        })})`;
        const cached = await this.cacheService.get(cacheKey);
        if (cached && !ignoreCache) {
            return JSON.parse(cached);
        }
        const organization = await this.getClerkOrganization({
            organizationId,
        });
        await this.cacheService.set(cacheKey, JSON.stringify(organization), luxon_1.Duration.fromObject({
            hours: 1,
        }).as('seconds'));
        return organization;
    }
    async generateGcpServiceAccountToken() {
        const cacheKey = `${this.constructor.name}.generateGcpServiceAccountToken()`;
        const cached = await this.cacheService.get(cacheKey);
        if (cached) {
            return cached;
        }
        const client = await this.googleAuth.getIdTokenClient('*');
        const accessToken = await client.idTokenProvider.fetchIdToken('*');
        await this.cacheService.set(cacheKey, accessToken, luxon_1.Duration.fromObject({
            minutes: 10,
        }).as('seconds'));
        return accessToken;
    }
    async getSystemUserForOrganization(organizationId) {
        const organizationEntity = await this.getOrganizationEntity({
            organizationId,
            organizationRole: organization_role_enum_1.OrganizationRole.ADMIN,
            ignoreCache: false,
        });
        return auth_user_entity_1.AuthUserEntity.buildSystemUserForOrganization(organizationEntity);
    }
};
exports.AuthServiceAdapter = AuthServiceAdapter;
__decorate([
    (0, log_utils_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthServiceAdapter.prototype, "verifyToken", null);
__decorate([
    (0, log_utils_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthServiceAdapter.prototype, "getOrganizationEntity", null);
__decorate([
    (0, log_utils_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthServiceAdapter.prototype, "getUser", null);
__decorate([
    (0, log_utils_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthServiceAdapter.prototype, "getClerkUserAndOrganization", null);
__decorate([
    (0, log_utils_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthServiceAdapter.prototype, "getClerkOrganization", null);
__decorate([
    (0, log_utils_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthServiceAdapter.prototype, "getCachedClerkUserAndOrganization", null);
__decorate([
    (0, log_utils_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthServiceAdapter.prototype, "getCachedClerkOrganization", null);
__decorate([
    (0, log_utils_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthServiceAdapter.prototype, "getSystemUserForOrganization", null);
exports.AuthServiceAdapter = AuthServiceAdapter = AuthServiceAdapter_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(base_config_entity_1.BASE_CONFIG)),
    __param(1, (0, common_1.Inject)(logger_module_1.LOGGER_SERVICE_PORT)),
    __param(3, (0, common_1.Inject)(cache_service_port_1.CACHE_SERVICE_PORT)),
    __param(4, (0, common_1.Inject)(clerk_constants_1.CLERK_CLIENT)),
    __param(5, (0, common_1.Inject)(clerk_constants_1.CLERK_VERIFY_TOKEN)),
    __metadata("design:paramtypes", [base_config_entity_1.BaseConfigEntity, Object, nestjs_cls_1.ClsService, Object, clerk_backend_1.ClerkClient, Function, google_auth_library_1.GoogleAuth])
], AuthServiceAdapter);
//# sourceMappingURL=auth-service.adapter.js.map