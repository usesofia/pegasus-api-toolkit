"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFileUploadRequestBodyDto = void 0;
const create_file_upload_request_entity_1 = require("../entities/create-file-upload-request.entity");
const channel_utils_1 = require("../../utils/channel.utils");
const nestjs_zod_1 = require("nestjs-zod");
const CreateFileUploadRequestBodyDtoSchema = create_file_upload_request_entity_1.CreateFileUploadRequestDataEntitySchema.extend({ channel: channel_utils_1.channel }).omit({
    deletedAt: true,
});
class CreateFileUploadRequestBodyDto extends (0, nestjs_zod_1.createZodDto)(CreateFileUploadRequestBodyDtoSchema) {
}
exports.CreateFileUploadRequestBodyDto = CreateFileUploadRequestBodyDto;
//# sourceMappingURL=create-file-upload-request-body.dto.js.map