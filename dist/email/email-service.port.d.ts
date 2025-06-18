import z from "zod";
export declare const EMAIL_SERVICE_PORT: unique symbol;
export declare enum EmailTemplate {
    BULK_CREATE_AI_FILE_EXTRACTION_FINISHED = "bulk-create-ai-file-extraction-finished"
}
export declare const EmailSchema: z.ZodEffects<z.ZodDiscriminatedUnion<"template", [z.ZodObject<{
    template: z.ZodLiteral<EmailTemplate>;
    data: z.ZodObject<{
        name: z.ZodString;
        fileName: z.ZodString;
        nFinancialRecords: z.ZodNumber;
        continueUrl: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        fileName: string;
        nFinancialRecords: number;
        continueUrl: string;
    }, {
        name: string;
        fileName: string;
        nFinancialRecords: number;
        continueUrl: string;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        name: string;
        fileName: string;
        nFinancialRecords: number;
        continueUrl: string;
    };
    template: EmailTemplate;
}, {
    data: {
        name: string;
        fileName: string;
        nFinancialRecords: number;
        continueUrl: string;
    };
    template: EmailTemplate;
}>]>, {
    getSubject: () => "[Lançamentos financeiros] Processamento de arquivo finalizado!";
    data: {
        name: string;
        fileName: string;
        nFinancialRecords: number;
        continueUrl: string;
    };
    template: EmailTemplate;
}, {
    data: {
        name: string;
        fileName: string;
        nFinancialRecords: number;
        continueUrl: string;
    };
    template: EmailTemplate;
}>;
export interface EmailServicePort {
    send({ email, to, }: {
        email: z.output<typeof EmailSchema>;
        to: string;
    }): Promise<void>;
}
