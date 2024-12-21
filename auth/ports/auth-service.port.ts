import { AuthUserEntity } from '../entities/auth-user.entity';

export interface AuthServicePort {
  verifyToken(token: string): Promise<AuthUserEntity>;
  getUser({
    userId,
    orgId,
    orgRole,
    ignoreCache,
  }: {
    userId: string;
    orgId: string;
    orgRole: string;
    ignoreCache?: boolean;
  }): Promise<AuthUserEntity>;
}

export const AUTH_SERVICE_PORT = Symbol('AuthServicePort');
