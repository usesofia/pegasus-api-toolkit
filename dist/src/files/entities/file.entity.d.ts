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
    WHATSAPP_MESSAGE_FILE = "WHATSAPP_MESSAGE_FILE"
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
    fileType: z.ZodNativeEnum<typeof FileType>;
    objectName: z.ZodString;
    status: z.ZodNativeEnum<typeof FileStatus>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    deletedAt: z.ZodDefault<z.ZodNullable<z.ZodDate>>;
}, "strip", z.ZodTypeAny, {
    status: FileStatus;
    id: string;
    size: number;
    ownerOrganization: string;
    deletedAt: Date | null;
    updatedAt: Date;
    originalFileName: string;
    mimeType: string;
    fileType: FileType;
    objectName: string;
    createdAt: Date;
}, {
    status: FileStatus;
    id: string;
    size: number;
    ownerOrganization: string;
    updatedAt: Date;
    originalFileName: string;
    mimeType: string;
    fileType: FileType;
    objectName: string;
    createdAt: Date;
    deletedAt?: Date | null | undefined;
}>;
export declare const FileEntitySchema: z.ZodObject<{
    id: z.ZodString;
    ownerOrganization: z.ZodString;
    originalFileName: z.ZodString;
    mimeType: z.ZodString;
    size: z.ZodNumber;
    fileType: z.ZodNativeEnum<typeof FileType>;
    objectName: z.ZodString;
    status: z.ZodNativeEnum<typeof FileStatus>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    deletedAt: z.ZodDefault<z.ZodNullable<z.ZodDate>>;
} & {
    url: z.ZodString;
    signedUrl: z.ZodString;
}, "strip", z.ZodTypeAny, {
    status: FileStatus;
    url: string;
    id: string;
    size: number;
    ownerOrganization: string;
    deletedAt: Date | null;
    updatedAt: Date;
    originalFileName: string;
    mimeType: string;
    fileType: FileType;
    objectName: string;
    createdAt: Date;
    signedUrl: string;
}, {
    status: FileStatus;
    url: string;
    id: string;
    size: number;
    ownerOrganization: string;
    updatedAt: Date;
    originalFileName: string;
    mimeType: string;
    fileType: FileType;
    objectName: string;
    createdAt: Date;
    signedUrl: string;
    deletedAt?: Date | null | undefined;
}>;
declare const BaseFileEntity_base: import("nestjs-zod").ZodDto<{
    status: FileStatus;
    id: string;
    size: number;
    ownerOrganization: string;
    deletedAt: Date | null;
    updatedAt: Date;
    originalFileName: string;
    mimeType: string;
    fileType: FileType;
    objectName: string;
    createdAt: Date;
}, z.ZodObjectDef<{
    id: z.ZodString;
    ownerOrganization: z.ZodString;
    originalFileName: z.ZodString;
    mimeType: z.ZodString;
    size: z.ZodNumber;
    fileType: z.ZodNativeEnum<typeof FileType>;
    objectName: z.ZodString;
    status: z.ZodNativeEnum<typeof FileStatus>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    deletedAt: z.ZodDefault<z.ZodNullable<z.ZodDate>>;
}, "strip", z.ZodTypeAny>, {
    status: FileStatus;
    id: string;
    size: number;
    ownerOrganization: string;
    updatedAt: Date;
    originalFileName: string;
    mimeType: string;
    fileType: FileType;
    objectName: string;
    createdAt: Date;
    deletedAt?: Date | null | undefined;
}>;
export declare class BaseFileEntity extends BaseFileEntity_base {
    static build(input: z.input<typeof BaseFileEntitySchema>): BaseFileEntity;
}
declare const FileEntity_base: import("nestjs-zod").ZodDto<{
    status: FileStatus;
    url: string;
    id: string;
    size: number;
    ownerOrganization: string;
    deletedAt: Date | null;
    updatedAt: Date;
    originalFileName: string;
    mimeType: string;
    fileType: FileType;
    objectName: string;
    createdAt: Date;
    signedUrl: string;
}, z.ZodObjectDef<{
    id: z.ZodString;
    ownerOrganization: z.ZodString;
    originalFileName: z.ZodString;
    mimeType: z.ZodString;
    size: z.ZodNumber;
    fileType: z.ZodNativeEnum<typeof FileType>;
    objectName: z.ZodString;
    status: z.ZodNativeEnum<typeof FileStatus>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    deletedAt: z.ZodDefault<z.ZodNullable<z.ZodDate>>;
} & {
    url: z.ZodString;
    signedUrl: z.ZodString;
}, "strip", z.ZodTypeAny>, {
    status: FileStatus;
    url: string;
    id: string;
    size: number;
    ownerOrganization: string;
    updatedAt: Date;
    originalFileName: string;
    mimeType: string;
    fileType: FileType;
    objectName: string;
    createdAt: Date;
    signedUrl: string;
    deletedAt?: Date | null | undefined;
}>;
export declare class FileEntity extends FileEntity_base {
    static build(input: z.input<typeof FileEntitySchema>): FileEntity;
}
export {};
