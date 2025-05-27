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
  if (val instanceof Date && isValidUtcDateOnStartOfDay(val)) {
    return val.toISOString().split('T')[0];
  }
  return val;
}, z.string()).refine((val) => {
  // Verifica se está no formato yyyy-mm-dd usando regex
  const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!isoDateRegex.test(val)) {
    return false;
  }

  // Usa Luxon para validar se é uma data válida
  const parsedDate = DateTime.fromISO(val, { zone: 'utc' });
  return parsedDate.isValid;
}, {
  message: 'A string deve estar no formato yyyy-mm-dd e representar uma data válida',
});

export const jsDateOnUtcStartOfDay = z.preprocess((val) => {
  if (typeof val === 'string') {
    if (isoDateStringWithoutTime.safeParse(val).success) {
      return DateTime.fromFormat(val, 'yyyy-MM-dd', { zone: 'utc' }).toJSDate();
    }
    throw new Error('Esperava-se uma string no formato yyyy-mm-dd, recebido: ' + val);
  }

  return val;
}, z.date(), {
  message: 'A data deve ser uma string no formato yyyy-mm-dd ou um JS Date'
})
  .refine((val) => isValidUtcDateOnStartOfDay(val), {
    message: 'A data deve estar no formato yyyy-mm-ddT00:00:00.000Z e representar uma data válida UTC',
  });

export function convertIsoDateStringWithoutTimeToJsDate(dateString: string): Date {
  const parsedDate = DateTime.fromISO(dateString, { zone: 'utc' });
  return parsedDate.toJSDate();
}

function isValidUtcDateOnStartOfDay(val: Date): boolean {
  const parsedDate = DateTime.fromJSDate(val, { zone: 'utc' });
  const isUtc = parsedDate.offset === 0;
  const isStartOfDay = parsedDate.startOf('day').toISO() === val.toISOString();
  const isValid = parsedDate.isValid;
  return isUtc && isStartOfDay && isValid;
}