import { z } from 'zod';
export declare const CreateFileUploadRequestDataEntitySchema: z.ZodObject<{
    size: z.ZodNumber;
    deletedAt: z.ZodDefault<z.ZodNullable<z.ZodCoercedDate<unknown>>>;
    originalFileName: z.ZodString;
    mimeType: z.ZodString;
    fileType: z.ZodEnum<typeof import("../../files/entities/file.entity").FileType>;
    caption: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
declare const CreateFileUploadRequestEntitySchema: z.ZodObject<{
    data: z.ZodObject<{
        size: z.ZodNumber;
        deletedAt: z.ZodDefault<z.ZodNullable<z.ZodCoercedDate<unknown>>>;
        originalFileName: z.ZodString;
        mimeType: z.ZodString;
        fileType: z.ZodEnum<typeof import("../../files/entities/file.entity").FileType>;
        caption: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>;
    channel: z.ZodEnum<{
        readonly WEB_APP: "WEB_APP";
        readonly WHATSAPP: "WHATSAPP";
        readonly SYSTEM: "SYSTEM";
        readonly EMAIL: "EMAIL";
    }>;
}, z.core.$strip>;
declare const CreateFileUploadRequestEntity_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    data: z.ZodObject<{
        size: z.ZodNumber;
        deletedAt: z.ZodDefault<z.ZodNullable<z.ZodCoercedDate<unknown>>>;
        originalFileName: z.ZodString;
        mimeType: z.ZodString;
        fileType: z.ZodEnum<typeof import("../../files/entities/file.entity").FileType>;
        caption: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>;
    channel: z.ZodEnum<{
        readonly WEB_APP: "WEB_APP";
        readonly WHATSAPP: "WHATSAPP";
        readonly SYSTEM: "SYSTEM";
        readonly EMAIL: "EMAIL";
    }>;
}, z.core.$strip>> & {
    io: "input";
};
export declare class CreateFileUploadRequestEntity extends CreateFileUploadRequestEntity_base {
    static build(input: z.input<typeof CreateFileUploadRequestEntitySchema>): CreateFileUploadRequestEntity;
}
export {};
