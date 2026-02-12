"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignedUrlEntity = void 0;
const entity_utils_1 = require("../../utils/entity.utils");
const nestjs_zod_1 = require("nestjs-zod");
const zod_1 = require("zod");
const SignedUrlEntitySchema = zod_1.z.object({
    url: zod_1.z.string(),
    signedUrl: zod_1.z.string(),
});
class SignedUrlEntity extends (0, nestjs_zod_1.createZodDto)(SignedUrlEntitySchema) {
    static build(input) {
        return (0, entity_utils_1.safeInstantiateEntity)(SignedUrlEntity, input);
    }
}
exports.SignedUrlEntity = SignedUrlEntity;
//# sourceMappingURL=signed-url.entity.js.map