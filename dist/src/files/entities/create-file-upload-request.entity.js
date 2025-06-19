"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFileUploadRequestEntity = exports.CreateFileUploadRequestDataEntitySchema = void 0;
const file_entity_1 = require("./file.entity");
const channel_utils_1 = require("../../utils/channel.utils");
const entity_utils_1 = require("../../utils/entity.utils");
const nestjs_zod_1 = require("nestjs-zod");
const zod_1 = require("zod");
exports.CreateFileUploadRequestDataEntitySchema = file_entity_1.FileEntitySchema.omit({
    id: true,
    ownerOrganization: true,
    createdAt: true,
    updatedAt: true,
    status: true,
    objectName: true,
});
const CreateFileUploadRequestEntitySchema = zod_1.z.object({
    data: exports.CreateFileUploadRequestDataEntitySchema,
    channel: channel_utils_1.channel,
});
class CreateFileUploadRequestEntity extends (0, nestjs_zod_1.createZodDto)(CreateFileUploadRequestEntitySchema) {
    static build(input) {
        return (0, entity_utils_1.safeInstantiateEntity)(CreateFileUploadRequestEntity, input);
    }
}
exports.CreateFileUploadRequestEntity = CreateFileUploadRequestEntity;
//# sourceMappingURL=create-file-upload-request.entity.js.map