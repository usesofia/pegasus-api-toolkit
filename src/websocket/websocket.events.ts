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
