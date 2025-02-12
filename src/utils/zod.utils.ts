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
      message: 'Data de nascimento deve estar no formato yyyy-MM-dd.',
    },
  )
  .transform((date) => {
    if (!date) return null;
    const datetime = DateTime.fromISO(date, {
      zone: 'utc',
    });
    return datetime.toISODate();
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
      message: 'Data de nascimento deve estar no formato yyyy-MM-dd.',
    },
  )
  .transform((date) => {
    const datetime = DateTime.fromISO(date, {
      zone: 'utc',
    });
    return datetime.toISODate();
  });
