import { z } from 'zod';
declare const GcpCredentialsEntitySchema: z.ZodObject<{
    accessToken: z.ZodString;
}, z.core.$strip>;
declare const GcpCredentialsEntity_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    accessToken: z.ZodString;
}, z.core.$strip>, false>;
export declare class GcpCredentialsEntity extends GcpCredentialsEntity_base {
    static build(input: z.input<typeof GcpCredentialsEntitySchema>): GcpCredentialsEntity;
}
export {};
