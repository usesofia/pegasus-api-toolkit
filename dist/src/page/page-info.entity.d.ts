import { z } from 'zod';
export declare const PageInfoEntitySchema: z.ZodObject<{
    pageIndex: z.ZodNumber;
    pageSize: z.ZodNumber;
    totalPages: z.ZodNumber;
    totalItems: z.ZodNumber;
}, z.core.$strip>;
declare const PageInfoEntity_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    pageIndex: z.ZodNumber;
    pageSize: z.ZodNumber;
    totalPages: z.ZodNumber;
    totalItems: z.ZodNumber;
}, z.core.$strip>, false>;
export declare class PageInfoEntity extends PageInfoEntity_base {
    static build(input: z.input<typeof PageInfoEntitySchema>): PageInfoEntity;
}
export {};
