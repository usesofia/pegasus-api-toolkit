"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveFileRequestEntity = void 0;
const channel_utils_1 = require("../../utils/channel.utils");
const entity_utils_1 = require("../../utils/entity.utils");
const nestjs_zod_1 = require("nestjs-zod");
const zod_1 = require("zod");
const RemoveFileRequestEntitySchema = zod_1.z.object({
    id: zod_1.z.string(),
    channel: channel_utils_1.channel,
});
class RemoveFileRequestEntity extends (0, nestjs_zod_1.createZodDto)(RemoveFileRequestEntitySchema) {
    static build(input) {
        return (0, entity_utils_1.safeInstantiateEntity)(RemoveFileRequestEntity, input);
    }
}
exports.RemoveFileRequestEntity = RemoveFileRequestEntity;
//# sourceMappingURL=remove-file-request.entity.js.map