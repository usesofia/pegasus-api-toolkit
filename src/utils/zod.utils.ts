import { z } from 'zod';

export const datetimeWithTimeZone = z.coerce.string().datetime({ offset: true });
