"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.channel = exports.CHANNEL_TYPES = void 0;
const zod_1 = require("zod");
exports.CHANNEL_TYPES = {
    WEB_APP: 'WEB_APP',
    WHATSAPP: 'WHATSAPP',
};
exports.channel = zod_1.z.nativeEnum(exports.CHANNEL_TYPES).describe('Canal de origem da operação');
//# sourceMappingURL=channel.utils.js.map