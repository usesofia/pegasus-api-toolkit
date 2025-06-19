"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveFileRequestBodyDto = void 0;
const channel_utils_1 = require("../../utils/channel.utils");
const nestjs_zod_1 = require("nestjs-zod");
const zod_1 = require("zod");
const RemoveFileRequestBodyDtoSchema = zod_1.z.object({
    channel: channel_utils_1.channel,
});
class RemoveFileRequestBodyDto extends (0, nestjs_zod_1.createZodDto)(RemoveFileRequestBodyDtoSchema) {
}
exports.RemoveFileRequestBodyDto = RemoveFileRequestBodyDto;
//# sourceMappingURL=remove-file-request-body.dto.js.map