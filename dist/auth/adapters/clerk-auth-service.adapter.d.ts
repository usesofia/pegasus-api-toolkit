import { LoggerService } from '@nestjs/common';
import { AuthServicePort } from '../../auth/ports/auth-service.port';
import { AuthUserEntity } from '../../auth/entities/auth-user.entity';
import { BaseConfigEntity } from '../../config/base-config.entity';
import { CacheServicePort } from '../../cache/ports/cache-service.port';
import { Base } from '../../base';
import { ClsService } from 'nestjs-cls';
import { ClerkClient } from '@usesofia/clerk-backend';
import { ClerkVerifyToken } from '../../clerk/clerk.constants';
export declare class ClerkAuthServiceAdapter extends Base implements AuthServicePort {
    protected readonly baseConfig: BaseConfigEntity;
    protected readonly logger: LoggerService;
    protected readonly cls: ClsService;
    private readonly cacheService;
    private readonly clerkClient;
    private readonly clerkVerifyToken;
    constructor(baseConfig: BaseConfigEntity, logger: LoggerService, cls: ClsService, cacheService: CacheServicePort, clerkClient: ClerkClient, clerkVerifyToken: ClerkVerifyToken);
    verifyToken(token: string): Promise<AuthUserEntity>;
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
}
