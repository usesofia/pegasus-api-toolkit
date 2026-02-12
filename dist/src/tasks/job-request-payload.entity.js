"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobRequestPayloadEntity = void 0;
const entity_utils_1 = require("../utils/entity.utils");
const nestjs_zod_1 = require("nestjs-zod");
const zod_1 = require("zod");
const JobRequestPayloadEntitySchema = zod_1.z.object({
    jobRequestId: zod_1.z.string(),
});
class JobRequestPayloadEntity extends (0, nestjs_zod_1.createZodDto)(JobRequestPayloadEntitySchema) {
    static build(input) {
        return (0, entity_utils_1.safeInstantiateEntity)(JobRequestPayloadEntity, input);
    }
}
exports.JobRequestPayloadEntity = JobRequestPayloadEntity;
//# sourceMappingURL=job-request-payload.entity.js.map