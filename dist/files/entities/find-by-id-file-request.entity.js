"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindByIdFileRequestEntity = void 0;
const file_entity_1 = require("./file.entity");
const entity_utils_1 = require("../../utils/entity.utils");
const nestjs_zod_1 = require("nestjs-zod");
const zod_1 = require("zod");
const FindByIdFileRequestEntitySchema = zod_1.z.object({
    id: zod_1.z.string(),
    populate: zod_1.z.string().optional(),
    status: zod_1.z.nativeEnum(file_entity_1.FileStatus).optional(),
});
class FindByIdFileRequestEntity extends (0, nestjs_zod_1.createZodDto)(FindByIdFileRequestEntitySchema) {
    static build(input) {
        return (0, entity_utils_1.safeInstantiateEntity)(FindByIdFileRequestEntity, input);
    }
}
exports.FindByIdFileRequestEntity = FindByIdFileRequestEntity;
//# sourceMappingURL=find-by-id-file-request.entity.js.map