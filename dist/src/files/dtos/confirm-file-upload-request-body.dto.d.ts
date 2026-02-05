import { FileStatus } from '@app/files/entities/file.entity';
import { z } from 'zod';
declare const ConfirmFileUploadRequestBodyDto_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    id: z.ZodString;
    deletedAt: z.ZodDefault<z.ZodNullable<z.ZodCoercedDate<unknown>>>;
    caption: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    size: z.ZodOptional<z.ZodNumber>;
    status: z.ZodEnum<{
        COMPLETED: FileStatus.COMPLETED;
        FAILED: FileStatus.FAILED;
    }>;
    channel: z.ZodEnum<{
        readonly WEB_APP: "WEB_APP";
        readonly WHATSAPP: "WHATSAPP";
        readonly SYSTEM: "SYSTEM";
        readonly EMAIL: "EMAIL";
    }>;
}, z.core.$strip>> & {
    io: "input";
};
export declare class ConfirmFileUploadRequestBodyDto extends ConfirmFileUploadRequestBodyDto_base {
}
export {};
