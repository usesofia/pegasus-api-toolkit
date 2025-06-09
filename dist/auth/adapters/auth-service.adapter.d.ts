import { LoggerService } from '@nestjs/common';
import { AuthServicePort } from '../../auth/ports/auth-service.port';
import { AuthUserEntity, OrganizationEntity } from '../../auth/entities/auth-user.entity';
import { BaseConfigEntity } from '../../config/base-config.entity';
import { OrganizationRole } from '../../auth/constants/organization-role.enum';
import { CacheServicePort } from '../../cache/ports/cache-service.port';
import { Base } from '../../base';
import { ClsService } from 'nestjs-cls';
import { ClerkClient } from '@usesofia/clerk-backend';
import { ClerkVerifyToken } from '../../clerk/clerk.constants';
import { GoogleAuth } from 'google-auth-library';
export declare class AuthServiceAdapter extends Base implements AuthServicePort {
    protected readonly baseConfig: BaseConfigEntity;
    protected readonly logger: LoggerService;
    protected readonly cls: ClsService;
    private readonly cacheService;
    private readonly clerkClient;
    private readonly clerkVerifyToken;
    private readonly googleAuth;
    constructor(baseConfig: BaseConfigEntity, logger: LoggerService, cls: ClsService, cacheService: CacheServicePort, clerkClient: ClerkClient, clerkVerifyToken: ClerkVerifyToken, googleAuth: GoogleAuth);
    verifyToken(token: string): Promise<AuthUserEntity>;
    getOrganizationEntity({ organizationId, organizationRole, ignoreCache, }: {
        organizationId: string;
        organizationRole: OrganizationRole;
        ignoreCache?: boolean;
    }): Promise<OrganizationEntity>;
    getUser({ userId, organizationId, organizationRole, ignoreCache, }: {
        userId: string;
        organizationId?: string;
        organizationRole?: string;
        ignoreCache?: boolean;
    }): Promise<AuthUserEntity>;
    private getClerkUserAndOrganization;
    private getClerkOrganization;
    private getCachedClerkUserAndOrganization;
    private getCachedClerkOrganization;
    generateGcpServiceAccountToken(): Promise<string>;
    getSystemUserForOrganization(organizationId: string): Promise<AuthUserEntity>;
}
