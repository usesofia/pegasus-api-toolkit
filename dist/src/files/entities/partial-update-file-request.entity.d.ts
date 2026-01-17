import { z } from 'zod';
declare const PartialUpdateFileRequestEntitySchema: z.ZodObject<{
    id: z.ZodString;
    data: z.ZodObject<Omit<{
        id: z.ZodOptional<z.ZodString>;
        ownerOrganization: z.ZodOptional<z.ZodString>;
        originalFileName: z.ZodOptional<z.ZodString>;
        mimeType: z.ZodOptional<z.ZodString>;
        size: z.ZodOptional<z.ZodNumber>;
        fileType: z.ZodOptional<z.ZodNativeEnum<typeof import("../../files/entities/file.entity").FileType>>;
        objectName: z.ZodOptional<z.ZodString>;
        status: z.ZodOptional<z.ZodNativeEnum<typeof import("../../files/entities/file.entity").FileStatus>>;
        caption: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
        createdAt: z.ZodOptional<z.ZodDate>;
        updatedAt: z.ZodOptional<z.ZodDate>;
        deletedAt: z.ZodOptional<z.ZodDefault<z.ZodNullable<z.ZodDate>>>;
        url: z.ZodOptional<z.ZodString>;
        signedUrl: z.ZodOptional<z.ZodString>;
    }, "id" | "ownerOrganization" | "updatedAt" | "createdAt">, "strip", z.ZodTypeAny, {
        status?: import("../../files/entities/file.entity").FileStatus | undefined;
        url?: string | undefined;
        deletedAt?: Date | null | undefined;
        originalFileName?: string | undefined;
        mimeType?: string | undefined;
        size?: number | undefined;
        fileType?: import("../../files/entities/file.entity").FileType | undefined;
        objectName?: string | undefined;
        caption?: string | null | undefined;
        signedUrl?: string | undefined;
    }, {
        status?: import("../../files/entities/file.entity").FileStatus | undefined;
        url?: string | undefined;
        deletedAt?: Date | null | undefined;
        originalFileName?: string | undefined;
        mimeType?: string | undefined;
        size?: number | undefined;
        fileType?: import("../../files/entities/file.entity").FileType | undefined;
        objectName?: string | undefined;
        caption?: string | null | undefined;
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
        status?: import("../../files/entities/file.entity").FileStatus | undefined;
        url?: string | undefined;
        deletedAt?: Date | null | undefined;
        originalFileName?: string | undefined;
        mimeType?: string | undefined;
        size?: number | undefined;
        fileType?: import("../../files/entities/file.entity").FileType | undefined;
        objectName?: string | undefined;
        caption?: string | null | undefined;
        signedUrl?: string | undefined;
    };
    id: string;
    channel: "WEB_APP" | "WHATSAPP" | "SYSTEM" | "EMAIL";
}, {
    data: {
        status?: import("../../files/entities/file.entity").FileStatus | undefined;
        url?: string | undefined;
        deletedAt?: Date | null | undefined;
        originalFileName?: string | undefined;
        mimeType?: string | undefined;
        size?: number | undefined;
        fileType?: import("../../files/entities/file.entity").FileType | undefined;
        objectName?: string | undefined;
        caption?: string | null | undefined;
        signedUrl?: string | undefined;
    };
    id: string;
    channel: "WEB_APP" | "WHATSAPP" | "SYSTEM" | "EMAIL";
}>;
declare const PartialUpdateFileRequestEntity_base: import("nestjs-zod").ZodDto<{
    data: {
        status?: import("../../files/entities/file.entity").FileStatus | undefined;
        url?: string | undefined;
        deletedAt?: Date | null | undefined;
        originalFileName?: string | undefined;
        mimeType?: string | undefined;
        size?: number | undefined;
        fileType?: import("../../files/entities/file.entity").FileType | undefined;
        objectName?: string | undefined;
        caption?: string | null | undefined;
        signedUrl?: string | undefined;
    };
    id: string;
    channel: "WEB_APP" | "WHATSAPP" | "SYSTEM" | "EMAIL";
}, z.ZodObjectDef<{
    id: z.ZodString;
    data: z.ZodObject<Omit<{
        id: z.ZodOptional<z.ZodString>;
        ownerOrganization: z.ZodOptional<z.ZodString>;
        originalFileName: z.ZodOptional<z.ZodString>;
        mimeType: z.ZodOptional<z.ZodString>;
        size: z.ZodOptional<z.ZodNumber>;
        fileType: z.ZodOptional<z.ZodNativeEnum<typeof import("../../files/entities/file.entity").FileType>>;
        objectName: z.ZodOptional<z.ZodString>;
        status: z.ZodOptional<z.ZodNativeEnum<typeof import("../../files/entities/file.entity").FileStatus>>;
        caption: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
        createdAt: z.ZodOptional<z.ZodDate>;
        updatedAt: z.ZodOptional<z.ZodDate>;
        deletedAt: z.ZodOptional<z.ZodDefault<z.ZodNullable<z.ZodDate>>>;
        url: z.ZodOptional<z.ZodString>;
        signedUrl: z.ZodOptional<z.ZodString>;
    }, "id" | "ownerOrganization" | "updatedAt" | "createdAt">, "strip", z.ZodTypeAny, {
        status?: import("../../files/entities/file.entity").FileStatus | undefined;
        url?: string | undefined;
        deletedAt?: Date | null | undefined;
        originalFileName?: string | undefined;
        mimeType?: string | undefined;
        size?: number | undefined;
        fileType?: import("../../files/entities/file.entity").FileType | undefined;
        objectName?: string | undefined;
        caption?: string | null | undefined;
        signedUrl?: string | undefined;
    }, {
        status?: import("../../files/entities/file.entity").FileStatus | undefined;
        url?: string | undefined;
        deletedAt?: Date | null | undefined;
        originalFileName?: string | undefined;
        mimeType?: string | undefined;
        size?: number | undefined;
        fileType?: import("../../files/entities/file.entity").FileType | undefined;
        objectName?: string | undefined;
        caption?: string | null | undefined;
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
        status?: import("../../files/entities/file.entity").FileStatus | undefined;
        url?: string | undefined;
        deletedAt?: Date | null | undefined;
        originalFileName?: string | undefined;
        mimeType?: string | undefined;
        size?: number | undefined;
        fileType?: import("../../files/entities/file.entity").FileType | undefined;
        objectName?: string | undefined;
        caption?: string | null | undefined;
        signedUrl?: string | undefined;
    };
    id: string;
    channel: "WEB_APP" | "WHATSAPP" | "SYSTEM" | "EMAIL";
}>;
export declare class PartialUpdateFileRequestEntity extends PartialUpdateFileRequestEntity_base {
    static build(input: z.input<typeof PartialUpdateFileRequestEntitySchema>): PartialUpdateFileRequestEntity;
}
export {};
