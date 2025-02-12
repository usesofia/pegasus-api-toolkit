import { z } from 'zod';
export declare const datetimeWithTimeZone: z.ZodString;
export declare const nullishDate: z.ZodEffects<z.ZodEffects<z.ZodOptional<z.ZodNullable<z.ZodString>>, string | null | undefined, string | null | undefined>, string | null, string | null | undefined>;
export declare const date: z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, string | null, string>;
