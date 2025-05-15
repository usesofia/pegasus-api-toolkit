"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinancialRecordsBulkCreateExtractionForWebAppInvalidFileIntentEventDataEntity = exports.FINANCIAL_RECORDS_BULK_CREATE_EXTRACTION_FOR_WEB_APP_INVALID_FILE_INTENT_EVENT_NAME = void 0;
const nestjs_zod_1 = require("nestjs-zod");
const zod_1 = require("zod");
exports.FINANCIAL_RECORDS_BULK_CREATE_EXTRACTION_FOR_WEB_APP_INVALID_FILE_INTENT_EVENT_NAME = 'financial-records-bulk-create-extraction-for-web-app-invalid-file-intent';
const FinancialRecordsBulkCreateExtractionForWebAppInvalidFileIntentEventDataSchema = zod_1.z.object({
    jobRequestId: zod_1.z.string(),
});
class FinancialRecordsBulkCreateExtractionForWebAppInvalidFileIntentEventDataEntity extends (0, nestjs_zod_1.createZodDto)(FinancialRecordsBulkCreateExtractionForWebAppInvalidFileIntentEventDataSchema) {
}
exports.FinancialRecordsBulkCreateExtractionForWebAppInvalidFileIntentEventDataEntity = FinancialRecordsBulkCreateExtractionForWebAppInvalidFileIntentEventDataEntity;
//# sourceMappingURL=websocket.events.js.map