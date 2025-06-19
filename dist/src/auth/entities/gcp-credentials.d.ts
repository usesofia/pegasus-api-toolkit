import { z } from 'zod';
declare const GcpCredentialsEntitySchema: z.ZodObject<{
    accessToken: z.ZodString;
}, "strip", z.ZodTypeAny, {
    accessToken: string;
}, {
    accessToken: string;
}>;
declare const GcpCredentialsEntity_base: import("nestjs-zod").ZodDto<{
    accessToken: string;
}, z.ZodObjectDef<{
    accessToken: z.ZodString;
}, "strip", z.ZodTypeAny>, {
    accessToken: string;
}>;
export declare class GcpCredentialsEntity extends GcpCredentialsEntity_base {
    static build(input: z.input<typeof GcpCredentialsEntitySchema>): GcpCredentialsEntity;
}
export {};
