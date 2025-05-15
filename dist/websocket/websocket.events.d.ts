import { z } from "zod";
export declare const FINANCIAL_RECORDS_BULK_CREATE_EXTRACTION_FOR_WEB_APP_INVALID_FILE_INTENT_EVENT_NAME = "financial-records-bulk-create-extraction-for-web-app-invalid-file-intent";
declare const FinancialRecordsBulkCreateExtractionForWebAppInvalidFileIntentEventDataSchema: z.ZodObject<{
    jobRequestId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    jobRequestId: string;
}, {
    jobRequestId: string;
}>;
declare const FinancialRecordsBulkCreateExtractionForWebAppInvalidFileIntentEventDataEntity_base: import("nestjs-zod").ZodDto<{
    jobRequestId: string;
}, z.ZodObjectDef<{
    jobRequestId: z.ZodString;
}, "strip", z.ZodTypeAny>, {
    jobRequestId: string;
}>;
export declare class FinancialRecordsBulkCreateExtractionForWebAppInvalidFileIntentEventDataEntity extends FinancialRecordsBulkCreateExtractionForWebAppInvalidFileIntentEventDataEntity_base {
    static build(input: z.infer<typeof FinancialRecordsBulkCreateExtractionForWebAppInvalidFileIntentEventDataSchema>): FinancialRecordsBulkCreateExtractionForWebAppInvalidFileIntentEventDataEntity;
}
export declare const FINANCIAL_RECORDS_BULK_CREATE_EXTRACTION_FOR_WEB_APP_FAILED_EVENT_NAME = "financial-records-bulk-create-extraction-for-web-app-failed";
declare const FinancialRecordsBulkCreateExtractionForWebAppFailedEventDataSchema: z.ZodObject<{
    jobRequestId: z.ZodString;
    message: z.ZodString;
}, "strip", z.ZodTypeAny, {
    message: string;
    jobRequestId: string;
}, {
    message: string;
    jobRequestId: string;
}>;
declare const FinancialRecordsBulkCreateExtractionForWebAppFailedEventDataEntity_base: import("nestjs-zod").ZodDto<{
    message: string;
    jobRequestId: string;
}, z.ZodObjectDef<{
    jobRequestId: z.ZodString;
    message: z.ZodString;
}, "strip", z.ZodTypeAny>, {
    message: string;
    jobRequestId: string;
}>;
export declare class FinancialRecordsBulkCreateExtractionForWebAppFailedEventDataEntity extends FinancialRecordsBulkCreateExtractionForWebAppFailedEventDataEntity_base {
    static build(input: z.infer<typeof FinancialRecordsBulkCreateExtractionForWebAppFailedEventDataSchema>): FinancialRecordsBulkCreateExtractionForWebAppFailedEventDataEntity;
}
export declare const FINANCIAL_RECORDS_BULK_CREATE_EXTRACTION_FOR_WEB_APP_START_PROCESSING_EVENT_NAME = "financial-records-bulk-create-extraction-for-web-app-start-processing";
declare const FinancialRecordsBulkCreateExtractionForWebAppStartProcessingEventDataSchema: z.ZodObject<{
    jobRequestId: z.ZodString;
    nFinancialRecords: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    jobRequestId: string;
    nFinancialRecords: number;
}, {
    jobRequestId: string;
    nFinancialRecords: number;
}>;
declare const FinancialRecordsBulkCreateExtractionForWebAppStartProcessingEventDataEntity_base: import("nestjs-zod").ZodDto<{
    jobRequestId: string;
    nFinancialRecords: number;
}, z.ZodObjectDef<{
    jobRequestId: z.ZodString;
    nFinancialRecords: z.ZodNumber;
}, "strip", z.ZodTypeAny>, {
    jobRequestId: string;
    nFinancialRecords: number;
}>;
export declare class FinancialRecordsBulkCreateExtractionForWebAppStartProcessingEventDataEntity extends FinancialRecordsBulkCreateExtractionForWebAppStartProcessingEventDataEntity_base {
    static build(input: z.infer<typeof FinancialRecordsBulkCreateExtractionForWebAppStartProcessingEventDataSchema>): FinancialRecordsBulkCreateExtractionForWebAppStartProcessingEventDataEntity;
}
export declare const FINANCIAL_RECORDS_BULK_CREATE_EXTRACTION_FOR_WEB_APP_PROCESSING_EVENT_NAME = "financial-records-bulk-create-extraction-for-web-app-processing";
declare const FinancialRecordsBulkCreateExtractionForWebAppProcessingEventDataSchema: z.ZodObject<{
    jobRequestId: z.ZodString;
    nProcessedFinancialRecords: z.ZodNumber;
    nFinancialRecords: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    jobRequestId: string;
    nFinancialRecords: number;
    nProcessedFinancialRecords: number;
}, {
    jobRequestId: string;
    nFinancialRecords: number;
    nProcessedFinancialRecords: number;
}>;
declare const FinancialRecordsBulkCreateExtractionForWebAppProcessingEventDataEntity_base: import("nestjs-zod").ZodDto<{
    jobRequestId: string;
    nFinancialRecords: number;
    nProcessedFinancialRecords: number;
}, z.ZodObjectDef<{
    jobRequestId: z.ZodString;
    nProcessedFinancialRecords: z.ZodNumber;
    nFinancialRecords: z.ZodNumber;
}, "strip", z.ZodTypeAny>, {
    jobRequestId: string;
    nFinancialRecords: number;
    nProcessedFinancialRecords: number;
}>;
export declare class FinancialRecordsBulkCreateExtractionForWebAppProcessingEventDataEntity extends FinancialRecordsBulkCreateExtractionForWebAppProcessingEventDataEntity_base {
    static build(input: z.infer<typeof FinancialRecordsBulkCreateExtractionForWebAppProcessingEventDataSchema>): FinancialRecordsBulkCreateExtractionForWebAppProcessingEventDataEntity;
}
export {};
