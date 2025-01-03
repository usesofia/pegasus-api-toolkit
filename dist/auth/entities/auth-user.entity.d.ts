import { z } from 'zod';
import { OrganizationRole } from '../constants/organization-role.enum';
import { OrganizationType } from '../constants/organization-type.enum';
export declare const AuthUserEntitySchema: z.ZodObject<{
    id: z.ZodString;
    primaryEmail: z.ZodString;
    primaryPhoneNumber: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    organization: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        role: z.ZodNativeEnum<typeof OrganizationRole>;
        type: z.ZodNativeEnum<typeof OrganizationType>;
        parent: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            sharedContacts: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            name: string;
            id: string;
            sharedContacts: boolean;
        }, {
            name: string;
            id: string;
            sharedContacts: boolean;
        }>>>;
        children: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            id: string;
        }, {
            name: string;
            id: string;
        }>, "many">>>;
    }, "strip", z.ZodTypeAny, {
        type: OrganizationType;
        name: string;
        id: string;
        role: OrganizationRole;
        parent?: {
            name: string;
            id: string;
            sharedContacts: boolean;
        } | null | undefined;
        children?: {
            name: string;
            id: string;
        }[] | null | undefined;
    }, {
        type: OrganizationType;
        name: string;
        id: string;
        role: OrganizationRole;
        parent?: {
            name: string;
            id: string;
            sharedContacts: boolean;
        } | null | undefined;
        children?: {
            name: string;
            id: string;
        }[] | null | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    id: string;
    primaryEmail: string;
    primaryPhoneNumber: string;
    firstName: string;
    lastName: string;
    organization: {
        type: OrganizationType;
        name: string;
        id: string;
        role: OrganizationRole;
        parent?: {
            name: string;
            id: string;
            sharedContacts: boolean;
        } | null | undefined;
        children?: {
            name: string;
            id: string;
        }[] | null | undefined;
    };
}, {
    id: string;
    primaryEmail: string;
    primaryPhoneNumber: string;
    firstName: string;
    lastName: string;
    organization: {
        type: OrganizationType;
        name: string;
        id: string;
        role: OrganizationRole;
        parent?: {
            name: string;
            id: string;
            sharedContacts: boolean;
        } | null | undefined;
        children?: {
            name: string;
            id: string;
        }[] | null | undefined;
    };
}>;
declare const AuthUserEntity_base: import("nestjs-zod").ZodDto<{
    id: string;
    primaryEmail: string;
    primaryPhoneNumber: string;
    firstName: string;
    lastName: string;
    organization: {
        type: OrganizationType;
        name: string;
        id: string;
        role: OrganizationRole;
        parent?: {
            name: string;
            id: string;
            sharedContacts: boolean;
        } | null | undefined;
        children?: {
            name: string;
            id: string;
        }[] | null | undefined;
    };
}, z.ZodObjectDef<{
    id: z.ZodString;
    primaryEmail: z.ZodString;
    primaryPhoneNumber: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    organization: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        role: z.ZodNativeEnum<typeof OrganizationRole>;
        type: z.ZodNativeEnum<typeof OrganizationType>;
        parent: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            sharedContacts: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            name: string;
            id: string;
            sharedContacts: boolean;
        }, {
            name: string;
            id: string;
            sharedContacts: boolean;
        }>>>;
        children: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            id: string;
        }, {
            name: string;
            id: string;
        }>, "many">>>;
    }, "strip", z.ZodTypeAny, {
        type: OrganizationType;
        name: string;
        id: string;
        role: OrganizationRole;
        parent?: {
            name: string;
            id: string;
            sharedContacts: boolean;
        } | null | undefined;
        children?: {
            name: string;
            id: string;
        }[] | null | undefined;
    }, {
        type: OrganizationType;
        name: string;
        id: string;
        role: OrganizationRole;
        parent?: {
            name: string;
            id: string;
            sharedContacts: boolean;
        } | null | undefined;
        children?: {
            name: string;
            id: string;
        }[] | null | undefined;
    }>;
}, "strip", z.ZodTypeAny>, {
    id: string;
    primaryEmail: string;
    primaryPhoneNumber: string;
    firstName: string;
    lastName: string;
    organization: {
        type: OrganizationType;
        name: string;
        id: string;
        role: OrganizationRole;
        parent?: {
            name: string;
            id: string;
            sharedContacts: boolean;
        } | null | undefined;
        children?: {
            name: string;
            id: string;
        }[] | null | undefined;
    };
}>;
export declare class AuthUserEntity extends AuthUserEntity_base {
    static build(input: z.infer<typeof AuthUserEntitySchema>): AuthUserEntity;
}
export {};
