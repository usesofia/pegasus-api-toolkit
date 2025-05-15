declare const CreateFileUploadRequestBodyDto_base: import("nestjs-zod").ZodDto<{
    size: number;
    originalFileName: string;
    mimeType: string;
    fileType: import("../entities/file.entity").FileType;
    channel: "WEB_APP" | "WHATSAPP" | "SYSTEM";
    signedUrl?: string | undefined;
}, import("zod").ZodObjectDef<Omit<import("zod").objectUtil.extendShape<Omit<{
    id: import("zod").ZodString;
    ownerOrganization: import("zod").ZodString;
    originalFileName: import("zod").ZodString;
    mimeType: import("zod").ZodString;
    size: import("zod").ZodNumber;
    fileType: import("zod").ZodNativeEnum<typeof import("../entities/file.entity").FileType>;
    objectName: import("zod").ZodString;
    status: import("zod").ZodNativeEnum<typeof import("../entities/file.entity").FileStatus>;
    createdAt: import("zod").ZodDate;
    updatedAt: import("zod").ZodDate;
    deletedAt: import("zod").ZodDefault<import("zod").ZodNullable<import("zod").ZodDate>>;
    signedUrl: import("zod").ZodOptional<import("zod").ZodString>;
}, "status" | "id" | "ownerOrganization" | "updatedAt" | "objectName" | "createdAt">, {
    channel: import("zod").ZodNativeEnum<{
        readonly WEB_APP: "WEB_APP";
        readonly WHATSAPP: "WHATSAPP";
        readonly SYSTEM: "SYSTEM";
    }>;
}>, "deletedAt">, "strip", import("zod").ZodTypeAny>, {
    size: number;
    originalFileName: string;
    mimeType: string;
    fileType: import("../entities/file.entity").FileType;
    channel: "WEB_APP" | "WHATSAPP" | "SYSTEM";
    signedUrl?: string | undefined;
}>;
export declare class CreateFileUploadRequestBodyDto extends CreateFileUploadRequestBodyDto_base {
}
export {};
