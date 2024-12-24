import { z } from 'zod';
import { OrganizationRole } from '../constants/organization-role.enum';
import { OrganizationType } from '../constants/organization-type.enum';
export declare const AuthUserEntitySchema: z.ZodObject<{
    id: z.ZodString;
    primaryEmail: z.ZodString;
    primaryPhoneNumber: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    organization: z.ZodString;
    organizationRole: z.ZodNativeEnum<typeof OrganizationRole>;
    organitzaionType: z.ZodNativeEnum<typeof OrganizationType>;
}, "strip", z.ZodTypeAny, {
    id: string;
    primaryEmail: string;
    primaryPhoneNumber: string;
    firstName: string;
    lastName: string;
    organization: string;
    organizationRole: OrganizationRole;
    organitzaionType: OrganizationType;
}, {
    id: string;
    primaryEmail: string;
    primaryPhoneNumber: string;
    firstName: string;
    lastName: string;
    organization: string;
    organizationRole: OrganizationRole;
    organitzaionType: OrganizationType;
}>;
declare const AuthUserEntity_base: import("nestjs-zod").ZodDto<{
    id: string;
    primaryEmail: string;
    primaryPhoneNumber: string;
    firstName: string;
    lastName: string;
    organization: string;
    organizationRole: OrganizationRole;
    organitzaionType: OrganizationType;
}, z.ZodObjectDef<{
    id: z.ZodString;
    primaryEmail: z.ZodString;
    primaryPhoneNumber: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    organization: z.ZodString;
    organizationRole: z.ZodNativeEnum<typeof OrganizationRole>;
    organitzaionType: z.ZodNativeEnum<typeof OrganizationType>;
}, "strip", z.ZodTypeAny>, {
    id: string;
    primaryEmail: string;
    primaryPhoneNumber: string;
    firstName: string;
    lastName: string;
    organization: string;
    organizationRole: OrganizationRole;
    organitzaionType: OrganizationType;
}>;
export declare class AuthUserEntity extends AuthUserEntity_base {
    static build(input: z.infer<typeof AuthUserEntitySchema>): AuthUserEntity;
}
export {};
