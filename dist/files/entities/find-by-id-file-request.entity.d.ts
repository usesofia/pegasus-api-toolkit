import { FileStatus } from '../../files/entities/file.entity';
import { z } from 'zod';
declare const FindByIdFileRequestEntitySchema: z.ZodObject<{
    id: z.ZodString;
    populate: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodNativeEnum<typeof FileStatus>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    status?: FileStatus | undefined;
    populate?: string | undefined;
}, {
    id: string;
    status?: FileStatus | undefined;
    populate?: string | undefined;
}>;
declare const FindByIdFileRequestEntity_base: import("nestjs-zod").ZodDto<{
    id: string;
    status?: FileStatus | undefined;
    populate?: string | undefined;
}, z.ZodObjectDef<{
    id: z.ZodString;
    populate: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodNativeEnum<typeof FileStatus>>;
}, "strip", z.ZodTypeAny>, {
    id: string;
    status?: FileStatus | undefined;
    populate?: string | undefined;
}>;
export declare class FindByIdFileRequestEntity extends FindByIdFileRequestEntity_base {
    static build(input: z.input<typeof FindByIdFileRequestEntitySchema>): FindByIdFileRequestEntity;
}
export {};
