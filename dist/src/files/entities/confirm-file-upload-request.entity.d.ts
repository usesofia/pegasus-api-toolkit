import { z } from 'zod';
export declare const ConfirmFileUploadRequestDataEntitySchema: z.ZodObject<{
    status: z.ZodEnum<typeof import("../../files/entities/file.entity").FileStatus>;
    id: z.ZodString;
    deletedAt: z.ZodDefault<z.ZodNullable<z.ZodCoercedDate<unknown>>>;
    caption: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    size: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
declare const ConfirmFileUploadRequestEntitySchema: z.ZodObject<{
    data: z.ZodObject<{
        status: z.ZodEnum<typeof import("../../files/entities/file.entity").FileStatus>;
        id: z.ZodString;
        deletedAt: z.ZodDefault<z.ZodNullable<z.ZodCoercedDate<unknown>>>;
        caption: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        size: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>;
    channel: z.ZodEnum<{
        readonly WEB_APP: "WEB_APP";
        readonly WHATSAPP: "WHATSAPP";
        readonly SYSTEM: "SYSTEM";
        readonly EMAIL: "EMAIL";
    }>;
}, z.core.$strip>;
declare const ConfirmFileUploadRequestEntity_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    data: z.ZodObject<{
        status: z.ZodEnum<typeof import("../../files/entities/file.entity").FileStatus>;
        id: z.ZodString;
        deletedAt: z.ZodDefault<z.ZodNullable<z.ZodCoercedDate<unknown>>>;
        caption: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        size: z.ZodOptional<z.ZodNumber>;
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
export declare class ConfirmFileUploadRequestEntity extends ConfirmFileUploadRequestEntity_base {
    static build(input: z.input<typeof ConfirmFileUploadRequestEntitySchema>): ConfirmFileUploadRequestEntity;
}
export {};
