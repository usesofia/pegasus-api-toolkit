import { DateTime } from 'luxon';
import { z } from 'zod';

export const coercedBoolean = z.preprocess((val) => {
  if (typeof val === 'string') {
    if (['1', 'true'].includes(val.toLowerCase())) return true;
    if (['0', 'false'].includes(val.toLowerCase())) return false;
  }
  return val;
}, z.coerce.boolean());

export const coercedBigInt = z.preprocess((val) => {
  if (typeof val === 'string') {
    return BigInt(val);
  }
  return val;
}, z.coerce.bigint());

export const isoDateStringWithoutTime = z.preprocess((val) => {
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
}, z.string(), {
  message: `A data deve ser uma:\
  1. String no formato yyyy-mm-dd\
  2. String no formato yyyy-mm-ddT00:00:00.000Z\
  3. JS Date no início do dia UTC\
  `
}).refine((val) => isValidIso8601DatetimeString(val), {
  message: 'A string deve estar no formato yyyy-mm-dd e representar uma data válida'
});

export const jsDateOnUtcStartOfDay = z.preprocess((val) => {
  if (typeof val === 'string') {
    if (isValidIso8601DatetimeString(val)) {
      return DateTime.fromISO(val, { zone: 'utc' }).toJSDate();
    }

    if (isValidIso8601DateString(val)) {
      return DateTime.fromFormat(val, 'yyyy-MM-dd', { zone: 'utc' }).toJSDate();
    }

    throw new Error('Esperava-se uma string no formato yyyy-mm-dd ou yyyy-mm-ddT00:00:00.000Z, recebido: ' + val);
  }

  return val;
}, z.date(), {
  message: 'A data deve ser uma string no formato yyyy-mm-dd ou um JS Date'
})
  .refine((val) => isValidJsDateOnUtcStartOfDay(val), {
    message: 'A data deve estar no formato yyyy-mm-ddT00:00:00.000Z e representar uma data válida UTC',
  });

export function convertIsoDateStringWithoutTimeToJsDate(dateString: string): Date {
  const parsedDate = DateTime.fromISO(dateString, { zone: 'utc' });
  return parsedDate.toJSDate();
}

function isValidJsDateOnUtcStartOfDay(val: Date): boolean {
  const parsedDate = DateTime.fromJSDate(val, { zone: 'utc' });
  return isDateTimeOnUTCStartOfDay(parsedDate);
}


function isValidIso8601DatetimeString(val: string): boolean {
  const parsedDate = DateTime.fromISO(val, { zone: 'utc' });
  return isDateTimeOnUTCStartOfDay(parsedDate);
}

function isValidIso8601DateString(val: string): boolean {
  const parsedDate = DateTime.fromFormat(val, 'yyyy-MM-dd', { zone: 'utc' });
  return parsedDate.isValid;
}


function isDateTimeOnUTCStartOfDay(parsedDate: DateTime): boolean {
  const isUtc = parsedDate.offset === 0;
  const isStartOfDay = parsedDate.startOf('day').toISO() === parsedDate.toISO();
  const isValid = parsedDate.isValid;
  return isUtc && isStartOfDay && isValid;
}