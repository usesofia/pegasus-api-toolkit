import { safeInstantiateEntity } from "@app/utils/entity.utils";
import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export default class FinancialRecordsWebsocketEvents {
  static BulkCreateExtractionForWebApp = class {

    static InvalidFileIntent = class {
      static readonly eventName = 'financial-records-bulk-create-extraction-for-web-app-invalid-file-intent';
      static readonly EventDataSchema = z.object({
        jobRequestId: z.string(),
        ordinalConfidenceScore: z.string(),
        reason: z.string(),
      });
      static EventDataEntity = class extends createZodDto(this.EventDataSchema) {
        static build(input: z.infer<typeof FinancialRecordsWebsocketEvents.BulkCreateExtractionForWebApp.InvalidFileIntent.EventDataSchema>) {
          return safeInstantiateEntity(FinancialRecordsWebsocketEvents.BulkCreateExtractionForWebApp.InvalidFileIntent.EventDataEntity, input);
        }
      }
    }

    static Failed = class {
      static readonly eventName = 'financial-records-bulk-create-extraction-for-web-app-failed';
      static readonly EventDataSchema = z.object({
        jobRequestId: z.string(),
        message: z.string(),
      });
      static EventDataEntity = class extends createZodDto(this.EventDataSchema) {
        static build(input: z.infer<typeof FinancialRecordsWebsocketEvents.BulkCreateExtractionForWebApp.Failed.EventDataSchema>) {
          return safeInstantiateEntity(FinancialRecordsWebsocketEvents.BulkCreateExtractionForWebApp.Failed.EventDataEntity, input);
        }
      }
    }

    static StartProcessing = class {
      static readonly eventName = 'financial-records-bulk-create-extraction-for-web-app-start-processing';
      static readonly EventDataSchema = z.object({
        jobRequestId: z.string(),
        nFinancialRecords: z.number(),
      });
      static EventDataEntity = class extends createZodDto(this.EventDataSchema) {
        static build(input: z.infer<typeof FinancialRecordsWebsocketEvents.BulkCreateExtractionForWebApp.StartProcessing.EventDataSchema>) {
          return safeInstantiateEntity(FinancialRecordsWebsocketEvents.BulkCreateExtractionForWebApp.StartProcessing.EventDataEntity, input);
        }
      }
    }

    static Processing = class {
      static readonly eventName = 'financial-records-bulk-create-extraction-for-web-app-processing';
      static readonly EventDataSchema = z.object({
        jobRequestId: z.string(),
        nProcessedFinancialRecords: z.number(),
        nFinancialRecords: z.number(),
      });
      static EventDataEntity = class extends createZodDto(this.EventDataSchema) {
        static build(input: z.infer<typeof FinancialRecordsWebsocketEvents.BulkCreateExtractionForWebApp.Processing.EventDataSchema>) {
          return safeInstantiateEntity(FinancialRecordsWebsocketEvents.BulkCreateExtractionForWebApp.Processing.EventDataEntity, input);
        }
      }
    }

    static Finished = class {
      static readonly eventName = 'financial-records-bulk-create-extraction-for-web-app-finished';
      static readonly EventDataSchema = z.object({
        jobRequestId: z.string(),
        nProcessedFinancialRecords: z.number(),
        nFinancialRecords: z.number(),
        csvFileSignedUrl: z.string(),
      });
      static EventDataEntity = class extends createZodDto(this.EventDataSchema) {
        static build(input: z.infer<typeof FinancialRecordsWebsocketEvents.BulkCreateExtractionForWebApp.Finished.EventDataSchema>) {
          return safeInstantiateEntity(FinancialRecordsWebsocketEvents.BulkCreateExtractionForWebApp.Finished.EventDataEntity, input);
        }
      }
    }
  }
}
