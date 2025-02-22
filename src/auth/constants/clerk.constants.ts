export type ClerkVerifyToken = (token: string) => Promise<{
  sub: string;
  org_id?: string;
  org_role?: string;
}>;

export const CLERK_CLIENT = Symbol('ClerkClient');
export const CLERK_VERIFY_TOKEN = Symbol('ClerkVerifyToken');
