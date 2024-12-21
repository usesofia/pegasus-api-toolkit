import { z } from 'zod';
declare const CacheHitOnGetAuthUserPayloadSchema: z.ZodObject<{
    userId: z.ZodString;
    orgId: z.ZodString;
    orgRole: z.ZodString;
}, "strip", z.ZodTypeAny, {
    orgRole: string;
    userId: string;
    orgId: string;
}, {
    orgRole: string;
    userId: string;
    orgId: string;
}>;
declare const CacheHitOnGetAuthUserPayload_base: import("nestjs-zod").ZodDto<{
    orgRole: string;
    userId: string;
    orgId: string;
}, z.ZodObjectDef<{
    userId: z.ZodString;
    orgId: z.ZodString;
    orgRole: z.ZodString;
}, "strip", z.ZodTypeAny>, {
    orgRole: string;
    userId: string;
    orgId: string;
}>;
export declare class CacheHitOnGetAuthUserPayload extends CacheHitOnGetAuthUserPayload_base {
    static build(input: z.infer<typeof CacheHitOnGetAuthUserPayloadSchema>): CacheHitOnGetAuthUserPayload;
}
export {};
