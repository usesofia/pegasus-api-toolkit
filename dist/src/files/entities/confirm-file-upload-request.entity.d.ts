import { z } from 'zod';
export declare const ConfirmFileUploadRequestDataEntitySchema: z.ZodObject<{
    status: z.ZodNativeEnum<typeof import("../../files/entities/file.entity").FileStatus>;
    id: z.ZodString;
    deletedAt: z.ZodDefault<z.ZodNullable<z.ZodDate>>;
    caption: z.ZodOptional<z.ZodNullable<z.ZodString>>;
} & {
    size: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    status: import("../../files/entities/file.entity").FileStatus;
    id: string;
    deletedAt: Date | null;
    size?: number | undefined;
    caption?: string | null | undefined;
}, {
    status: import("../../files/entities/file.entity").FileStatus;
    id: string;
    size?: number | undefined;
    deletedAt?: Date | null | undefined;
    caption?: string | null | undefined;
}>;
declare const ConfirmFileUploadRequestEntitySchema: z.ZodObject<{
    data: z.ZodObject<{
        status: z.ZodNativeEnum<typeof import("../../files/entities/file.entity").FileStatus>;
        id: z.ZodString;
        deletedAt: z.ZodDefault<z.ZodNullable<z.ZodDate>>;
        caption: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    } & {
        size: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        status: import("../../files/entities/file.entity").FileStatus;
        id: string;
        deletedAt: Date | null;
        size?: number | undefined;
        caption?: string | null | undefined;
    }, {
        status: import("../../files/entities/file.entity").FileStatus;
        id: string;
        size?: number | undefined;
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
        status: import("../../files/entities/file.entity").FileStatus;
        id: string;
        deletedAt: Date | null;
        size?: number | undefined;
        caption?: string | null | undefined;
    };
    channel: "WEB_APP" | "WHATSAPP" | "SYSTEM" | "EMAIL";
}, {
    data: {
        status: import("../../files/entities/file.entity").FileStatus;
        id: string;
        size?: number | undefined;
        deletedAt?: Date | null | undefined;
        caption?: string | null | undefined;
    };
    channel: "WEB_APP" | "WHATSAPP" | "SYSTEM" | "EMAIL";
}>;
declare const ConfirmFileUploadRequestEntity_base: import("nestjs-zod").ZodDto<{
    data: {
        status: import("../../files/entities/file.entity").FileStatus;
        id: string;
        deletedAt: Date | null;
        size?: number | undefined;
        caption?: string | null | undefined;
    };
    channel: "WEB_APP" | "WHATSAPP" | "SYSTEM" | "EMAIL";
}, z.ZodObjectDef<{
    data: z.ZodObject<{
        status: z.ZodNativeEnum<typeof import("../../files/entities/file.entity").FileStatus>;
        id: z.ZodString;
        deletedAt: z.ZodDefault<z.ZodNullable<z.ZodDate>>;
        caption: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    } & {
        size: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        status: import("../../files/entities/file.entity").FileStatus;
        id: string;
        deletedAt: Date | null;
        size?: number | undefined;
        caption?: string | null | undefined;
    }, {
        status: import("../../files/entities/file.entity").FileStatus;
        id: string;
        size?: number | undefined;
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
        status: import("../../files/entities/file.entity").FileStatus;
        id: string;
        size?: number | undefined;
        deletedAt?: Date | null | undefined;
        caption?: string | null | undefined;
    };
    channel: "WEB_APP" | "WHATSAPP" | "SYSTEM" | "EMAIL";
}>;
export declare class ConfirmFileUploadRequestEntity extends ConfirmFileUploadRequestEntity_base {
    static build(input: z.input<typeof ConfirmFileUploadRequestEntitySchema>): ConfirmFileUploadRequestEntity;
}
export {};
