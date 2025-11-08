import { z } from 'zod';
export declare const PopulateRequestQueryDtoSchema: z.ZodObject<{
    populate: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const PopulateRequestQueryDto_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    populate: z.ZodOptional<z.ZodString>;
}, z.core.$strip>> & {
    io: "input";
};
export declare class PopulateRequestQueryDto extends PopulateRequestQueryDto_base {
}
export {};
