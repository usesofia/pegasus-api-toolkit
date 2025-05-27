"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsDateOnUtcStartOfDay = exports.isoDateStringWithoutTime = exports.coercedBigInt = exports.coercedBoolean = void 0;
exports.convertIsoDateStringWithoutTimeToJsDate = convertIsoDateStringWithoutTimeToJsDate;
const luxon_1 = require("luxon");
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
exports.isoDateStringWithoutTime = zod_1.z.preprocess((val) => {
    if (val instanceof Date && isValidUtcDateOnStartOfDay(val)) {
        return val.toISOString().split('T')[0];
    }
    return val;
}, zod_1.z.string()).refine((val) => {
    const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!isoDateRegex.test(val)) {
        return false;
    }
    const parsedDate = luxon_1.DateTime.fromISO(val, { zone: 'utc' });
    return parsedDate.isValid;
}, {
    message: 'A string deve estar no formato yyyy-mm-dd e representar uma data válida',
});
exports.jsDateOnUtcStartOfDay = zod_1.z.preprocess((val) => {
    if (typeof val === 'string') {
        if (exports.isoDateStringWithoutTime.safeParse(val).success) {
            return luxon_1.DateTime.fromFormat(val, 'yyyy-MM-dd', { zone: 'utc' }).toJSDate();
        }
        throw new Error('Esperava-se uma string no formato yyyy-mm-dd, recebido: ' + val);
    }
    return val;
}, zod_1.z.date(), {
    message: 'A data deve ser uma string no formato yyyy-mm-dd ou um JS Date'
})
    .refine((val) => isValidUtcDateOnStartOfDay(val), {
    message: 'A data deve estar no formato yyyy-mm-ddT00:00:00.000Z e representar uma data válida UTC',
});
function convertIsoDateStringWithoutTimeToJsDate(dateString) {
    const parsedDate = luxon_1.DateTime.fromISO(dateString, { zone: 'utc' });
    return parsedDate.toJSDate();
}
function isValidUtcDateOnStartOfDay(val) {
    const parsedDate = luxon_1.DateTime.fromJSDate(val, { zone: 'utc' });
    const isUtc = parsedDate.offset === 0;
    const isStartOfDay = parsedDate.startOf('day').toISO() === val.toISOString();
    const isValid = parsedDate.isValid;
    return isUtc && isStartOfDay && isValid;
}
//# sourceMappingURL=zod.utils.js.map