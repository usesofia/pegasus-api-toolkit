import { z } from 'zod';
export declare const ConfirmFileUploadRequestDataEntitySchema: z.ZodObject<Omit<{
    id: z.ZodString;
    ownerOrganization: z.ZodString;
    originalFileName: z.ZodString;
    mimeType: z.ZodString;
    size: z.ZodNumber;
    fileType: z.ZodNativeEnum<typeof import("@app/files/entities/file.entity").FileType>;
    objectName: z.ZodString;
    status: z.ZodNativeEnum<typeof import("@app/files/entities/file.entity").FileStatus>;
    caption: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    deletedAt: z.ZodDefault<z.ZodNullable<z.ZodDate>>;
} & {
    url: z.ZodString;
    signedUrl: z.ZodString;
}, "url" | "size" | "ownerOrganization" | "updatedAt" | "originalFileName" | "mimeType" | "fileType" | "objectName" | "createdAt" | "signedUrl">, "strip", z.ZodTypeAny, {
    status: import("@app/files/entities/file.entity").FileStatus;
    id: string;
    deletedAt: Date | null;
    caption?: string | null | undefined;
}, {
    status: import("@app/files/entities/file.entity").FileStatus;
    id: string;
    deletedAt?: Date | null | undefined;
    caption?: string | null | undefined;
}>;
declare const ConfirmFileUploadRequestEntitySchema: z.ZodObject<{
    data: z.ZodObject<Omit<{
        id: z.ZodString;
        ownerOrganization: z.ZodString;
        originalFileName: z.ZodString;
        mimeType: z.ZodString;
        size: z.ZodNumber;
        fileType: z.ZodNativeEnum<typeof import("@app/files/entities/file.entity").FileType>;
        objectName: z.ZodString;
        status: z.ZodNativeEnum<typeof import("@app/files/entities/file.entity").FileStatus>;
        caption: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
        deletedAt: z.ZodDefault<z.ZodNullable<z.ZodDate>>;
    } & {
        url: z.ZodString;
        signedUrl: z.ZodString;
    }, "url" | "size" | "ownerOrganization" | "updatedAt" | "originalFileName" | "mimeType" | "fileType" | "objectName" | "createdAt" | "signedUrl">, "strip", z.ZodTypeAny, {
        status: import("@app/files/entities/file.entity").FileStatus;
        id: string;
        deletedAt: Date | null;
        caption?: string | null | undefined;
    }, {
        status: import("@app/files/entities/file.entity").FileStatus;
        id: string;
        deletedAt?: Date | null | undefined;
        caption?: string | null | undefined;
    }>;
    channel: z.ZodNativeEnum<{
        readonly WEB_APP: "WEB_APP";
        readonly WHATSAPP: "WHATSAPP";
        readonly SYSTEM: "SYSTEM";
        readonly EMAIL: "EMAIL";
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        status: import("@app/files/entities/file.entity").FileStatus;
        id: string;
        deletedAt: Date | null;
        caption?: string | null | undefined;
    };
    channel: "WEB_APP" | "WHATSAPP" | "SYSTEM" | "EMAIL";
}, {
    data: {
        status: import("@app/files/entities/file.entity").FileStatus;
        id: string;
        deletedAt?: Date | null | undefined;
        caption?: string | null | undefined;
    };
    channel: "WEB_APP" | "WHATSAPP" | "SYSTEM" | "EMAIL";
}>;
declare const ConfirmFileUploadRequestEntity_base: import("nestjs-zod").ZodDto<{
    data: {
        status: import("@app/files/entities/file.entity").FileStatus;
        id: string;
        deletedAt: Date | null;
        caption?: string | null | undefined;
    };
    channel: "WEB_APP" | "WHATSAPP" | "SYSTEM" | "EMAIL";
}, z.ZodObjectDef<{
    data: z.ZodObject<Omit<{
        id: z.ZodString;
        ownerOrganization: z.ZodString;
        originalFileName: z.ZodString;
        mimeType: z.ZodString;
        size: z.ZodNumber;
        fileType: z.ZodNativeEnum<typeof import("@app/files/entities/file.entity").FileType>;
        objectName: z.ZodString;
        status: z.ZodNativeEnum<typeof import("@app/files/entities/file.entity").FileStatus>;
        caption: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
        deletedAt: z.ZodDefault<z.ZodNullable<z.ZodDate>>;
    } & {
        url: z.ZodString;
        signedUrl: z.ZodString;
    }, "url" | "size" | "ownerOrganization" | "updatedAt" | "originalFileName" | "mimeType" | "fileType" | "objectName" | "createdAt" | "signedUrl">, "strip", z.ZodTypeAny, {
        status: import("@app/files/entities/file.entity").FileStatus;
        id: string;
        deletedAt: Date | null;
        caption?: string | null | undefined;
    }, {
        status: import("@app/files/entities/file.entity").FileStatus;
        id: string;
        deletedAt?: Date | null | undefined;
        caption?: string | null | undefined;
    }>;
    channel: z.ZodNativeEnum<{
        readonly WEB_APP: "WEB_APP";
        readonly WHATSAPP: "WHATSAPP";
        readonly SYSTEM: "SYSTEM";
        readonly EMAIL: "EMAIL";
    }>;
}, "strip", z.ZodTypeAny>, {
    data: {
        status: import("@app/files/entities/file.entity").FileStatus;
        id: string;
        deletedAt?: Date | null | undefined;
        caption?: string | null | undefined;
    };
    channel: "WEB_APP" | "WHATSAPP" | "SYSTEM" | "EMAIL";
}>;
export declare class ConfirmFileUploadRequestEntity extends ConfirmFileUploadRequestEntity_base {
    static build(input: z.input<typeof ConfirmFileUploadRequestEntitySchema>): ConfirmFileUploadRequestEntity;
}
export {};
