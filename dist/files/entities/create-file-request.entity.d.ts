import { z } from 'zod';
declare const CreateFileRequestEntitySchema: z.ZodObject<{
    data: z.ZodObject<Omit<{
        id: z.ZodString;
        ownerOrganization: z.ZodString;
        originalFileName: z.ZodString;
        mimeType: z.ZodString;
        size: z.ZodNumber;
        fileType: z.ZodNativeEnum<typeof import("../../files/entities/file.entity").FileType>;
        objectName: z.ZodString;
        status: z.ZodNativeEnum<typeof import("../../files/entities/file.entity").FileStatus>;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
        deletedAt: z.ZodDefault<z.ZodNullable<z.ZodDate>>;
        signedUrl: z.ZodOptional<z.ZodString>;
    }, "id" | "ownerOrganization" | "updatedAt" | "createdAt">, "strip", z.ZodTypeAny, {
        status: import("../../files/entities/file.entity").FileStatus;
        size: number;
        deletedAt: Date | null;
        originalFileName: string;
        mimeType: string;
        fileType: import("../../files/entities/file.entity").FileType;
        objectName: string;
        signedUrl?: string | undefined;
    }, {
        status: import("../../files/entities/file.entity").FileStatus;
        size: number;
        originalFileName: string;
        mimeType: string;
        fileType: import("../../files/entities/file.entity").FileType;
        objectName: string;
        deletedAt?: Date | null | undefined;
        signedUrl?: string | undefined;
    }>;
    populate: z.ZodOptional<z.ZodString>;
    channel: z.ZodNativeEnum<{
        readonly WEB_APP: "WEB_APP";
        readonly WHATSAPP: "WHATSAPP";
        readonly SYSTEM: "SYSTEM";
        readonly EMAIL: "EMAIL";
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        status: import("../../files/entities/file.entity").FileStatus;
        size: number;
        deletedAt: Date | null;
        originalFileName: string;
        mimeType: string;
        fileType: import("../../files/entities/file.entity").FileType;
        objectName: string;
        signedUrl?: string | undefined;
    };
    channel: "WEB_APP" | "WHATSAPP" | "SYSTEM" | "EMAIL";
    populate?: string | undefined;
}, {
    data: {
        status: import("../../files/entities/file.entity").FileStatus;
        size: number;
        originalFileName: string;
        mimeType: string;
        fileType: import("../../files/entities/file.entity").FileType;
        objectName: string;
        deletedAt?: Date | null | undefined;
        signedUrl?: string | undefined;
    };
    channel: "WEB_APP" | "WHATSAPP" | "SYSTEM" | "EMAIL";
    populate?: string | undefined;
}>;
declare const CreateFileRequestEntity_base: import("nestjs-zod").ZodDto<{
    data: {
        status: import("../../files/entities/file.entity").FileStatus;
        size: number;
        deletedAt: Date | null;
        originalFileName: string;
        mimeType: string;
        fileType: import("../../files/entities/file.entity").FileType;
        objectName: string;
        signedUrl?: string | undefined;
    };
    channel: "WEB_APP" | "WHATSAPP" | "SYSTEM" | "EMAIL";
    populate?: string | undefined;
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
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
        deletedAt: z.ZodDefault<z.ZodNullable<z.ZodDate>>;
        signedUrl: z.ZodOptional<z.ZodString>;
    }, "id" | "ownerOrganization" | "updatedAt" | "createdAt">, "strip", z.ZodTypeAny, {
        status: import("../../files/entities/file.entity").FileStatus;
        size: number;
        deletedAt: Date | null;
        originalFileName: string;
        mimeType: string;
        fileType: import("../../files/entities/file.entity").FileType;
        objectName: string;
        signedUrl?: string | undefined;
    }, {
        status: import("../../files/entities/file.entity").FileStatus;
        size: number;
        originalFileName: string;
        mimeType: string;
        fileType: import("../../files/entities/file.entity").FileType;
        objectName: string;
        deletedAt?: Date | null | undefined;
        signedUrl?: string | undefined;
    }>;
    populate: z.ZodOptional<z.ZodString>;
    channel: z.ZodNativeEnum<{
        readonly WEB_APP: "WEB_APP";
        readonly WHATSAPP: "WHATSAPP";
        readonly SYSTEM: "SYSTEM";
        readonly EMAIL: "EMAIL";
    }>;
}, "strip", z.ZodTypeAny>, {
    data: {
        status: import("../../files/entities/file.entity").FileStatus;
        size: number;
        originalFileName: string;
        mimeType: string;
        fileType: import("../../files/entities/file.entity").FileType;
        objectName: string;
        deletedAt?: Date | null | undefined;
        signedUrl?: string | undefined;
    };
    channel: "WEB_APP" | "WHATSAPP" | "SYSTEM" | "EMAIL";
    populate?: string | undefined;
}>;
export declare class CreateFileRequestEntity extends CreateFileRequestEntity_base {
    static build(input: z.input<typeof CreateFileRequestEntitySchema>): CreateFileRequestEntity;
}
export {};
