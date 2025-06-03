import { FileStatus } from '../../files/entities/file.entity';
import { z } from 'zod';
declare const ConfirmFileUploadRequestBodyDto_base: import("nestjs-zod").ZodDto<{
    status: FileStatus.COMPLETED | FileStatus.FAILED;
    id: string;
    deletedAt: Date | null;
    channel: "WEB_APP" | "WHATSAPP" | "SYSTEM" | "EMAIL";
    signedUrl?: string | undefined;
}, z.ZodObjectDef<z.objectUtil.extendShape<Omit<{
    id: z.ZodString;
    ownerOrganization: z.ZodString;
    originalFileName: z.ZodString;
    mimeType: z.ZodString;
    size: z.ZodNumber;
    fileType: z.ZodNativeEnum<typeof import("../../files/entities/file.entity").FileType>;
    objectName: z.ZodString;
    status: z.ZodNativeEnum<typeof FileStatus>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    deletedAt: z.ZodDefault<z.ZodNullable<z.ZodDate>>;
    signedUrl: z.ZodOptional<z.ZodString>;
}, "size" | "ownerOrganization" | "updatedAt" | "originalFileName" | "mimeType" | "fileType" | "objectName" | "createdAt">, {
    status: z.ZodEnum<[FileStatus.FAILED, FileStatus.COMPLETED]>;
    channel: z.ZodNativeEnum<{
        readonly WEB_APP: "WEB_APP";
        readonly WHATSAPP: "WHATSAPP";
        readonly SYSTEM: "SYSTEM";
        readonly EMAIL: "EMAIL";
    }>;
}>, "strip", z.ZodTypeAny>, {
    status: FileStatus.COMPLETED | FileStatus.FAILED;
    id: string;
    channel: "WEB_APP" | "WHATSAPP" | "SYSTEM" | "EMAIL";
    deletedAt?: Date | null | undefined;
    signedUrl?: string | undefined;
}>;
export declare class ConfirmFileUploadRequestBodyDto extends ConfirmFileUploadRequestBodyDto_base {
}
export {};
