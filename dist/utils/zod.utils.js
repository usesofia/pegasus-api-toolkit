"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.date = exports.nullishDate = exports.datetimeWithTimeZone = void 0;
const luxon_1 = require("luxon");
const zod_1 = require("zod");
exports.datetimeWithTimeZone = zod_1.z.coerce
    .string()
    .datetime({ offset: true });
exports.nullishDate = zod_1.z
    .string()
    .nullish()
    .refine((date) => {
    if (!date)
        return true;
    const datetime = luxon_1.DateTime.fromISO(date, {
        zone: 'utc',
    });
    return datetime.isValid;
}, {
    message: 'A data deve estar no formato yyyy-MM-dd.',
})
    .transform((date) => {
    if (!date)
        return null;
    return luxon_1.DateTime.fromISO(date, {
        zone: 'utc',
    }).toJSDate();
});
exports.date = zod_1.z.string()
    .refine((date) => {
    const datetime = luxon_1.DateTime.fromISO(date, {
        zone: 'utc',
    });
    return datetime.isValid;
}, {
    message: 'A data deve estar no formato yyyy-MM-dd.',
})
    .transform((date) => {
    return luxon_1.DateTime.fromISO(date, {
        zone: 'utc',
    }).toJSDate();
});
//# sourceMappingURL=zod.utils.js.map