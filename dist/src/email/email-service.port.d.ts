import z from "zod";
export declare const EMAIL_SERVICE_PORT: unique symbol;
export declare enum EmailTemplate {
    BULK_CREATE_AI_FILE_EXTRACTION_FINISHED = "bulk-create-ai-file-extraction-finished",
    RESOURCE_EXPORT_FINISHED = "resource-export-finished"
}
export declare const EmailSchema: z.ZodEffects<z.ZodDiscriminatedUnion<"template", [z.ZodObject<{
    template: z.ZodLiteral<EmailTemplate.BULK_CREATE_AI_FILE_EXTRACTION_FINISHED>;
    data: z.ZodObject<{
        organizationName: z.ZodString;
        name: z.ZodString;
        fileName: z.ZodString;
        nFinancialRecords: z.ZodNumber;
        continueUrl: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        organizationName: string;
        fileName: string;
        nFinancialRecords: number;
        continueUrl: string;
    }, {
        name: string;
        organizationName: string;
        fileName: string;
        nFinancialRecords: number;
        continueUrl: string;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        name: string;
        organizationName: string;
        fileName: string;
        nFinancialRecords: number;
        continueUrl: string;
    };
    template: EmailTemplate.BULK_CREATE_AI_FILE_EXTRACTION_FINISHED;
}, {
    data: {
        name: string;
        organizationName: string;
        fileName: string;
        nFinancialRecords: number;
        continueUrl: string;
    };
    template: EmailTemplate.BULK_CREATE_AI_FILE_EXTRACTION_FINISHED;
}>, z.ZodObject<{
    template: z.ZodLiteral<EmailTemplate.RESOURCE_EXPORT_FINISHED>;
    data: z.ZodObject<{
        organizationName: z.ZodString;
        resourceName: z.ZodString;
        downloadUrl: z.ZodString;
        filters: z.ZodArray<z.ZodString, "many">;
        fileType: z.ZodEnum<["csv", "excel"]>;
    }, "strip", z.ZodTypeAny, {
        fileType: "csv" | "excel";
        organizationName: string;
        resourceName: string;
        downloadUrl: string;
        filters: string[];
    }, {
        fileType: "csv" | "excel";
        organizationName: string;
        resourceName: string;
        downloadUrl: string;
        filters: string[];
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        fileType: "csv" | "excel";
        organizationName: string;
        resourceName: string;
        downloadUrl: string;
        filters: string[];
    };
    template: EmailTemplate.RESOURCE_EXPORT_FINISHED;
}, {
    data: {
        fileType: "csv" | "excel";
        organizationName: string;
        resourceName: string;
        downloadUrl: string;
        filters: string[];
    };
    template: EmailTemplate.RESOURCE_EXPORT_FINISHED;
}>]>, {
    getSubject: () => string;
    data: {
        name: string;
        organizationName: string;
        fileName: string;
        nFinancialRecords: number;
        continueUrl: string;
    };
    template: EmailTemplate.BULK_CREATE_AI_FILE_EXTRACTION_FINISHED;
} | {
    getSubject: () => string;
    data: {
        fileType: "csv" | "excel";
        organizationName: string;
        resourceName: string;
        downloadUrl: string;
        filters: string[];
    };
    template: EmailTemplate.RESOURCE_EXPORT_FINISHED;
}, {
    data: {
        name: string;
        organizationName: string;
        fileName: string;
        nFinancialRecords: number;
        continueUrl: string;
    };
    template: EmailTemplate.BULK_CREATE_AI_FILE_EXTRACTION_FINISHED;
} | {
    data: {
        fileType: "csv" | "excel";
        organizationName: string;
        resourceName: string;
        downloadUrl: string;
        filters: string[];
    };
    template: EmailTemplate.RESOURCE_EXPORT_FINISHED;
}>;
export interface EmailServicePort {
    send({ email, from, to, }: {
        email: z.output<typeof EmailSchema>;
        from?: 'notificacoes@usesofia.com' | 'sofia@usesofia.com' | 'noreply@usesofia.com';
        to: string;
    }): Promise<void>;
}
