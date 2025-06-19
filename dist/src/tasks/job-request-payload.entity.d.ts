import { z } from "zod";
declare const JobRequestPayloadEntitySchema: z.ZodObject<{
    jobRequestId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    jobRequestId: string;
}, {
    jobRequestId: string;
}>;
declare const JobRequestPayloadEntity_base: import("nestjs-zod").ZodDto<{
    jobRequestId: string;
}, z.ZodObjectDef<{
    jobRequestId: z.ZodString;
}, "strip", z.ZodTypeAny>, {
    jobRequestId: string;
}>;
export declare class JobRequestPayloadEntity extends JobRequestPayloadEntity_base {
    static build(input: z.infer<typeof JobRequestPayloadEntitySchema>): JobRequestPayloadEntity;
}
export {};
