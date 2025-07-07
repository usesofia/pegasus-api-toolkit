import { FileStatus } from '../../files/entities/file.entity';
import { z } from 'zod';
declare const ConfirmFileUploadRequestBodyDto_base: import("nestjs-zod").ZodDto<{
    status: FileStatus.COMPLETED | FileStatus.FAILED;
    url: string;
    id: string;
    deletedAt: Date | null;
    signedUrl: string;
    channel: "WEB_APP" | "WHATSAPP" | "SYSTEM" | "EMAIL";
}, z.ZodObjectDef<{
    url: z.ZodString;
    id: z.ZodString;
    deletedAt: z.ZodDefault<z.ZodNullable<z.ZodDate>>;
    signedUrl: z.ZodString;
} & {
    status: z.ZodEnum<[FileStatus.FAILED, FileStatus.COMPLETED]>;
    channel: z.ZodNativeEnum<{
        readonly WEB_APP: "WEB_APP";
        readonly WHATSAPP: "WHATSAPP";
        readonly SYSTEM: "SYSTEM";
        readonly EMAIL: "EMAIL";
    }>;
}, "strip", z.ZodTypeAny>, {
    status: FileStatus.COMPLETED | FileStatus.FAILED;
    url: string;
    id: string;
    signedUrl: string;
    channel: "WEB_APP" | "WHATSAPP" | "SYSTEM" | "EMAIL";
    deletedAt?: Date | null | undefined;
}>;
export declare class ConfirmFileUploadRequestBodyDto extends ConfirmFileUploadRequestBodyDto_base {
}
export {};
