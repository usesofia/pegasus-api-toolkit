import { VerifyTokenOptions } from "@clerk/backend";
export type ClerkVerifyToken = (token: string, options: VerifyTokenOptions) => Promise<{
    sub: string;
    org_id?: string;
    org_role?: string;
}>;
export declare const CLERK_CLIENT: unique symbol;
export declare const CLERK_VERIFY_TOKEN: unique symbol;
