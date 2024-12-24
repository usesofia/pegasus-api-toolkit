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
    organization: zod_1.z.string(),
    organizationRole: zod_1.z.nativeEnum(organization_role_enum_1.OrganizationRole),
    organitzaionType: zod_1.z.nativeEnum(organization_type_enum_1.OrganizationType),
});
class AuthUserEntity extends (0, nestjs_zod_1.createZodDto)(exports.AuthUserEntitySchema) {
    static build(input) {
        return (0, entity_utils_1.safeInstantiateEntity)(AuthUserEntity, input);
    }
}
exports.AuthUserEntity = AuthUserEntity;
//# sourceMappingURL=auth-user.entity.js.map