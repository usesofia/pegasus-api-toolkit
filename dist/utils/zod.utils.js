"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.datetimeWithTimeZone = void 0;
const zod_1 = require("zod");
exports.datetimeWithTimeZone = zod_1.z.coerce
    .string()
    .datetime({ offset: true });
//# sourceMappingURL=zod.utils.js.map