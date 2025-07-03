"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFileRequestEntity = void 0;
const file_entity_1 = require("./file.entity");
const channel_utils_1 = require("../../utils/channel.utils");
const entity_utils_1 = require("../../utils/entity.utils");
const nestjs_zod_1 = require("nestjs-zod");
const zod_1 = require("zod");
const CreateFileRequestDataEntitySchema = file_entity_1.FileEntitySchema.omit({
    id: true,
    ownerOrganization: true,
    createdAt: true,
    updatedAt: true,
});
const CreateFileRequestEntitySchema = zod_1.z.object({
    data: CreateFileRequestDataEntitySchema,
    populate: zod_1.z.string().optional(),
    channel: channel_utils_1.channel,
});
class CreateFileRequestEntity extends (0, nestjs_zod_1.createZodDto)(CreateFileRequestEntitySchema) {
    static build(input) {
        return (0, entity_utils_1.safeInstantiateEntity)(CreateFileRequestEntity, input);
    }
}
exports.CreateFileRequestEntity = CreateFileRequestEntity;
//# sourceMappingURL=create-file-request.entity.js.map