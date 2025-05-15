import { safeInstantiateEntity } from "@app/utils/entity.utils";
import { createZodDto } from "nestjs-zod";
import { z } from "zod";

// ----------------------------------------------------------------------------------------------------------
export const FINANCIAL_RECORDS_BULK_CREATE_EXTRACTION_FOR_WEB_APP_INVALID_FILE_INTENT_EVENT_NAME =
  'financial-records-bulk-create-extraction-for-web-app-invalid-file-intent';

const FinancialRecordsBulkCreateExtractionForWebAppInvalidFileIntentEventDataSchema = z.object({
  jobRequestId: z.string(),
});

export class FinancialRecordsBulkCreateExtractionForWebAppInvalidFileIntentEventDataEntity extends createZodDto(FinancialRecordsBulkCreateExtractionForWebAppInvalidFileIntentEventDataSchema) {
  static build(input: z.infer<typeof FinancialRecordsBulkCreateExtractionForWebAppInvalidFileIntentEventDataSchema>) {
    return safeInstantiateEntity(FinancialRecordsBulkCreateExtractionForWebAppInvalidFileIntentEventDataEntity, input);
  }
}
// ----------------------------------------------------------------------------------------------------------
export const FINANCIAL_RECORDS_BULK_CREATE_EXTRACTION_FOR_WEB_APP_FAILED_EVENT_NAME =
  'financial-records-bulk-create-extraction-for-web-app-failed';

const FinancialRecordsBulkCreateExtractionForWebAppFailedEventDataSchema = z.object({
  jobRequestId: z.string(),
  message: z.string(),
});

export class FinancialRecordsBulkCreateExtractionForWebAppFailedEventDataEntity extends createZodDto(FinancialRecordsBulkCreateExtractionForWebAppFailedEventDataSchema) {
  static build(input: z.infer<typeof FinancialRecordsBulkCreateExtractionForWebAppFailedEventDataSchema>) {
    return safeInstantiateEntity(FinancialRecordsBulkCreateExtractionForWebAppFailedEventDataEntity, input);
  }
}
// ----------------------------------------------------------------------------------------------------------
export const FINANCIAL_RECORDS_BULK_CREATE_EXTRACTION_FOR_WEB_APP_START_PROCESSING_EVENT_NAME =
  'financial-records-bulk-create-extraction-for-web-app-start-processing';

const FinancialRecordsBulkCreateExtractionForWebAppStartProcessingEventDataSchema = z.object({
  jobRequestId: z.string(),
  nFinancialRecords: z.number(),
});

export class FinancialRecordsBulkCreateExtractionForWebAppStartProcessingEventDataEntity extends createZodDto(FinancialRecordsBulkCreateExtractionForWebAppStartProcessingEventDataSchema) {
  static build(input: z.infer<typeof FinancialRecordsBulkCreateExtractionForWebAppStartProcessingEventDataSchema>) {
    return safeInstantiateEntity(FinancialRecordsBulkCreateExtractionForWebAppStartProcessingEventDataEntity, input);
  }
}
// ----------------------------------------------------------------------------------------------------------
export const FINANCIAL_RECORDS_BULK_CREATE_EXTRACTION_FOR_WEB_APP_PROCESSING_EVENT_NAME =
  'financial-records-bulk-create-extraction-for-web-app-processing';

const FinancialRecordsBulkCreateExtractionForWebAppProcessingEventDataSchema = z.object({
  jobRequestId: z.string(),
  nProcessedFinancialRecords: z.number(),
  nFinancialRecords: z.number(),
});

export class FinancialRecordsBulkCreateExtractionForWebAppProcessingEventDataEntity extends createZodDto(FinancialRecordsBulkCreateExtractionForWebAppProcessingEventDataSchema) {
  static build(input: z.infer<typeof FinancialRecordsBulkCreateExtractionForWebAppProcessingEventDataSchema>) {
    return safeInstantiateEntity(FinancialRecordsBulkCreateExtractionForWebAppProcessingEventDataEntity, input);
  }
}
// ----------------------------------------------------------------------------------------------------------
