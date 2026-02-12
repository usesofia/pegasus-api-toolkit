import { z } from 'zod';
export declare enum FileType {
    DEFAULT = "DEFAULT",
    FINANCIAL_RECORD = "FINANCIAL_RECORD",
    EXPORT = "EXPORT",
    INSTALLMENT_FINANCIAL_RECORD = "INSTALLMENT_FINANCIAL_RECORD",
    RECURRING_FINANCIAL_RECORD = "RECURRING_FINANCIAL_RECORD",
    OFX = "OFX",
    EXTRACT_FINANCIAL_RECORD_FROM_FILE = "EXTRACT_FINANCIAL_RECORD_FROM_FILE",
    EXTRACT_CONTACT_FROM_FILE = "EXTRACT_CONTACT_FROM_FILE",
    FINANCIAL_RECORDS_BULK_CREATE = "FINANCIAL_RECORDS_BULK_CREATE",
    CONTACTS_BULK_CREATE = "CONTACTS_BULK_CREATE",
    FINANCIAL_RECORDS_BULK_CREATE_EXTRACTION_INPUT = "FINANCIAL_RECORDS_BULK_CREATE_EXTRACTION_INPUT",
    FINANCIAL_RECORDS_BULK_CREATE_EXTRACTION_OUTPUT = "FINANCIAL_RECORDS_BULK_CREATE_EXTRACTION_OUTPUT",
    CONTACTS_BULK_CREATE_EXTRACTION_INPUT = "CONTACTS_BULK_CREATE_EXTRACTION_INPUT",
    CONTACTS_BULK_CREATE_EXTRACTION_OUTPUT = "CONTACTS_BULK_CREATE_EXTRACTION_OUTPUT",
    SEVEN_DAYS_TEMP_FILE = "SEVEN_DAYS_TEMP_FILE",
    WHATSAPP_MESSAGE_FILE = "WHATSAPP_MESSAGE_FILE",
    EMAIL_FORWARDING_INTEGRATION = "EMAIL_FORWARDING_INTEGRATION"
}
export declare enum FileStatus {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED",
    DELETED = "DELETED"
}
export declare const BaseFileEntitySchema: z.ZodObject<{
    id: z.ZodString;
    ownerOrganization: z.ZodString;
    originalFileName: z.ZodString;
    mimeType: z.ZodString;
    size: z.ZodNumber;
    fileType: z.ZodEnum<typeof FileType>;
    objectName: z.ZodString;
    status: z.ZodEnum<typeof FileStatus>;
    caption: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    createdAt: z.ZodCoercedDate<unknown>;
    updatedAt: z.ZodCoercedDate<unknown>;
    deletedAt: z.ZodDefault<z.ZodNullable<z.ZodCoercedDate<unknown>>>;
}, z.core.$strip>;
export declare const FileEntitySchema: z.ZodObject<{
    id: z.ZodString;
    ownerOrganization: z.ZodString;
    originalFileName: z.ZodString;
    mimeType: z.ZodString;
    size: z.ZodNumber;
    fileType: z.ZodEnum<typeof FileType>;
    objectName: z.ZodString;
    status: z.ZodEnum<typeof FileStatus>;
    caption: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    createdAt: z.ZodCoercedDate<unknown>;
    updatedAt: z.ZodCoercedDate<unknown>;
    deletedAt: z.ZodDefault<z.ZodNullable<z.ZodCoercedDate<unknown>>>;
    url: z.ZodString;
    signedUrl: z.ZodString;
}, z.core.$strip>;
declare const BaseFileEntity_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    id: z.ZodString;
    ownerOrganization: z.ZodString;
    originalFileName: z.ZodString;
    mimeType: z.ZodString;
    size: z.ZodNumber;
    fileType: z.ZodEnum<typeof FileType>;
    objectName: z.ZodString;
    status: z.ZodEnum<typeof FileStatus>;
    caption: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    createdAt: z.ZodCoercedDate<unknown>;
    updatedAt: z.ZodCoercedDate<unknown>;
    deletedAt: z.ZodDefault<z.ZodNullable<z.ZodCoercedDate<unknown>>>;
}, z.core.$strip>, false>;
export declare class BaseFileEntity extends BaseFileEntity_base {
    static build(input: z.input<typeof BaseFileEntitySchema>): BaseFileEntity;
}
declare const FileEntity_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    id: z.ZodString;
    ownerOrganization: z.ZodString;
    originalFileName: z.ZodString;
    mimeType: z.ZodString;
    size: z.ZodNumber;
    fileType: z.ZodEnum<typeof FileType>;
    objectName: z.ZodString;
    status: z.ZodEnum<typeof FileStatus>;
    caption: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    createdAt: z.ZodCoercedDate<unknown>;
    updatedAt: z.ZodCoercedDate<unknown>;
    deletedAt: z.ZodDefault<z.ZodNullable<z.ZodCoercedDate<unknown>>>;
    url: z.ZodString;
    signedUrl: z.ZodString;
}, z.core.$strip>, false>;
export declare class FileEntity extends FileEntity_base {
    static build(input: z.input<typeof FileEntitySchema>): FileEntity;
    isImage(): boolean;
    isAudio(): boolean;
    isDocument(): boolean;
    isVideo(): boolean;
}
export {};
