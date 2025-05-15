"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartialUpdateFileRequestEntity = void 0;
const file_entity_1 = require("./file.entity");
const channel_utils_1 = require("../../utils/channel.utils");
const entity_utils_1 = require("../../utils/entity.utils");
const nestjs_zod_1 = require("nestjs-zod");
const zod_1 = require("zod");
const PartialUpdateFileRequestDataSchema = file_entity_1.FileEntitySchema.partial().omit({
    id: true,
    ownerOrganization: true,
    createdAt: true,
    updatedAt: true,
});
const PartialUpdateFileRequestEntitySchema = zod_1.z.object({
    id: zod_1.z.string(),
    data: PartialUpdateFileRequestDataSchema,
    channel: channel_utils_1.channel,
});
class PartialUpdateFileRequestEntity extends (0, nestjs_zod_1.createZodDto)(PartialUpdateFileRequestEntitySchema) {
    static build(input) {
        return (0, entity_utils_1.safeInstantiateEntity)(PartialUpdateFileRequestEntity, input);
    }
}
exports.PartialUpdateFileRequestEntity = PartialUpdateFileRequestEntity;
//# sourceMappingURL=partial-update-file-request.entity.js.map