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
exports.ClerkAuthServiceAdapter = void 0;
const common_1 = require("@nestjs/common");
const express_1 = require("@clerk/express");
const auth_user_entity_1 = require("../entities/auth-user.entity");
const base_config_entity_1 = require("../../config/base-config.entity");
const pub_sub_service_port_1 = require("../../pub-sub/pub-sub-service.port");
const cache_hit_on_get_auth_user_payload_1 = require("../payloads/cache-hit-on-get-auth-user.payload");
const cache_service_port_1 = require("../../cache/ports/cache-service.port");
const luxon_1 = require("luxon");
let ClerkAuthServiceAdapter = class ClerkAuthServiceAdapter {
    constructor(baseConfig, cacheService, pubSubService) {
        this.baseConfig = baseConfig;
        this.cacheService = cacheService;
        this.pubSubService = pubSubService;
    }
    async verifyToken(token) {
        const jwt = await (0, express_1.verifyToken)(token, {
            jwtKey: this.baseConfig.clerk.jwtKey,
        });
        const user = await this.getUser({
            userId: jwt.sub,
            organizationId: jwt.org_id,
            organizationRole: jwt.org_role,
        });
        return user;
    }
    async getUser({ userId, organizationId, organizationRole, ignoreCache, }) {
        const { clerkUser, clerkOrganization } = await this.getCachedClerkUserAndOrganization({
            userId,
            organizationId,
            organizationRole,
            ignoreCache,
        });
        let parentOrganization = null;
        if (clerkOrganization.publicMetadata.parent) {
            parentOrganization = await this.getCachedClerkOrganization({
                organizationId: clerkOrganization.publicMetadata.parent,
                ignoreCache,
            });
        }
        let childrenOrganizations = null;
        if (clerkOrganization.publicMetadata.children) {
            childrenOrganizations = await Promise.all(clerkOrganization.publicMetadata.children.map((child) => this.getCachedClerkOrganization({
                organizationId: child,
                ignoreCache,
            })));
        }
        return auth_user_entity_1.AuthUserEntity.build({
            id: clerkUser.id,
            primaryEmail: clerkUser.emailAddresses[0].emailAddress,
            primaryPhoneNumber: clerkUser.phoneNumbers[0].phoneNumber,
            firstName: clerkUser.firstName,
            lastName: clerkUser.lastName,
            organization: {
                id: clerkOrganization.id,
                name: clerkOrganization.name,
                role: organizationRole,
                type: clerkOrganization.publicMetadata
                    .type,
                parent: parentOrganization
                    ? {
                        id: parentOrganization.id,
                        name: parentOrganization.name,
                        sharedContacts: parentOrganization.publicMetadata.sharedContacts,
                    }
                    : null,
                children: childrenOrganizations
                    ? childrenOrganizations.map((child) => ({
                        id: child.id,
                        name: child.name,
                    }))
                    : null,
            },
        });
    }
    async getClerkUserAndOrganization({ userId, organizationId, }) {
        const [clerkUser, clerkOrganization] = await Promise.all([
            express_1.clerkClient.users.getUser(userId),
            express_1.clerkClient.organizations.getOrganization({
                organizationId,
            }),
        ]);
        return {
            clerkUser,
            clerkOrganization,
        };
    }
    async getClerkOrganization({ organizationId, }) {
        return await express_1.clerkClient.organizations.getOrganization({
            organizationId,
        });
    }
    async getCachedClerkUserAndOrganization({ userId, organizationId, organizationRole, ignoreCache = false, }) {
        const cacheKey = `${this.constructor.name}.getCachedClerkUserAndOrganization(${JSON.stringify({
            userId,
            organizationId,
        })})`;
        const cached = await this.cacheService.get(cacheKey);
        if (cached && !ignoreCache) {
            this.pubSubService.unsafePublish(this.baseConfig.pubSub.topics.cacheHitOnGetAuthUser, cache_hit_on_get_auth_user_payload_1.CacheHitOnGetAuthUserPayload.build({
                userId,
                organizationId,
                organizationRole,
            }));
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
};
exports.ClerkAuthServiceAdapter = ClerkAuthServiceAdapter;
exports.ClerkAuthServiceAdapter = ClerkAuthServiceAdapter = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(base_config_entity_1.BASE_CONFIG)),
    __param(1, (0, common_1.Inject)(cache_service_port_1.CACHE_SERVICE_PORT)),
    __param(2, (0, common_1.Inject)(pub_sub_service_port_1.PUB_SUB_SERVICE_PORT)),
    __metadata("design:paramtypes", [base_config_entity_1.BaseConfigEntity, Object, Object])
], ClerkAuthServiceAdapter);
//# sourceMappingURL=clerk-auth-service.adapter.js.map