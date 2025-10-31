import { z } from 'zod';
declare const CreateFileRequestEntitySchema: z.ZodObject<{
    data: z.ZodObject<{
        status: z.ZodEnum<typeof import("../../files/entities/file.entity").FileStatus>;
        size: z.ZodNumber;
        deletedAt: z.ZodDefault<z.ZodNullable<z.ZodCoercedDate<unknown>>>;
        originalFileName: z.ZodString;
        mimeType: z.ZodString;
        fileType: z.ZodEnum<typeof import("../../files/entities/file.entity").FileType>;
        objectName: z.ZodString;
        caption: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>;
    populate: z.ZodOptional<z.ZodString>;
    channel: z.ZodEnum<{
        readonly WEB_APP: "WEB_APP";
        readonly WHATSAPP: "WHATSAPP";
        readonly SYSTEM: "SYSTEM";
        readonly EMAIL: "EMAIL";
    }>;
}, z.core.$strip>;
declare const CreateFileRequestEntity_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    data: z.ZodObject<{
        status: z.ZodEnum<typeof import("../../files/entities/file.entity").FileStatus>;
        size: z.ZodNumber;
        deletedAt: z.ZodDefault<z.ZodNullable<z.ZodCoercedDate<unknown>>>;
        originalFileName: z.ZodString;
        mimeType: z.ZodString;
        fileType: z.ZodEnum<typeof import("../../files/entities/file.entity").FileType>;
        objectName: z.ZodString;
        caption: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>;
    populate: z.ZodOptional<z.ZodString>;
    channel: z.ZodEnum<{
        readonly WEB_APP: "WEB_APP";
        readonly WHATSAPP: "WHATSAPP";
        readonly SYSTEM: "SYSTEM";
        readonly EMAIL: "EMAIL";
    }>;
}, z.core.$strip>> & {
    io: "input";
};
export declare class CreateFileRequestEntity extends CreateFileRequestEntity_base {
    static build(input: z.input<typeof CreateFileRequestEntitySchema>): CreateFileRequestEntity;
}
export {};
