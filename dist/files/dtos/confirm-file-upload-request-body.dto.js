"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfirmFileUploadRequestBodyDto = void 0;
const confirm_file_upload_request_entity_1 = require("../entities/confirm-file-upload-request.entity");
const file_entity_1 = require("../entities/file.entity");
const channel_utils_1 = require("../../utils/channel.utils");
const nestjs_zod_1 = require("nestjs-zod");
const zod_1 = require("zod");
const ConfirmFileUploadRequestBodyDtoSchema = confirm_file_upload_request_entity_1.ConfirmFileUploadRequestDataEntitySchema.extend({
    status: zod_1.z.enum([file_entity_1.FileStatus.FAILED, file_entity_1.FileStatus.COMPLETED]),
    channel: channel_utils_1.channel,
});
class ConfirmFileUploadRequestBodyDto extends (0, nestjs_zod_1.createZodDto)(ConfirmFileUploadRequestBodyDtoSchema) {
}
exports.ConfirmFileUploadRequestBodyDto = ConfirmFileUploadRequestBodyDto;
//# sourceMappingURL=confirm-file-upload-request-body.dto.js.map