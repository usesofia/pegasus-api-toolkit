"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserEntity = exports.AuthUserEntitySchema = void 0;
const nestjs_zod_1 = require("nestjs-zod");
const zod_1 = require("zod");
const org_role_enum_1 = require("../constants/org-role.enum");
const org_type_enum_1 = require("../constants/org-type.enum");
const entity_utils_1 = require("../../utils/entity.utils");
exports.AuthUserEntitySchema = zod_1.z.object({
    id: zod_1.z.string(),
    primaryEmail: zod_1.z.string().email(),
    primaryPhoneNumber: zod_1.z.string(),
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string(),
    org: zod_1.z.string(),
    orgRole: zod_1.z.nativeEnum(org_role_enum_1.OrgRole),
    orgType: zod_1.z.nativeEnum(org_type_enum_1.OrgType),
});
class AuthUserEntity extends (0, nestjs_zod_1.createZodDto)(exports.AuthUserEntitySchema) {
    static build(input) {
        return (0, entity_utils_1.safeInstantiateEntity)(AuthUserEntity, input);
    }
}
exports.AuthUserEntity = AuthUserEntity;
//# sourceMappingURL=auth-user.entity.js.map