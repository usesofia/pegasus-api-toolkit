import { z } from 'zod';
export declare const coercedBoolean: z.ZodEffects<z.ZodBoolean, boolean, unknown>;
export declare const coercedBigInt: z.ZodEffects<z.ZodBigInt, bigint, unknown>;
export declare const isoDateStringWithoutTime: z.ZodEffects<z.ZodEffects<z.ZodString, string, unknown>, string, unknown>;
export declare const jsDateOnUtcStartOfDay: z.ZodEffects<z.ZodEffects<z.ZodDate, Date, unknown>, Date, unknown>;
export declare function convertIsoDateStringWithoutTimeToJsDate(dateString: string): Date;
