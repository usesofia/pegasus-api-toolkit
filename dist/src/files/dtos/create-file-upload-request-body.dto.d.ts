declare const CreateFileUploadRequestBodyDto_base: import("nestjs-zod").ZodDto<import("zod").ZodObject<{
    size: import("zod").ZodNumber;
    originalFileName: import("zod").ZodString;
    mimeType: import("zod").ZodString;
    fileType: import("zod").ZodEnum<typeof import("../..").FileType>;
    caption: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
    channel: import("zod").ZodEnum<{
        readonly WEB_APP: "WEB_APP";
        readonly WHATSAPP: "WHATSAPP";
        readonly SYSTEM: "SYSTEM";
        readonly EMAIL: "EMAIL";
    }>;
}, import("zod/v4/core").$strip>> & {
    io: "input";
};
export declare class CreateFileUploadRequestBodyDto extends CreateFileUploadRequestBodyDto_base {
}
export {};
