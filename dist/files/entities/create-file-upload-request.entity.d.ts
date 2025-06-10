import { z } from 'zod';
export declare const CreateFileUploadRequestDataEntitySchema: z.ZodObject<Omit<{
    id: z.ZodString;
    ownerOrganization: z.ZodString;
    originalFileName: z.ZodString;
    mimeType: z.ZodString;
    size: z.ZodNumber;
    fileType: z.ZodNativeEnum<typeof import("@app/files/entities/file.entity").FileType>;
    objectName: z.ZodString;
    status: z.ZodNativeEnum<typeof import("@app/files/entities/file.entity").FileStatus>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    deletedAt: z.ZodDefault<z.ZodNullable<z.ZodDate>>;
    signedUrl: z.ZodOptional<z.ZodString>;
}, "status" | "id" | "ownerOrganization" | "updatedAt" | "objectName" | "createdAt">, "strip", z.ZodTypeAny, {
    size: number;
    deletedAt: Date | null;
    originalFileName: string;
    mimeType: string;
    fileType: import("@app/files/entities/file.entity").FileType;
    signedUrl?: string | undefined;
}, {
    size: number;
    originalFileName: string;
    mimeType: string;
    fileType: import("@app/files/entities/file.entity").FileType;
    deletedAt?: Date | null | undefined;
    signedUrl?: string | undefined;
}>;
declare const CreateFileUploadRequestEntitySchema: z.ZodObject<{
    data: z.ZodObject<Omit<{
        id: z.ZodString;
        ownerOrganization: z.ZodString;
        originalFileName: z.ZodString;
        mimeType: z.ZodString;
        size: z.ZodNumber;
        fileType: z.ZodNativeEnum<typeof import("@app/files/entities/file.entity").FileType>;
        objectName: z.ZodString;
        status: z.ZodNativeEnum<typeof import("@app/files/entities/file.entity").FileStatus>;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
        deletedAt: z.ZodDefault<z.ZodNullable<z.ZodDate>>;
        signedUrl: z.ZodOptional<z.ZodString>;
    }, "status" | "id" | "ownerOrganization" | "updatedAt" | "objectName" | "createdAt">, "strip", z.ZodTypeAny, {
        size: number;
        deletedAt: Date | null;
        originalFileName: string;
        mimeType: string;
        fileType: import("@app/files/entities/file.entity").FileType;
        signedUrl?: string | undefined;
    }, {
        size: number;
        originalFileName: string;
        mimeType: string;
        fileType: import("@app/files/entities/file.entity").FileType;
        deletedAt?: Date | null | undefined;
        signedUrl?: string | undefined;
    }>;
    channel: z.ZodNativeEnum<{
        readonly WEB_APP: "WEB_APP";
        readonly WHATSAPP: "WHATSAPP";
        readonly SYSTEM: "SYSTEM";
        readonly EMAIL: "EMAIL";
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        size: number;
        deletedAt: Date | null;
        originalFileName: string;
        mimeType: string;
        fileType: import("@app/files/entities/file.entity").FileType;
        signedUrl?: string | undefined;
    };
    channel: "WEB_APP" | "WHATSAPP" | "SYSTEM" | "EMAIL";
}, {
    data: {
        size: number;
        originalFileName: string;
        mimeType: string;
        fileType: import("@app/files/entities/file.entity").FileType;
        deletedAt?: Date | null | undefined;
        signedUrl?: string | undefined;
    };
    channel: "WEB_APP" | "WHATSAPP" | "SYSTEM" | "EMAIL";
}>;
declare const CreateFileUploadRequestEntity_base: import("nestjs-zod").ZodDto<{
    data: {
        size: number;
        deletedAt: Date | null;
        originalFileName: string;
        mimeType: string;
        fileType: import("@app/files/entities/file.entity").FileType;
        signedUrl?: string | undefined;
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
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
        deletedAt: z.ZodDefault<z.ZodNullable<z.ZodDate>>;
        signedUrl: z.ZodOptional<z.ZodString>;
    }, "status" | "id" | "ownerOrganization" | "updatedAt" | "objectName" | "createdAt">, "strip", z.ZodTypeAny, {
        size: number;
        deletedAt: Date | null;
        originalFileName: string;
        mimeType: string;
        fileType: import("@app/files/entities/file.entity").FileType;
        signedUrl?: string | undefined;
    }, {
        size: number;
        originalFileName: string;
        mimeType: string;
        fileType: import("@app/files/entities/file.entity").FileType;
        deletedAt?: Date | null | undefined;
        signedUrl?: string | undefined;
    }>;
    channel: z.ZodNativeEnum<{
        readonly WEB_APP: "WEB_APP";
        readonly WHATSAPP: "WHATSAPP";
        readonly SYSTEM: "SYSTEM";
        readonly EMAIL: "EMAIL";
    }>;
}, "strip", z.ZodTypeAny>, {
    data: {
        size: number;
        originalFileName: string;
        mimeType: string;
        fileType: import("@app/files/entities/file.entity").FileType;
        deletedAt?: Date | null | undefined;
        signedUrl?: string | undefined;
    };
    channel: "WEB_APP" | "WHATSAPP" | "SYSTEM" | "EMAIL";
}>;
export declare class CreateFileUploadRequestEntity extends CreateFileUploadRequestEntity_base {
    static build(input: z.input<typeof CreateFileUploadRequestEntitySchema>): CreateFileUploadRequestEntity;
}
export {};
