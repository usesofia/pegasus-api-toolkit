import { z } from 'zod';
declare const SignedUrlEntitySchema: z.ZodObject<{
    url: z.ZodString;
    signedUrl: z.ZodString;
}, "strip", z.ZodTypeAny, {
    url: string;
    signedUrl: string;
}, {
    url: string;
    signedUrl: string;
}>;
declare const SignedUrlEntity_base: import("nestjs-zod").ZodDto<{
    url: string;
    signedUrl: string;
}, z.ZodObjectDef<{
    url: z.ZodString;
    signedUrl: z.ZodString;
}, "strip", z.ZodTypeAny>, {
    url: string;
    signedUrl: string;
}>;
export declare class SignedUrlEntity extends SignedUrlEntity_base {
    static build(input: z.input<typeof SignedUrlEntitySchema>): SignedUrlEntity;
}
export {};
