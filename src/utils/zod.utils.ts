import { z } from 'zod';
import { DateTime } from 'luxon';

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

export const isoDateStringWithoutTime = z.string().refine((val) => {
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

export function convertIsoDateStringWithoutTimeToJsDate(dateString: string): Date {
  const parsedDate = DateTime.fromISO(dateString, { zone: 'utc' });
  return parsedDate.toJSDate();
}
