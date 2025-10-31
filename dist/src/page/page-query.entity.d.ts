import { z } from 'zod';
export declare const PageQueryEntitySchema: z.ZodObject<{
    pageIndex: z.ZodDefault<z.ZodOptional<z.ZodPipe<z.ZodTransform<number, unknown>, z.ZodNumber>>>;
    pageSize: z.ZodDefault<z.ZodOptional<z.ZodPipe<z.ZodTransform<number, unknown>, z.ZodNumber>>>;
}, z.core.$strip>;
declare const PageQueryEntity_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    pageIndex: z.ZodDefault<z.ZodOptional<z.ZodPipe<z.ZodTransform<number, unknown>, z.ZodNumber>>>;
    pageSize: z.ZodDefault<z.ZodOptional<z.ZodPipe<z.ZodTransform<number, unknown>, z.ZodNumber>>>;
}, z.core.$strip>> & {
    io: "input";
};
export declare class PageQueryEntity extends PageQueryEntity_base {
}
export {};
