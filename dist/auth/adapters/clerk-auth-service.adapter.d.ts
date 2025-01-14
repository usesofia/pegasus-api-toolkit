import { LoggerService } from '@nestjs/common';
import { AuthServicePort } from '../ports/auth-service.port';
import { AuthUserEntity } from '../entities/auth-user.entity';
import { BaseConfigEntity } from '../../config/base-config.entity';
import { PubSubServicePort } from '../../pub-sub/pub-sub-service.port';
import { CacheServicePort } from '../../cache/ports/cache-service.port';
import { Base } from '../../base';
import { ClsService } from 'nestjs-cls';
export declare class ClerkAuthServiceAdapter extends Base implements AuthServicePort {
    protected readonly baseConfig: BaseConfigEntity;
    protected readonly logger: LoggerService;
    protected readonly cls: ClsService;
    private readonly cacheService;
    private readonly pubSubService;
    constructor(baseConfig: BaseConfigEntity, logger: LoggerService, cls: ClsService, cacheService: CacheServicePort, pubSubService: PubSubServicePort);
    verifyToken(token: string): Promise<AuthUserEntity>;
    getUser({ userId, organizationId, organizationRole, ignoreCache, }: {
        userId: string;
        organizationId?: string;
        organizationRole?: string;
        ignoreCache?: boolean;
    }): Promise<AuthUserEntity>;
    private getClerkUserAndOrganization;
    private _getClerkUserAndOrganization;
    private getClerkOrganization;
    private _getClerkOrganization;
    private getCachedClerkUserAndOrganization;
    private getCachedClerkOrganization;
}
