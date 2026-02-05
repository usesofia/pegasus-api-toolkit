import { z } from 'zod';
export declare const PopulateRequestQueryDtoSchema: z.ZodObject<{
    populate: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    populate?: string | undefined;
}, {
    populate?: string | undefined;
}>;
declare const PopulateRequestQueryDto_base: import("nestjs-zod").ZodDto<{
    populate?: string | undefined;
}, z.ZodObjectDef<{
    populate: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny>, {
    populate?: string | undefined;
}>;
export declare class PopulateRequestQueryDto extends PopulateRequestQueryDto_base {
}
export {};
