import { z } from 'zod';
export declare enum FileType {
    DEFAULT = "DEFAULT",
    FINANCIAL_RECORD = "FINANCIAL_RECORD",
    EXPORT = "EXPORT",
    INSTALLMENT_FINANCIAL_RECORD = "INSTALLMENT_FINANCIAL_RECORD",
    RECURRING_FINANCIAL_RECORD = "RECURRING_FINANCIAL_RECORD"
}
export declare enum FileStatus {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED",
    DELETED = "DELETED"
}
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
    signedUrl: z.ZodOptional<z.ZodString>;
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
    signedUrl?: string | undefined;
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
    signedUrl?: string | undefined;
}>;
declare const FileEntity_base: import("nestjs-zod").ZodDto<{
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
    signedUrl?: string | undefined;
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
    signedUrl: z.ZodOptional<z.ZodString>;
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
    signedUrl?: string | undefined;
}>;
export declare class FileEntity extends FileEntity_base {
    static build(input: z.input<typeof FileEntitySchema>): FileEntity;
}
export {};
