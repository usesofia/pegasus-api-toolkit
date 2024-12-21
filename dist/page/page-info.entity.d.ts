import { z } from 'zod';
export declare const PageInfoEntitySchema: z.ZodObject<{
    pageIndex: z.ZodNumber;
    pageSize: z.ZodNumber;
    totalPages: z.ZodNumber;
    totalItems: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    pageIndex: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
}, {
    pageIndex: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
}>;
declare const PageInfoEntity_base: import("nestjs-zod").ZodDto<{
    pageIndex: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
}, z.ZodObjectDef<{
    pageIndex: z.ZodNumber;
    pageSize: z.ZodNumber;
    totalPages: z.ZodNumber;
    totalItems: z.ZodNumber;
}, "strip", z.ZodTypeAny>, {
    pageIndex: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
}>;
export declare class PageInfoEntity extends PageInfoEntity_base {
    static build(input: z.infer<typeof PageInfoEntitySchema>): PageInfoEntity;
}
export {};
