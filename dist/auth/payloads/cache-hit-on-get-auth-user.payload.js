"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheHitOnGetAuthUserPayload = void 0;
const nestjs_zod_1 = require("nestjs-zod");
const zod_1 = require("zod");
const entity_utils_1 = require("../../utils/entity.utils");
const CacheHitOnGetAuthUserPayloadSchema = zod_1.z.object({
    userId: zod_1.z.string(),
    organizationId: zod_1.z.string().nullish(),
    organizationRole: zod_1.z.string().nullish(),
});
class CacheHitOnGetAuthUserPayload extends (0, nestjs_zod_1.createZodDto)(CacheHitOnGetAuthUserPayloadSchema) {
    static build(input) {
        return (0, entity_utils_1.safeInstantiateEntity)(CacheHitOnGetAuthUserPayload, input);
    }
}
exports.CacheHitOnGetAuthUserPayload = CacheHitOnGetAuthUserPayload;
//# sourceMappingURL=cache-hit-on-get-auth-user.payload.js.map