import { z } from 'zod';
import { OrgRole } from '../constants/org-role.enum';
import { OrgType } from '../constants/org-type.enum';
export declare const AuthUserEntitySchema: z.ZodObject<{
    id: z.ZodString;
    primaryEmail: z.ZodString;
    primaryPhoneNumber: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    org: z.ZodString;
    orgRole: z.ZodNativeEnum<typeof OrgRole>;
    orgType: z.ZodNativeEnum<typeof OrgType>;
}, "strip", z.ZodTypeAny, {
    id: string;
    primaryEmail: string;
    primaryPhoneNumber: string;
    firstName: string;
    lastName: string;
    org: string;
    orgRole: OrgRole;
    orgType: OrgType;
}, {
    id: string;
    primaryEmail: string;
    primaryPhoneNumber: string;
    firstName: string;
    lastName: string;
    org: string;
    orgRole: OrgRole;
    orgType: OrgType;
}>;
declare const AuthUserEntity_base: import("nestjs-zod").ZodDto<{
    id: string;
    primaryEmail: string;
    primaryPhoneNumber: string;
    firstName: string;
    lastName: string;
    org: string;
    orgRole: OrgRole;
    orgType: OrgType;
}, z.ZodObjectDef<{
    id: z.ZodString;
    primaryEmail: z.ZodString;
    primaryPhoneNumber: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    org: z.ZodString;
    orgRole: z.ZodNativeEnum<typeof OrgRole>;
    orgType: z.ZodNativeEnum<typeof OrgType>;
}, "strip", z.ZodTypeAny>, {
    id: string;
    primaryEmail: string;
    primaryPhoneNumber: string;
    firstName: string;
    lastName: string;
    org: string;
    orgRole: OrgRole;
    orgType: OrgType;
}>;
export declare class AuthUserEntity extends AuthUserEntity_base {
    static build(input: z.infer<typeof AuthUserEntitySchema>): AuthUserEntity;
}
export {};
