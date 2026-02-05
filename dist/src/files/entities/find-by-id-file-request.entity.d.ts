import { FileStatus } from '@app/files/entities/file.entity';
import { z } from 'zod';
declare const FindByIdFileRequestEntitySchema: z.ZodObject<{
    id: z.ZodString;
    populate: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<typeof FileStatus>>;
}, z.core.$strip>;
declare const FindByIdFileRequestEntity_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    id: z.ZodString;
    populate: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<typeof FileStatus>>;
}, z.core.$strip>> & {
    io: "input";
};
export declare class FindByIdFileRequestEntity extends FindByIdFileRequestEntity_base {
    static build(input: z.input<typeof FindByIdFileRequestEntitySchema>): FindByIdFileRequestEntity;
}
export {};
