import { z } from 'zod';
declare const PartialUpdateFileRequestEntitySchema: z.ZodObject<{
    id: z.ZodString;
    data: z.ZodObject<{
        url: z.ZodOptional<z.ZodString>;
        status: z.ZodOptional<z.ZodEnum<typeof import("@app/files/entities/file.entity").FileStatus>>;
        size: z.ZodOptional<z.ZodNumber>;
        deletedAt: z.ZodOptional<z.ZodDefault<z.ZodNullable<z.ZodCoercedDate<unknown>>>>;
        originalFileName: z.ZodOptional<z.ZodString>;
        mimeType: z.ZodOptional<z.ZodString>;
        fileType: z.ZodOptional<z.ZodEnum<typeof import("@app/files/entities/file.entity").FileType>>;
        objectName: z.ZodOptional<z.ZodString>;
        caption: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
        signedUrl: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    channel: z.ZodEnum<{
        readonly WEB_APP: "WEB_APP";
        readonly WHATSAPP: "WHATSAPP";
        readonly SYSTEM: "SYSTEM";
        readonly EMAIL: "EMAIL";
    }>;
}, z.core.$strip>;
declare const PartialUpdateFileRequestEntity_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    id: z.ZodString;
    data: z.ZodObject<{
        url: z.ZodOptional<z.ZodString>;
        status: z.ZodOptional<z.ZodEnum<typeof import("@app/files/entities/file.entity").FileStatus>>;
        size: z.ZodOptional<z.ZodNumber>;
        deletedAt: z.ZodOptional<z.ZodDefault<z.ZodNullable<z.ZodCoercedDate<unknown>>>>;
        originalFileName: z.ZodOptional<z.ZodString>;
        mimeType: z.ZodOptional<z.ZodString>;
        fileType: z.ZodOptional<z.ZodEnum<typeof import("@app/files/entities/file.entity").FileType>>;
        objectName: z.ZodOptional<z.ZodString>;
        caption: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
        signedUrl: z.ZodOptional<z.ZodString>;
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
export declare class PartialUpdateFileRequestEntity extends PartialUpdateFileRequestEntity_base {
    static build(input: z.input<typeof PartialUpdateFileRequestEntitySchema>): PartialUpdateFileRequestEntity;
}
export {};
