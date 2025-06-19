"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PubSubMessageBodyDto = void 0;
const nestjs_zod_1 = require("nestjs-zod");
const zod_1 = require("zod");
const entity_utils_1 = require("../utils/entity.utils");
const PubSubMessageBodyDtoSchema = zod_1.z.object({
    message: zod_1.z.object({
        data: zod_1.z.string(),
        messageId: zod_1.z.string(),
        publishTime: zod_1.z.string(),
    }),
    subscription: zod_1.z.string(),
});
class PubSubMessageBodyDto extends (0, nestjs_zod_1.createZodDto)(PubSubMessageBodyDtoSchema) {
    extractPayload(entityClass) {
        const decodedData = Buffer.from(this.message.data, 'base64').toString();
        const parsedData = JSON.parse(decodedData);
        return (0, entity_utils_1.safeInstantiateEntity)(entityClass, parsedData);
    }
}
exports.PubSubMessageBodyDto = PubSubMessageBodyDto;
//# sourceMappingURL=pub-sub-message.dto.js.map