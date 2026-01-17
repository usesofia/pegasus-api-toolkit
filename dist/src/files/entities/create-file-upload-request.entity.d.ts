import { z } from 'zod';
export declare const CreateFileUploadRequestDataEntitySchema: z.ZodObject<Omit<{
    id: z.ZodString;
    ownerOrganization: z.ZodString;
    originalFileName: z.ZodString;
    mimeType: z.ZodString;
    size: z.ZodNumber;
    fileType: z.ZodNativeEnum<typeof import("../../files/entities/file.entity").FileType>;
    objectName: z.ZodString;
    status: z.ZodNativeEnum<typeof import("../../files/entities/file.entity").FileStatus>;
    caption: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    deletedAt: z.ZodDefault<z.ZodNullable<z.ZodDate>>;
} & {
    url: z.ZodString;
    signedUrl: z.ZodString;
}, "status" | "url" | "id" | "ownerOrganization" | "updatedAt" | "objectName" | "createdAt" | "signedUrl">, "strip", z.ZodTypeAny, {
    deletedAt: Date | null;
    originalFileName: string;
    mimeType: string;
    size: number;
    fileType: import("../../files/entities/file.entity").FileType;
    caption?: string | null | undefined;
}, {
    originalFileName: string;
    mimeType: string;
    size: number;
    fileType: import("../../files/entities/file.entity").FileType;
    deletedAt?: Date | null | undefined;
    caption?: string | null | undefined;
}>;
declare const CreateFileUploadRequestEntitySchema: z.ZodObject<{
    data: z.ZodObject<Omit<{
        id: z.ZodString;
        ownerOrganization: z.ZodString;
        originalFileName: z.ZodString;
        mimeType: z.ZodString;
        size: z.ZodNumber;
        fileType: z.ZodNativeEnum<typeof import("../../files/entities/file.entity").FileType>;
        objectName: z.ZodString;
        status: z.ZodNativeEnum<typeof import("../../files/entities/file.entity").FileStatus>;
        caption: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
        deletedAt: z.ZodDefault<z.ZodNullable<z.ZodDate>>;
    } & {
        url: z.ZodString;
        signedUrl: z.ZodString;
    }, "status" | "url" | "id" | "ownerOrganization" | "updatedAt" | "objectName" | "createdAt" | "signedUrl">, "strip", z.ZodTypeAny, {
        deletedAt: Date | null;
        originalFileName: string;
        mimeType: string;
        size: number;
        fileType: import("../../files/entities/file.entity").FileType;
        caption?: string | null | undefined;
    }, {
        originalFileName: string;
        mimeType: string;
        size: number;
        fileType: import("../../files/entities/file.entity").FileType;
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
        deletedAt: Date | null;
        originalFileName: string;
        mimeType: string;
        size: number;
        fileType: import("../../files/entities/file.entity").FileType;
        caption?: string | null | undefined;
    };
    channel: "WEB_APP" | "WHATSAPP" | "SYSTEM" | "EMAIL";
}, {
    data: {
        originalFileName: string;
        mimeType: string;
        size: number;
        fileType: import("../../files/entities/file.entity").FileType;
        deletedAt?: Date | null | undefined;
        caption?: string | null | undefined;
    };
    channel: "WEB_APP" | "WHATSAPP" | "SYSTEM" | "EMAIL";
}>;
declare const CreateFileUploadRequestEntity_base: import("nestjs-zod").ZodDto<{
    data: {
        deletedAt: Date | null;
        originalFileName: string;
        mimeType: string;
        size: number;
        fileType: import("../../files/entities/file.entity").FileType;
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
        fileType: z.ZodNativeEnum<typeof import("../../files/entities/file.entity").FileType>;
        objectName: z.ZodString;
        status: z.ZodNativeEnum<typeof import("../../files/entities/file.entity").FileStatus>;
        caption: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
        deletedAt: z.ZodDefault<z.ZodNullable<z.ZodDate>>;
    } & {
        url: z.ZodString;
        signedUrl: z.ZodString;
    }, "status" | "url" | "id" | "ownerOrganization" | "updatedAt" | "objectName" | "createdAt" | "signedUrl">, "strip", z.ZodTypeAny, {
        deletedAt: Date | null;
        originalFileName: string;
        mimeType: string;
        size: number;
        fileType: import("../../files/entities/file.entity").FileType;
        caption?: string | null | undefined;
    }, {
        originalFileName: string;
        mimeType: string;
        size: number;
        fileType: import("../../files/entities/file.entity").FileType;
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
        originalFileName: string;
        mimeType: string;
        size: number;
        fileType: import("../../files/entities/file.entity").FileType;
        deletedAt?: Date | null | undefined;
        caption?: string | null | undefined;
    };
    channel: "WEB_APP" | "WHATSAPP" | "SYSTEM" | "EMAIL";
}>;
export declare class CreateFileUploadRequestEntity extends CreateFileUploadRequestEntity_base {
    static build(input: z.input<typeof CreateFileUploadRequestEntitySchema>): CreateFileUploadRequestEntity;
}
export {};
