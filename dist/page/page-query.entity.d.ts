import { z } from 'zod';
export declare const PageQueryEntitySchema: z.ZodObject<{
    pageIndex: z.ZodDefault<z.ZodOptional<z.ZodEffects<z.ZodNumber, number, unknown>>>;
    pageSize: z.ZodDefault<z.ZodOptional<z.ZodEffects<z.ZodNumber, number, unknown>>>;
}, "strip", z.ZodTypeAny, {
    pageIndex: number;
    pageSize: number;
}, {
    pageIndex?: unknown;
    pageSize?: unknown;
}>;
declare const PageQueryEntity_base: import("nestjs-zod").ZodDto<{
    pageIndex: number;
    pageSize: number;
}, z.ZodObjectDef<{
    pageIndex: z.ZodDefault<z.ZodOptional<z.ZodEffects<z.ZodNumber, number, unknown>>>;
    pageSize: z.ZodDefault<z.ZodOptional<z.ZodEffects<z.ZodNumber, number, unknown>>>;
}, "strip", z.ZodTypeAny>, {
    pageIndex?: unknown;
    pageSize?: unknown;
}>;
export declare class PageQueryEntity extends PageQueryEntity_base {
}
export {};
