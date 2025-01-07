"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserEntity = exports.AuthUserEntitySchema = void 0;
const nestjs_zod_1 = require("nestjs-zod");
const zod_1 = require("zod");
const organization_role_enum_1 = require("../constants/organization-role.enum");
const organization_type_enum_1 = require("../constants/organization-type.enum");
const entity_utils_1 = require("../../utils/entity.utils");
exports.AuthUserEntitySchema = zod_1.z.object({
    id: zod_1.z.string(),
    primaryEmail: zod_1.z.string().email(),
    primaryPhoneNumber: zod_1.z.string(),
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string(),
    organization: zod_1.z.object({
        id: zod_1.z.string(),
        name: zod_1.z.string(),
        role: zod_1.z.nativeEnum(organization_role_enum_1.OrganizationRole),
        type: zod_1.z.nativeEnum(organization_type_enum_1.OrganizationType),
        parent: zod_1.z.object({
            id: zod_1.z.string(),
            name: zod_1.z.string(),
            sharedContacts: zod_1.z.boolean(),
        }).nullish(),
        children: zod_1.z.array(zod_1.z.object({
            id: zod_1.z.string(),
            name: zod_1.z.string(),
        })).nullish(),
    }),
});
class AuthUserEntity extends (0, nestjs_zod_1.createZodDto)(exports.AuthUserEntitySchema) {
    static build(input) {
        return (0, entity_utils_1.safeInstantiateEntity)(AuthUserEntity, input);
    }
    static buildFromGcpServiceAccount(config) {
        return this.build({
            id: config.gcp.credentials.client_email,
            primaryEmail: config.gcp.credentials.client_email,
            primaryPhoneNumber: '+5511999999999',
            firstName: 'GCP',
            lastName: 'Service Account',
            organization: {
                id: 'system',
                name: 'System',
                role: organization_role_enum_1.OrganizationRole.ADMIN,
                type: organization_type_enum_1.OrganizationType.LEAF,
            },
        });
    }
}
exports.AuthUserEntity = AuthUserEntity;
//# sourceMappingURL=auth-user.entity.js.map