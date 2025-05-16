import { z } from "zod";
export default class FinancialRecordsWebsocketEvents {
    static BulkCreateExtractionForWebApp: {
        new (): {};
        InvalidFileIntent: {
            new (): {};
            readonly eventName: "financial-records-bulk-create-extraction-for-web-app-invalid-file-intent";
            readonly EventDataSchema: z.ZodObject<{
                jobRequestId: z.ZodString;
                ordinalConfidenceScore: z.ZodString;
                reason: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                jobRequestId: string;
                reason: string;
                ordinalConfidenceScore: string;
            }, {
                jobRequestId: string;
                reason: string;
                ordinalConfidenceScore: string;
            }>;
            EventDataEntity: {
                new (): {
                    jobRequestId: string;
                    reason: string;
                    ordinalConfidenceScore: string;
                };
                build(input: z.infer<typeof FinancialRecordsWebsocketEvents.BulkCreateExtractionForWebApp.InvalidFileIntent.EventDataSchema>): {
                    jobRequestId: string;
                    reason: string;
                    ordinalConfidenceScore: string;
                };
                isZodDto: true;
                schema: z.ZodType<{
                    jobRequestId: string;
                    reason: string;
                    ordinalConfidenceScore: string;
                }, z.ZodObjectDef<{
                    jobRequestId: z.ZodString;
                    ordinalConfidenceScore: z.ZodString;
                    reason: z.ZodString;
                }, "strip", z.ZodTypeAny>, {
                    jobRequestId: string;
                    reason: string;
                    ordinalConfidenceScore: string;
                }>;
                create(input: unknown): {
                    jobRequestId: string;
                    reason: string;
                    ordinalConfidenceScore: string;
                };
            };
        };
        Failed: {
            new (): {};
            readonly eventName: "financial-records-bulk-create-extraction-for-web-app-failed";
            readonly EventDataSchema: z.ZodObject<{
                jobRequestId: z.ZodString;
                message: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                message: string;
                jobRequestId: string;
            }, {
                message: string;
                jobRequestId: string;
            }>;
            EventDataEntity: {
                new (): {
                    message: string;
                    jobRequestId: string;
                };
                build(input: z.infer<typeof FinancialRecordsWebsocketEvents.BulkCreateExtractionForWebApp.Failed.EventDataSchema>): {
                    message: string;
                    jobRequestId: string;
                };
                isZodDto: true;
                schema: z.ZodType<{
                    message: string;
                    jobRequestId: string;
                }, z.ZodObjectDef<{
                    jobRequestId: z.ZodString;
                    message: z.ZodString;
                }, "strip", z.ZodTypeAny>, {
                    message: string;
                    jobRequestId: string;
                }>;
                create(input: unknown): {
                    message: string;
                    jobRequestId: string;
                };
            };
        };
        StartProcessing: {
            new (): {};
            readonly eventName: "financial-records-bulk-create-extraction-for-web-app-start-processing";
            readonly EventDataSchema: z.ZodObject<{
                jobRequestId: z.ZodString;
                nFinancialRecords: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                jobRequestId: string;
                nFinancialRecords: number;
            }, {
                jobRequestId: string;
                nFinancialRecords: number;
            }>;
            EventDataEntity: {
                new (): {
                    jobRequestId: string;
                    nFinancialRecords: number;
                };
                build(input: z.infer<typeof FinancialRecordsWebsocketEvents.BulkCreateExtractionForWebApp.StartProcessing.EventDataSchema>): {
                    jobRequestId: string;
                    nFinancialRecords: number;
                };
                isZodDto: true;
                schema: z.ZodType<{
                    jobRequestId: string;
                    nFinancialRecords: number;
                }, z.ZodObjectDef<{
                    jobRequestId: z.ZodString;
                    nFinancialRecords: z.ZodNumber;
                }, "strip", z.ZodTypeAny>, {
                    jobRequestId: string;
                    nFinancialRecords: number;
                }>;
                create(input: unknown): {
                    jobRequestId: string;
                    nFinancialRecords: number;
                };
            };
        };
        Processing: {
            new (): {};
            readonly eventName: "financial-records-bulk-create-extraction-for-web-app-processing";
            readonly EventDataSchema: z.ZodObject<{
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
            EventDataEntity: {
                new (): {
                    jobRequestId: string;
                    nFinancialRecords: number;
                    nProcessedFinancialRecords: number;
                };
                build(input: z.infer<typeof FinancialRecordsWebsocketEvents.BulkCreateExtractionForWebApp.Processing.EventDataSchema>): {
                    jobRequestId: string;
                    nFinancialRecords: number;
                    nProcessedFinancialRecords: number;
                };
                isZodDto: true;
                schema: z.ZodType<{
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
                create(input: unknown): {
                    jobRequestId: string;
                    nFinancialRecords: number;
                    nProcessedFinancialRecords: number;
                };
            };
        };
        Finished: {
            new (): {};
            readonly eventName: "financial-records-bulk-create-extraction-for-web-app-finished";
            readonly EventDataSchema: z.ZodObject<{
                jobRequestId: z.ZodString;
                nProcessedFinancialRecords: z.ZodNumber;
                nFinancialRecords: z.ZodNumber;
                csvFileSignedUrl: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                jobRequestId: string;
                nFinancialRecords: number;
                nProcessedFinancialRecords: number;
                csvFileSignedUrl: string;
            }, {
                jobRequestId: string;
                nFinancialRecords: number;
                nProcessedFinancialRecords: number;
                csvFileSignedUrl: string;
            }>;
            EventDataEntity: {
                new (): {
                    jobRequestId: string;
                    nFinancialRecords: number;
                    nProcessedFinancialRecords: number;
                    csvFileSignedUrl: string;
                };
                build(input: z.infer<typeof FinancialRecordsWebsocketEvents.BulkCreateExtractionForWebApp.Finished.EventDataSchema>): {
                    jobRequestId: string;
                    nFinancialRecords: number;
                    nProcessedFinancialRecords: number;
                    csvFileSignedUrl: string;
                };
                isZodDto: true;
                schema: z.ZodType<{
                    jobRequestId: string;
                    nFinancialRecords: number;
                    nProcessedFinancialRecords: number;
                    csvFileSignedUrl: string;
                }, z.ZodObjectDef<{
                    jobRequestId: z.ZodString;
                    nProcessedFinancialRecords: z.ZodNumber;
                    nFinancialRecords: z.ZodNumber;
                    csvFileSignedUrl: z.ZodString;
                }, "strip", z.ZodTypeAny>, {
                    jobRequestId: string;
                    nFinancialRecords: number;
                    nProcessedFinancialRecords: number;
                    csvFileSignedUrl: string;
                }>;
                create(input: unknown): {
                    jobRequestId: string;
                    nFinancialRecords: number;
                    nProcessedFinancialRecords: number;
                    csvFileSignedUrl: string;
                };
            };
        };
    };
}
