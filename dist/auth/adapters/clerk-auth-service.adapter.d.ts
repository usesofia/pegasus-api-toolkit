import { AuthServicePort } from '../ports/auth-service.port';
import { AuthUserEntity } from '../entities/auth-user.entity';
import { BaseConfigEntity } from '../../config/base-config.entity';
import { PubSubServicePort } from '../../pub-sub/pub-sub-service.port';
import { CacheServicePort } from '../../cache/ports/cache-service.port';
export declare class ClerkAuthServiceAdapter implements AuthServicePort {
    private readonly baseConfig;
    private readonly cacheService;
    private readonly pubSubService;
    constructor(baseConfig: BaseConfigEntity, cacheService: CacheServicePort, pubSubService: PubSubServicePort);
    verifyToken(token: string): Promise<AuthUserEntity>;
    getUser({ userId, organizationId, organizationRole, ignoreCache, }: {
        userId: string;
        organizationId: string;
        organizationRole: string;
        ignoreCache?: boolean;
    }): Promise<AuthUserEntity>;
    private getClerkUserAndOrganization;
    private getClerkOrganization;
    private getCachedClerkUserAndOrganization;
    private getCachedClerkOrganization;
}
