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
    if (val instanceof Date && isValidJsDateOnUtcStartOfDay(val)) {
        return val.toISOString().split('T')[0];
    }
    if (typeof val === 'string') {
        if (isValidIso8601DatetimeString(val)) {
            return val.split('T')[0];
        }
        if (isValidIso8601DateString(val)) {
            return val;
        }
    }
    return val;
}, zod_1.z.string({
    error: `A data deve ser uma:\
  1. String no formato yyyy-mm-dd\
  2. String no formato yyyy-mm-ddT00:00:00.000Z\
  3. JS Date no início do dia UTC\
  `
})).refine((val) => isValidIso8601DatetimeString(val), {
    message: 'A string deve estar no formato yyyy-mm-dd e representar uma data válida'
});
exports.jsDateOnUtcStartOfDay = zod_1.z.preprocess((val) => {
    if (typeof val === 'string') {
        if (isValidIso8601DatetimeString(val)) {
            return luxon_1.DateTime.fromISO(val, { zone: 'utc' }).toJSDate();
        }
        if (isValidIso8601DateString(val)) {
            return luxon_1.DateTime.fromFormat(val, 'yyyy-MM-dd', { zone: 'utc' }).toJSDate();
        }
    }
    return val;
}, zod_1.z.coerce.date({
    message: 'A data deve ser uma string no formato yyyy-mm-dd ou um JS Date'
}))
    .refine((val) => isValidJsDateOnUtcStartOfDay(val), {
    message: 'A data deve estar no formato yyyy-mm-ddT00:00:00.000Z e representar uma data válida UTC',
});
function convertIsoDateStringWithoutTimeToJsDate(dateString) {
    const parsedDate = luxon_1.DateTime.fromISO(dateString, { zone: 'utc' });
    return parsedDate.toJSDate();
}
function isValidJsDateOnUtcStartOfDay(val) {
    const parsedDate = luxon_1.DateTime.fromJSDate(val, { zone: 'utc' });
    return isDateTimeOnUTCStartOfDay(parsedDate);
}
function isValidIso8601DatetimeString(val) {
    const parsedDate = luxon_1.DateTime.fromISO(val, { zone: 'utc' });
    return isDateTimeOnUTCStartOfDay(parsedDate);
}
function isValidIso8601DateString(val) {
    const parsedDate = luxon_1.DateTime.fromFormat(val, 'yyyy-MM-dd', { zone: 'utc' });
    return parsedDate.isValid;
}
function isDateTimeOnUTCStartOfDay(parsedDate) {
    const isUtc = parsedDate.offset === 0;
    const isStartOfDay = parsedDate.startOf('day').toISO() === parsedDate.toISO();
    const isValid = parsedDate.isValid;
    return isUtc && isStartOfDay && isValid;
}
//# sourceMappingURL=zod.utils.js.map