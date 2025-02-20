import { LoggerService } from '@nestjs/common';
import { AuthServicePort } from '../ports/auth-service.port';
import { AuthUserEntity } from '../entities/auth-user.entity';
import { BaseConfigEntity } from '../../config/base-config.entity';
import { PubSubServicePort } from '../../pub-sub/pub-sub-service.port';
import { CacheServicePort } from '../../cache/ports/cache-service.port';
import { Base } from '../../base';
import { ClsService } from 'nestjs-cls';
import { ClerkClient, ClerkLogger } from '@usesofia/clerk-backend';
type ClerkVerifyToken = (token: string) => Promise<{
    sub: string;
    org_id?: string;
    org_role?: string;
}>;
export declare const CLERK_CLIENT: unique symbol;
export declare const CLERK_VERIFY_TOKEN: unique symbol;
export declare class ClerkAuthServiceAdapter extends Base implements AuthServicePort, ClerkLogger {
    protected readonly baseConfig: BaseConfigEntity;
    protected readonly logger: LoggerService;
    protected readonly cls: ClsService;
    private readonly cacheService;
    private readonly pubSubService;
    private readonly clerkClient;
    private readonly clerkVerifyToken;
    constructor(baseConfig: BaseConfigEntity, logger: LoggerService, cls: ClsService, cacheService: CacheServicePort, pubSubService: PubSubServicePort, clerkClient: ClerkClient, clerkVerifyToken: ClerkVerifyToken);
    logClerkInput({ functionName, args }: {
        functionName: string;
        args: any[];
    }): void;
    logClerkOutput({ functionName, output }: {
        functionName: string;
        output: any;
    }): void;
    logClerkRetryError({ functionName, currentAttempt, error }: {
        functionName: string;
        currentAttempt: number;
        error: any;
    }): void;
    logClerkError({ functionName, error }: {
        functionName: string;
        error: any;
    }): void;
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
export {};
