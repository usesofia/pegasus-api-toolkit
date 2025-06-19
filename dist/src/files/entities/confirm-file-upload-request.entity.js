"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfirmFileUploadRequestEntity = exports.ConfirmFileUploadRequestDataEntitySchema = void 0;
const file_entity_1 = require("./file.entity");
const channel_utils_1 = require("../../utils/channel.utils");
const entity_utils_1 = require("../../utils/entity.utils");
const nestjs_zod_1 = require("nestjs-zod");
const zod_1 = require("zod");
exports.ConfirmFileUploadRequestDataEntitySchema = file_entity_1.FileEntitySchema.omit({
    ownerOrganization: true,
    createdAt: true,
    updatedAt: true,
    fileType: true,
    mimeType: true,
    originalFileName: true,
    size: true,
    objectName: true,
});
const ConfirmFileUploadRequestEntitySchema = zod_1.z.object({
    data: exports.ConfirmFileUploadRequestDataEntitySchema,
    channel: channel_utils_1.channel,
});
class ConfirmFileUploadRequestEntity extends (0, nestjs_zod_1.createZodDto)(ConfirmFileUploadRequestEntitySchema) {
    static build(input) {
        return (0, entity_utils_1.safeInstantiateEntity)(ConfirmFileUploadRequestEntity, input);
    }
}
exports.ConfirmFileUploadRequestEntity = ConfirmFileUploadRequestEntity;
//# sourceMappingURL=confirm-file-upload-request.entity.js.map