import { z } from 'zod';
declare const CacheHitOnGetAuthUserPayloadSchema: z.ZodObject<{
    userId: z.ZodString;
    organizationId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    organizationRole: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    userId: string;
    organizationId?: string | null | undefined;
    organizationRole?: string | null | undefined;
}, {
    userId: string;
    organizationId?: string | null | undefined;
    organizationRole?: string | null | undefined;
}>;
declare const CacheHitOnGetAuthUserPayload_base: import("nestjs-zod").ZodDto<{
    userId: string;
    organizationId?: string | null | undefined;
    organizationRole?: string | null | undefined;
}, z.ZodObjectDef<{
    userId: z.ZodString;
    organizationId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    organizationRole: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny>, {
    userId: string;
    organizationId?: string | null | undefined;
    organizationRole?: string | null | undefined;
}>;
export declare class CacheHitOnGetAuthUserPayload extends CacheHitOnGetAuthUserPayload_base {
    static build(input: z.input<typeof CacheHitOnGetAuthUserPayloadSchema>): CacheHitOnGetAuthUserPayload;
}
export {};
