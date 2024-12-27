import { z } from 'zod';
declare const CacheHitOnGetAuthUserPayloadSchema: z.ZodObject<{
    userId: z.ZodString;
    organizationId: z.ZodString;
    organizationRole: z.ZodString;
}, "strip", z.ZodTypeAny, {
    userId: string;
    organizationId: string;
    organizationRole: string;
}, {
    userId: string;
    organizationId: string;
    organizationRole: string;
}>;
declare const CacheHitOnGetAuthUserPayload_base: import("nestjs-zod").ZodDto<{
    userId: string;
    organizationId: string;
    organizationRole: string;
}, z.ZodObjectDef<{
    userId: z.ZodString;
    organizationId: z.ZodString;
    organizationRole: z.ZodString;
}, "strip", z.ZodTypeAny>, {
    userId: string;
    organizationId: string;
    organizationRole: string;
}>;
export declare class CacheHitOnGetAuthUserPayload extends CacheHitOnGetAuthUserPayload_base {
    static build(input: z.infer<typeof CacheHitOnGetAuthUserPayloadSchema>): CacheHitOnGetAuthUserPayload;
}
export {};
