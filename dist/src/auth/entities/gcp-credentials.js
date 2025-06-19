"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GcpCredentialsEntity = void 0;
const nestjs_zod_1 = require("nestjs-zod");
const zod_1 = require("zod");
const entity_utils_1 = require("../../utils/entity.utils");
const GcpCredentialsEntitySchema = zod_1.z.object({
    accessToken: zod_1.z.string(),
});
class GcpCredentialsEntity extends (0, nestjs_zod_1.createZodDto)(GcpCredentialsEntitySchema) {
    static build(input) {
        return (0, entity_utils_1.safeInstantiateEntity)(GcpCredentialsEntity, input);
    }
}
exports.GcpCredentialsEntity = GcpCredentialsEntity;
//# sourceMappingURL=gcp-credentials.js.map