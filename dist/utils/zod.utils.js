"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coercedBigInt = exports.coercedBoolean = void 0;
const zod_1 = require("zod");
exports.coercedBoolean = zod_1.z.preprocess((val) => {
    if (typeof val === 'string') {
        if (['1', 'true'].includes(val.toLowerCase()))
            return true;
        if (['0', 'false'].includes(val.toLowerCase()))
            return false;
    }
    return val;
}, zod_1.z.coerce.boolean());
exports.coercedBigInt = zod_1.z.preprocess((val) => {
    if (typeof val === 'string') {
        return BigInt(val);
    }
    return val;
}, zod_1.z.coerce.bigint());
//# sourceMappingURL=zod.utils.js.map