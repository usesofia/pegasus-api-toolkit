declare const CreateFileUploadRequestBodyDto_base: import("nestjs-zod").ZodDto<{
    size: number;
    originalFileName: string;
    mimeType: string;
    fileType: import("../..").FileType;
    channel: "WEB_APP" | "WHATSAPP" | "SYSTEM" | "EMAIL";
    caption?: string | null | undefined;
}, import("zod").ZodObjectDef<Omit<Omit<{
    id: import("zod").ZodString;
    ownerOrganization: import("zod").ZodString;
    originalFileName: import("zod").ZodString;
    mimeType: import("zod").ZodString;
    size: import("zod").ZodNumber;
    fileType: import("zod").ZodNativeEnum<typeof import("../..").FileType>;
    objectName: import("zod").ZodString;
    status: import("zod").ZodNativeEnum<typeof import("../..").FileStatus>;
    caption: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
    createdAt: import("zod").ZodDate;
    updatedAt: import("zod").ZodDate;
    deletedAt: import("zod").ZodDefault<import("zod").ZodNullable<import("zod").ZodDate>>;
} & {
    url: import("zod").ZodString;
    signedUrl: import("zod").ZodString;
}, "status" | "url" | "id" | "ownerOrganization" | "updatedAt" | "objectName" | "createdAt" | "signedUrl"> & {
    channel: import("zod").ZodNativeEnum<{
        readonly WEB_APP: "WEB_APP";
        readonly WHATSAPP: "WHATSAPP";
        readonly SYSTEM: "SYSTEM";
        readonly EMAIL: "EMAIL";
    }>;
}, "deletedAt">, "strip", import("zod").ZodTypeAny>, {
    size: number;
    originalFileName: string;
    mimeType: string;
    fileType: import("../..").FileType;
    channel: "WEB_APP" | "WHATSAPP" | "SYSTEM" | "EMAIL";
    caption?: string | null | undefined;
}>;
export declare class CreateFileUploadRequestBodyDto extends CreateFileUploadRequestBodyDto_base {
}
export {};
