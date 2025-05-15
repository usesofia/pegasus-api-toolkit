"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinancialRecordsBulkCreateExtractionForWebAppFinishedEventDataEntity = exports.FINANCIAL_RECORDS_BULK_CREATE_EXTRACTION_FOR_WEB_APP_FINISHED_EVENT_NAME = exports.FinancialRecordsBulkCreateExtractionForWebAppProcessingEventDataEntity = exports.FINANCIAL_RECORDS_BULK_CREATE_EXTRACTION_FOR_WEB_APP_PROCESSING_EVENT_NAME = exports.FinancialRecordsBulkCreateExtractionForWebAppStartProcessingEventDataEntity = exports.FINANCIAL_RECORDS_BULK_CREATE_EXTRACTION_FOR_WEB_APP_START_PROCESSING_EVENT_NAME = exports.FinancialRecordsBulkCreateExtractionForWebAppFailedEventDataEntity = exports.FINANCIAL_RECORDS_BULK_CREATE_EXTRACTION_FOR_WEB_APP_FAILED_EVENT_NAME = exports.FinancialRecordsBulkCreateExtractionForWebAppInvalidFileIntentEventDataEntity = exports.FINANCIAL_RECORDS_BULK_CREATE_EXTRACTION_FOR_WEB_APP_INVALID_FILE_INTENT_EVENT_NAME = void 0;
const entity_utils_1 = require("../utils/entity.utils");
const nestjs_zod_1 = require("nestjs-zod");
const zod_1 = require("zod");
exports.FINANCIAL_RECORDS_BULK_CREATE_EXTRACTION_FOR_WEB_APP_INVALID_FILE_INTENT_EVENT_NAME = 'financial-records-bulk-create-extraction-for-web-app-invalid-file-intent';
const FinancialRecordsBulkCreateExtractionForWebAppInvalidFileIntentEventDataSchema = zod_1.z.object({
    jobRequestId: zod_1.z.string(),
});
class FinancialRecordsBulkCreateExtractionForWebAppInvalidFileIntentEventDataEntity extends (0, nestjs_zod_1.createZodDto)(FinancialRecordsBulkCreateExtractionForWebAppInvalidFileIntentEventDataSchema) {
    static build(input) {
        return (0, entity_utils_1.safeInstantiateEntity)(FinancialRecordsBulkCreateExtractionForWebAppInvalidFileIntentEventDataEntity, input);
    }
}
exports.FinancialRecordsBulkCreateExtractionForWebAppInvalidFileIntentEventDataEntity = FinancialRecordsBulkCreateExtractionForWebAppInvalidFileIntentEventDataEntity;
exports.FINANCIAL_RECORDS_BULK_CREATE_EXTRACTION_FOR_WEB_APP_FAILED_EVENT_NAME = 'financial-records-bulk-create-extraction-for-web-app-failed';
const FinancialRecordsBulkCreateExtractionForWebAppFailedEventDataSchema = zod_1.z.object({
    jobRequestId: zod_1.z.string(),
    message: zod_1.z.string(),
});
class FinancialRecordsBulkCreateExtractionForWebAppFailedEventDataEntity extends (0, nestjs_zod_1.createZodDto)(FinancialRecordsBulkCreateExtractionForWebAppFailedEventDataSchema) {
    static build(input) {
        return (0, entity_utils_1.safeInstantiateEntity)(FinancialRecordsBulkCreateExtractionForWebAppFailedEventDataEntity, input);
    }
}
exports.FinancialRecordsBulkCreateExtractionForWebAppFailedEventDataEntity = FinancialRecordsBulkCreateExtractionForWebAppFailedEventDataEntity;
exports.FINANCIAL_RECORDS_BULK_CREATE_EXTRACTION_FOR_WEB_APP_START_PROCESSING_EVENT_NAME = 'financial-records-bulk-create-extraction-for-web-app-start-processing';
const FinancialRecordsBulkCreateExtractionForWebAppStartProcessingEventDataSchema = zod_1.z.object({
    jobRequestId: zod_1.z.string(),
    nFinancialRecords: zod_1.z.number(),
});
class FinancialRecordsBulkCreateExtractionForWebAppStartProcessingEventDataEntity extends (0, nestjs_zod_1.createZodDto)(FinancialRecordsBulkCreateExtractionForWebAppStartProcessingEventDataSchema) {
    static build(input) {
        return (0, entity_utils_1.safeInstantiateEntity)(FinancialRecordsBulkCreateExtractionForWebAppStartProcessingEventDataEntity, input);
    }
}
exports.FinancialRecordsBulkCreateExtractionForWebAppStartProcessingEventDataEntity = FinancialRecordsBulkCreateExtractionForWebAppStartProcessingEventDataEntity;
exports.FINANCIAL_RECORDS_BULK_CREATE_EXTRACTION_FOR_WEB_APP_PROCESSING_EVENT_NAME = 'financial-records-bulk-create-extraction-for-web-app-processing';
const FinancialRecordsBulkCreateExtractionForWebAppProcessingEventDataSchema = zod_1.z.object({
    jobRequestId: zod_1.z.string(),
    nProcessedFinancialRecords: zod_1.z.number(),
    nFinancialRecords: zod_1.z.number(),
});
class FinancialRecordsBulkCreateExtractionForWebAppProcessingEventDataEntity extends (0, nestjs_zod_1.createZodDto)(FinancialRecordsBulkCreateExtractionForWebAppProcessingEventDataSchema) {
    static build(input) {
        return (0, entity_utils_1.safeInstantiateEntity)(FinancialRecordsBulkCreateExtractionForWebAppProcessingEventDataEntity, input);
    }
}
exports.FinancialRecordsBulkCreateExtractionForWebAppProcessingEventDataEntity = FinancialRecordsBulkCreateExtractionForWebAppProcessingEventDataEntity;
exports.FINANCIAL_RECORDS_BULK_CREATE_EXTRACTION_FOR_WEB_APP_FINISHED_EVENT_NAME = 'financial-records-bulk-create-extraction-for-web-app-finished';
const FinancialRecordsBulkCreateExtractionForWebAppFinishedEventDataSchema = zod_1.z.object({
    jobRequestId: zod_1.z.string(),
    nProcessedFinancialRecords: zod_1.z.number(),
    nFinancialRecords: zod_1.z.number(),
    csvFileSignedUrl: zod_1.z.string(),
});
class FinancialRecordsBulkCreateExtractionForWebAppFinishedEventDataEntity extends (0, nestjs_zod_1.createZodDto)(FinancialRecordsBulkCreateExtractionForWebAppFinishedEventDataSchema) {
    static build(input) {
        return (0, entity_utils_1.safeInstantiateEntity)(FinancialRecordsBulkCreateExtractionForWebAppFinishedEventDataEntity, input);
    }
}
exports.FinancialRecordsBulkCreateExtractionForWebAppFinishedEventDataEntity = FinancialRecordsBulkCreateExtractionForWebAppFinishedEventDataEntity;
//# sourceMappingURL=websocket.events.js.map