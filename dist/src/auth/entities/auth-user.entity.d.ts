import { z } from 'zod';
import { OrganizationRole } from '../../auth/constants/organization-role.enum';
import { OrganizationType } from '../../auth/constants/organization-type.enum';
export declare const OrganizationSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    type: z.ZodNativeEnum<typeof OrganizationType>;
    role: z.ZodNativeEnum<typeof OrganizationRole>;
    parent: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        sharedContacts: z.ZodBoolean;
        sharedSubcategories: z.ZodBoolean;
        sharedTags: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        name: string;
        id: string;
        sharedContacts: boolean;
        sharedSubcategories: boolean;
        sharedTags: boolean;
    }, {
        name: string;
        id: string;
        sharedContacts: boolean;
        sharedSubcategories: boolean;
        sharedTags: boolean;
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
        sharedSubcategories: boolean;
        sharedTags: boolean;
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
        sharedSubcategories: boolean;
        sharedTags: boolean;
    } | null | undefined;
    children?: {
        name: string;
        id: string;
    }[] | null | undefined;
}>;
declare const OrganizationEntity_base: import("nestjs-zod").ZodDto<{
    type: OrganizationType;
    name: string;
    id: string;
    role: OrganizationRole;
    parent?: {
        name: string;
        id: string;
        sharedContacts: boolean;
        sharedSubcategories: boolean;
        sharedTags: boolean;
    } | null | undefined;
    children?: {
        name: string;
        id: string;
    }[] | null | undefined;
}, z.ZodObjectDef<{
    id: z.ZodString;
    name: z.ZodString;
    type: z.ZodNativeEnum<typeof OrganizationType>;
    role: z.ZodNativeEnum<typeof OrganizationRole>;
    parent: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        sharedContacts: z.ZodBoolean;
        sharedSubcategories: z.ZodBoolean;
        sharedTags: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        name: string;
        id: string;
        sharedContacts: boolean;
        sharedSubcategories: boolean;
        sharedTags: boolean;
    }, {
        name: string;
        id: string;
        sharedContacts: boolean;
        sharedSubcategories: boolean;
        sharedTags: boolean;
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
}, "strip", z.ZodTypeAny>, {
    type: OrganizationType;
    name: string;
    id: string;
    role: OrganizationRole;
    parent?: {
        name: string;
        id: string;
        sharedContacts: boolean;
        sharedSubcategories: boolean;
        sharedTags: boolean;
    } | null | undefined;
    children?: {
        name: string;
        id: string;
    }[] | null | undefined;
}>;
export declare class OrganizationEntity extends OrganizationEntity_base {
    static build(input: z.input<typeof OrganizationSchema>): OrganizationEntity;
}
export declare const AuthUserEntitySchema: z.ZodObject<{
    id: z.ZodString;
    primaryEmail: z.ZodString;
    primaryPhoneNumber: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    organization: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        type: z.ZodNativeEnum<typeof OrganizationType>;
        role: z.ZodNativeEnum<typeof OrganizationRole>;
        parent: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            sharedContacts: z.ZodBoolean;
            sharedSubcategories: z.ZodBoolean;
            sharedTags: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            name: string;
            id: string;
            sharedContacts: boolean;
            sharedSubcategories: boolean;
            sharedTags: boolean;
        }, {
            name: string;
            id: string;
            sharedContacts: boolean;
            sharedSubcategories: boolean;
            sharedTags: boolean;
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
            sharedSubcategories: boolean;
            sharedTags: boolean;
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
            sharedSubcategories: boolean;
            sharedTags: boolean;
        } | null | undefined;
        children?: {
            name: string;
            id: string;
        }[] | null | undefined;
    }>>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    primaryEmail: string;
    primaryPhoneNumber: string;
    firstName: string;
    lastName: string;
    organization?: {
        type: OrganizationType;
        name: string;
        id: string;
        role: OrganizationRole;
        parent?: {
            name: string;
            id: string;
            sharedContacts: boolean;
            sharedSubcategories: boolean;
            sharedTags: boolean;
        } | null | undefined;
        children?: {
            name: string;
            id: string;
        }[] | null | undefined;
    } | null | undefined;
}, {
    id: string;
    primaryEmail: string;
    primaryPhoneNumber: string;
    firstName: string;
    lastName: string;
    organization?: {
        type: OrganizationType;
        name: string;
        id: string;
        role: OrganizationRole;
        parent?: {
            name: string;
            id: string;
            sharedContacts: boolean;
            sharedSubcategories: boolean;
            sharedTags: boolean;
        } | null | undefined;
        children?: {
            name: string;
            id: string;
        }[] | null | undefined;
    } | null | undefined;
}>;
declare const AuthUserEntity_base: import("nestjs-zod").ZodDto<{
    id: string;
    primaryEmail: string;
    primaryPhoneNumber: string;
    firstName: string;
    lastName: string;
    organization?: {
        type: OrganizationType;
        name: string;
        id: string;
        role: OrganizationRole;
        parent?: {
            name: string;
            id: string;
            sharedContacts: boolean;
            sharedSubcategories: boolean;
            sharedTags: boolean;
        } | null | undefined;
        children?: {
            name: string;
            id: string;
        }[] | null | undefined;
    } | null | undefined;
}, z.ZodObjectDef<{
    id: z.ZodString;
    primaryEmail: z.ZodString;
    primaryPhoneNumber: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    organization: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        type: z.ZodNativeEnum<typeof OrganizationType>;
        role: z.ZodNativeEnum<typeof OrganizationRole>;
        parent: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            sharedContacts: z.ZodBoolean;
            sharedSubcategories: z.ZodBoolean;
            sharedTags: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            name: string;
            id: string;
            sharedContacts: boolean;
            sharedSubcategories: boolean;
            sharedTags: boolean;
        }, {
            name: string;
            id: string;
            sharedContacts: boolean;
            sharedSubcategories: boolean;
            sharedTags: boolean;
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
            sharedSubcategories: boolean;
            sharedTags: boolean;
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
            sharedSubcategories: boolean;
            sharedTags: boolean;
        } | null | undefined;
        children?: {
            name: string;
            id: string;
        }[] | null | undefined;
    }>>>;
}, "strip", z.ZodTypeAny>, {
    id: string;
    primaryEmail: string;
    primaryPhoneNumber: string;
    firstName: string;
    lastName: string;
    organization?: {
        type: OrganizationType;
        name: string;
        id: string;
        role: OrganizationRole;
        parent?: {
            name: string;
            id: string;
            sharedContacts: boolean;
            sharedSubcategories: boolean;
            sharedTags: boolean;
        } | null | undefined;
        children?: {
            name: string;
            id: string;
        }[] | null | undefined;
    } | null | undefined;
}>;
export declare class AuthUserEntity extends AuthUserEntity_base {
    static build(input: z.input<typeof AuthUserEntitySchema>): AuthUserEntity;
    getOrganizationOrThrow(): OrganizationEntity;
    toSystem(): AuthUserEntity;
    static buildSystemUserForOrganization(organization: OrganizationEntity): AuthUserEntity;
}
export {};
