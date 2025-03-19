"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserEntity = exports.AuthUserEntitySchema = exports.OrganizationEntity = exports.OrganizationSchema = void 0;
const nestjs_zod_1 = require("nestjs-zod");
const zod_1 = require("zod");
const organization_role_enum_1 = require("../constants/organization-role.enum");
const organization_type_enum_1 = require("../constants/organization-type.enum");
const entity_utils_1 = require("../../utils/entity.utils");
exports.OrganizationSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    type: zod_1.z.nativeEnum(organization_type_enum_1.OrganizationType),
    role: zod_1.z.nativeEnum(organization_role_enum_1.OrganizationRole),
    parent: zod_1.z
        .object({
        id: zod_1.z.string(),
        name: zod_1.z.string(),
        sharedContacts: zod_1.z.boolean(),
        sharedSubcategories: zod_1.z.boolean(),
        sharedTags: zod_1.z.boolean(),
    })
        .nullish(),
    children: zod_1.z
        .array(zod_1.z.object({
        id: zod_1.z.string(),
        name: zod_1.z.string(),
    }))
        .nullish(),
});
class OrganizationEntity extends (0, nestjs_zod_1.createZodDto)(exports.OrganizationSchema) {
    static build(input) {
        return (0, entity_utils_1.safeInstantiateEntity)(OrganizationEntity, input);
    }
}
exports.OrganizationEntity = OrganizationEntity;
exports.AuthUserEntitySchema = zod_1.z.object({
    id: zod_1.z.string(),
    primaryEmail: zod_1.z.string().email(),
    primaryPhoneNumber: zod_1.z.string(),
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string(),
    organization: exports.OrganizationSchema.nullish(),
});
class AuthUserEntity extends (0, nestjs_zod_1.createZodDto)(exports.AuthUserEntitySchema) {
    static build(input) {
        return (0, entity_utils_1.safeInstantiateEntity)(AuthUserEntity, input);
    }
    getOrganizationOrThrow() {
        if (!this.organization) {
            throw new Error('Organization not defined for the auth user.');
        }
        return OrganizationEntity.build(this.organization);
    }
    toSystem() {
        return AuthUserEntity.buildSystemUserForOrganization(this.getOrganizationOrThrow());
    }
    static buildSystemUserForOrganization(organization) {
        return this.build({
            id: 'system',
            primaryEmail: 'system@usesofia.com',
            primaryPhoneNumber: '+5511999999999',
            firstName: 'System',
            lastName: 'Requester',
            organization,
        });
    }
}
exports.AuthUserEntity = AuthUserEntity;
//# sourceMappingURL=auth-user.entity.js.map