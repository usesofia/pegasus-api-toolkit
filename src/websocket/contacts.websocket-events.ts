import { safeInstantiateEntity } from "@app/utils/entity.utils";
import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export default class ContactsWebsocketEvents {
  static BulkCreateExtractionForWebApp = class {

    static InvalidFileIntent = class {
      static readonly eventName = 'contacts-bulk-create-extraction-for-web-app-invalid-file-intent';
      static readonly EventDataSchema = z.object({
        jobRequestId: z.string(),
        ordinalConfidenceScore: z.string(),
        reason: z.string(),
      });
      static EventDataEntity = class extends createZodDto(this.EventDataSchema) {
        static build(input: z.infer<typeof ContactsWebsocketEvents.BulkCreateExtractionForWebApp.InvalidFileIntent.EventDataSchema>) {
          return safeInstantiateEntity(ContactsWebsocketEvents.BulkCreateExtractionForWebApp.InvalidFileIntent.EventDataEntity, input);
        }
      }
    }

    static Failed = class {
      static readonly eventName = 'contacts-bulk-create-extraction-for-web-app-failed';
      static readonly EventDataSchema = z.object({
        jobRequestId: z.string(),
        message: z.string(),
      });
      static EventDataEntity = class extends createZodDto(this.EventDataSchema) {
        static build(input: z.infer<typeof ContactsWebsocketEvents.BulkCreateExtractionForWebApp.Failed.EventDataSchema>) {
          return safeInstantiateEntity(ContactsWebsocketEvents.BulkCreateExtractionForWebApp.Failed.EventDataEntity, input);
        }
      }
    }

    static StartProcessing = class {
      static readonly eventName = 'contacts-bulk-create-extraction-for-web-app-start-processing';
      static readonly EventDataSchema = z.object({
        jobRequestId: z.string(),
        nContacts: z.number(),
      });
      static EventDataEntity = class extends createZodDto(this.EventDataSchema) {
        static build(input: z.infer<typeof ContactsWebsocketEvents.BulkCreateExtractionForWebApp.StartProcessing.EventDataSchema>) {
          return safeInstantiateEntity(ContactsWebsocketEvents.BulkCreateExtractionForWebApp.StartProcessing.EventDataEntity, input);
        }
      }
    }

    static Processing = class {
      static readonly eventName = 'contacts-bulk-create-extraction-for-web-app-processing';
      static readonly EventDataSchema = z.object({
        jobRequestId: z.string(),
        nProcessedContacts: z.number(),
        nContacts: z.number(),
      });
      static EventDataEntity = class extends createZodDto(this.EventDataSchema) {
        static build(input: z.infer<typeof ContactsWebsocketEvents.BulkCreateExtractionForWebApp.Processing.EventDataSchema>) {
          return safeInstantiateEntity(ContactsWebsocketEvents.BulkCreateExtractionForWebApp.Processing.EventDataEntity, input);
        }
      }
    }

    static Finished = class {
      static readonly eventName = 'contacts-bulk-create-extraction-for-web-app-finished';
      static readonly EventDataSchema = z.object({
        jobRequestId: z.string(),
        nProcessedContacts: z.number(),
        nContacts: z.number(),
        csvFileSignedUrl: z.string(),
      });
      static EventDataEntity = class extends createZodDto(this.EventDataSchema) {
        static build(input: z.infer<typeof ContactsWebsocketEvents.BulkCreateExtractionForWebApp.Finished.EventDataSchema>) {
          return safeInstantiateEntity(ContactsWebsocketEvents.BulkCreateExtractionForWebApp.Finished.EventDataEntity, input);
        }
      }
    }
  }
}
