import { DateTime } from 'luxon';
import { z } from 'zod';

export const datetimeWithTimeZone = z.coerce
  .string()
  .datetime({ offset: true });

export const nullishDate = z
  .string()
  .nullish()
  .refine(
    (date) => {
      if (!date) return true;
      const datetime = DateTime.fromISO(date, {
        zone: 'utc',
      });
      return datetime.isValid;
    },
    {
      message: 'A data deve estar no formato yyyy-MM-dd.',
    },
  )
  .transform((date) => {
    if (!date) return null;
    return DateTime.fromISO(date, {
      zone: 'utc',
    }).toJSDate();
  });

export const date = z.string()
  .refine(
    (date) => {
      const datetime = DateTime.fromISO(date, {
        zone: 'utc',
      });
      return datetime.isValid;
    },
    {
      message: 'A data deve estar no formato yyyy-MM-dd.',
    },
  )
  .transform((date) => {
    return DateTime.fromISO(date, {
      zone: 'utc',
    }).toJSDate();
  });
