import z from "zod";
export declare const EMAIL_SERVICE_PORT: unique symbol;
export declare enum EmailTemplate {
    BULK_CREATE_AI_FILE_EXTRACTION_FINISHED = "bulk-create-ai-file-extraction-finished",
    RESOURCE_EXPORT_FINISHED = "resource-export-finished"
}
export declare const EmailSchema: z.ZodPipe<z.ZodDiscriminatedUnion<[z.ZodObject<{
    template: z.ZodLiteral<EmailTemplate.BULK_CREATE_AI_FILE_EXTRACTION_FINISHED>;
    data: z.ZodObject<{
        organizationName: z.ZodString;
        name: z.ZodString;
        fileName: z.ZodString;
        nFinancialRecords: z.ZodNumber;
        continueUrl: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    template: z.ZodLiteral<EmailTemplate.RESOURCE_EXPORT_FINISHED>;
    data: z.ZodObject<{
        organizationName: z.ZodString;
        resourceName: z.ZodString;
        downloadUrl: z.ZodString;
        filters: z.ZodArray<z.ZodString>;
        fileType: z.ZodEnum<{
            csv: "csv";
            excel: "excel";
        }>;
    }, z.core.$strip>;
}, z.core.$strip>], "template">, z.ZodTransform<{
    getSubject: () => string;
    template: EmailTemplate.BULK_CREATE_AI_FILE_EXTRACTION_FINISHED;
    data: {
        organizationName: string;
        name: string;
        fileName: string;
        nFinancialRecords: number;
        continueUrl: string;
    };
} | {
    getSubject: () => string;
    template: EmailTemplate.RESOURCE_EXPORT_FINISHED;
    data: {
        organizationName: string;
        resourceName: string;
        downloadUrl: string;
        filters: string[];
        fileType: "csv" | "excel";
    };
}, {
    template: EmailTemplate.BULK_CREATE_AI_FILE_EXTRACTION_FINISHED;
    data: {
        organizationName: string;
        name: string;
        fileName: string;
        nFinancialRecords: number;
        continueUrl: string;
    };
} | {
    template: EmailTemplate.RESOURCE_EXPORT_FINISHED;
    data: {
        organizationName: string;
        resourceName: string;
        downloadUrl: string;
        filters: string[];
        fileType: "csv" | "excel";
    };
}>>;
export interface EmailServicePort {
    send({ email, from, to, }: {
        email: z.output<typeof EmailSchema>;
        from?: 'notificacoes@usesofia.com' | 'sofia@usesofia.com' | 'noreply@usesofia.com';
        to: string;
    }): Promise<void>;
}
