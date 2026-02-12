import { z } from 'zod';
import { OrganizationRole } from '../../auth/constants/organization-role.enum';
import { OrganizationType } from '../../auth/constants/organization-type.enum';
export declare const OrganizationSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    type: z.ZodEnum<typeof OrganizationType>;
    role: z.ZodEnum<typeof OrganizationRole>;
    parent: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        sharedContacts: z.ZodBoolean;
        sharedSubcategories: z.ZodBoolean;
        sharedTags: z.ZodBoolean;
    }, z.core.$strip>>>;
    children: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
    }, z.core.$strip>>>>;
}, z.core.$strip>;
declare const OrganizationEntity_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    type: z.ZodEnum<typeof OrganizationType>;
    role: z.ZodEnum<typeof OrganizationRole>;
    parent: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        sharedContacts: z.ZodBoolean;
        sharedSubcategories: z.ZodBoolean;
        sharedTags: z.ZodBoolean;
    }, z.core.$strip>>>;
    children: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
    }, z.core.$strip>>>>;
}, z.core.$strip>, false>;
export declare class OrganizationEntity extends OrganizationEntity_base {
    static build(input: z.input<typeof OrganizationSchema>): OrganizationEntity;
}
export declare const AuthUserEntitySchema: z.ZodObject<{
    id: z.ZodString;
    primaryEmail: z.ZodEmail;
    primaryPhoneNumber: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    organization: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        type: z.ZodEnum<typeof OrganizationType>;
        role: z.ZodEnum<typeof OrganizationRole>;
        parent: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            sharedContacts: z.ZodBoolean;
            sharedSubcategories: z.ZodBoolean;
            sharedTags: z.ZodBoolean;
        }, z.core.$strip>>>;
        children: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.core.$strip>>>>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
declare const AuthUserEntity_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    id: z.ZodString;
    primaryEmail: z.ZodEmail;
    primaryPhoneNumber: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    organization: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        type: z.ZodEnum<typeof OrganizationType>;
        role: z.ZodEnum<typeof OrganizationRole>;
        parent: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            sharedContacts: z.ZodBoolean;
            sharedSubcategories: z.ZodBoolean;
            sharedTags: z.ZodBoolean;
        }, z.core.$strip>>>;
        children: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.core.$strip>>>>;
    }, z.core.$strip>>>;
}, z.core.$strip>, false>;
export declare class AuthUserEntity extends AuthUserEntity_base {
    static build(input: z.input<typeof AuthUserEntitySchema>): AuthUserEntity;
    getOrganizationOrThrow(): OrganizationEntity;
    toSystem(): AuthUserEntity;
    static buildSystemUserForOrganization(organization: OrganizationEntity): AuthUserEntity;
}
export {};
