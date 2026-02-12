import { z } from 'zod';
export declare const coercedBoolean: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodCoercedBoolean<unknown>>;
export declare const coercedBigInt: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodCoercedBigInt<unknown>>;
export declare const isoDateStringWithoutTime: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodString>;
export declare const jsDateOnUtcStartOfDay: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodCoercedDate<unknown>>;
export declare function convertIsoDateStringWithoutTimeToJsDate(dateString: string): Date;
