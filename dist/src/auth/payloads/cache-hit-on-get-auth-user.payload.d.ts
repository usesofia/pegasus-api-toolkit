import { z } from 'zod';
declare const CacheHitOnGetAuthUserPayloadSchema: z.ZodObject<{
    userId: z.ZodString;
    organizationId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    organizationRole: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
declare const CacheHitOnGetAuthUserPayload_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    userId: z.ZodString;
    organizationId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    organizationRole: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>> & {
    io: "input";
};
export declare class CacheHitOnGetAuthUserPayload extends CacheHitOnGetAuthUserPayload_base {
    static build(input: z.input<typeof CacheHitOnGetAuthUserPayloadSchema>): CacheHitOnGetAuthUserPayload;
}
export {};
