import { z } from "zod";
export declare const FINANCIAL_RECORDS_BULK_CREATE_EXTRACTION_FOR_WEB_APP_INVALID_FILE_INTENT_EVENT_NAME = "financial-records-bulk-create-extraction-for-web-app-invalid-file-intent";
declare const FinancialRecordsBulkCreateExtractionForWebAppInvalidFileIntentEventDataEntity_base: import("nestjs-zod").ZodDto<{
    jobRequestId: string;
}, z.ZodObjectDef<{
    jobRequestId: z.ZodString;
}, "strip", z.ZodTypeAny>, {
    jobRequestId: string;
}>;
export declare class FinancialRecordsBulkCreateExtractionForWebAppInvalidFileIntentEventDataEntity extends FinancialRecordsBulkCreateExtractionForWebAppInvalidFileIntentEventDataEntity_base {
}
export {};
