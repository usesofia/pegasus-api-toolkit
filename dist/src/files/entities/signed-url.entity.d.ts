import { z } from 'zod';
declare const SignedUrlEntitySchema: z.ZodObject<{
    url: z.ZodString;
    signedUrl: z.ZodString;
}, z.core.$strip>;
declare const SignedUrlEntity_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    url: z.ZodString;
    signedUrl: z.ZodString;
}, z.core.$strip>, false>;
export declare class SignedUrlEntity extends SignedUrlEntity_base {
    static build(input: z.input<typeof SignedUrlEntitySchema>): SignedUrlEntity;
}
export {};
