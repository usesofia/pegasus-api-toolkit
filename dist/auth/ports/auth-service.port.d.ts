import { AuthUserEntity } from '../../auth/entities/auth-user.entity';
export interface AuthServicePort {
    verifyToken(token: string): Promise<AuthUserEntity>;
    getUser({ userId, organizationId, organizationRole, ignoreCache, }: {
        userId: string;
        organizationId: string;
        organizationRole: string;
        ignoreCache?: boolean;
    }): Promise<AuthUserEntity>;
    getSystemUserForOrganization(organizationId: string): Promise<AuthUserEntity>;
    generateGcpServiceAccountToken(): Promise<string>;
    getUserWithoutOrganization(userId: string): Promise<AuthUserEntity>;
}
export declare const AUTH_SERVICE_PORT: unique symbol;
