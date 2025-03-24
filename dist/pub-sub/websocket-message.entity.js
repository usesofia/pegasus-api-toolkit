"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsocketMessageEntity = exports.sendWebsocketMessageTopicName = void 0;
const entity_utils_1 = require("../utils/entity.utils");
const nestjs_zod_1 = require("nestjs-zod");
const zod_1 = require("zod");
exports.sendWebsocketMessageTopicName = 'send-websocket-message';
const WebsocketMessageEntitySchema = zod_1.z.object({
    userId: zod_1.z.string(),
    organizationId: zod_1.z.string().nullish(),
    event: zod_1.z.string(),
    data: zod_1.z.unknown(),
});
class WebsocketMessageEntity extends (0, nestjs_zod_1.createZodDto)(WebsocketMessageEntitySchema) {
    static build(input) {
        return (0, entity_utils_1.safeInstantiateEntity)(WebsocketMessageEntity, input);
    }
}
exports.WebsocketMessageEntity = WebsocketMessageEntity;
//# sourceMappingURL=websocket-message.entity.js.map