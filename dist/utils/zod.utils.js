"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isoDateStringWithoutTime = exports.coercedBigInt = exports.coercedBoolean = void 0;
exports.convertIsoDateStringWithoutTimeToJsDate = convertIsoDateStringWithoutTimeToJsDate;
const zod_1 = require("zod");
const luxon_1 = require("luxon");
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
exports.isoDateStringWithoutTime = zod_1.z.string().refine((val) => {
    const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!isoDateRegex.test(val)) {
        return false;
    }
    const parsedDate = luxon_1.DateTime.fromISO(val, { zone: 'utc' });
    return parsedDate.isValid;
}, {
    message: 'A string deve estar no formato yyyy-mm-dd e representar uma data válida',
});
function convertIsoDateStringWithoutTimeToJsDate(dateString) {
    const parsedDate = luxon_1.DateTime.fromISO(dateString, { zone: 'utc' });
    return parsedDate.toJSDate();
}
//# sourceMappingURL=zod.utils.js.map