import { z } from "zod";
declare const JobRequestPayloadEntitySchema: z.ZodObject<{
    jobRequestId: z.ZodString;
}, z.core.$strip>;
declare const JobRequestPayloadEntity_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    jobRequestId: z.ZodString;
}, z.core.$strip>, false>;
export declare class JobRequestPayloadEntity extends JobRequestPayloadEntity_base {
    static build(input: z.infer<typeof JobRequestPayloadEntitySchema>): JobRequestPayloadEntity;
}
export {};
