import { z } from 'zod';
declare const CacheHitOnGetAuthUserPayloadSchema: z.ZodObject<{
    userId: z.ZodString;
    organizationId: z.ZodString;
    organizationRole: z.ZodString;
}, "strip", z.ZodTypeAny, {
    organizationRole: string;
    userId: string;
    organizationId: string;
}, {
    organizationRole: string;
    userId: string;
    organizationId: string;
}>;
declare const CacheHitOnGetAuthUserPayload_base: import("nestjs-zod").ZodDto<{
    organizationRole: string;
    userId: string;
    organizationId: string;
}, z.ZodObjectDef<{
    userId: z.ZodString;
    organizationId: z.ZodString;
    organizationRole: z.ZodString;
}, "strip", z.ZodTypeAny>, {
    organizationRole: string;
    userId: string;
    organizationId: string;
}>;
export declare class CacheHitOnGetAuthUserPayload extends CacheHitOnGetAuthUserPayload_base {
    static build(input: z.infer<typeof CacheHitOnGetAuthUserPayloadSchema>): CacheHitOnGetAuthUserPayload;
}
export {};
