import z from "zod";

export const EMAIL_SERVICE_PORT = Symbol('EmailServicePort');

export enum EmailTemplate {
  BULK_CREATE_AI_FILE_EXTRACTION_FINISHED = 'bulk-create-ai-file-extraction-finished',
  RESOURCE_EXPORT_FINISHED = 'resource-export-finished',
}

export const EmailSchema = z.discriminatedUnion("template", [
  z.object({
    template: z.literal(EmailTemplate.BULK_CREATE_AI_FILE_EXTRACTION_FINISHED),
    data: z.object({
      organizationName: z.string(),
      name: z.string(),
      fileName: z.string(),
      nFinancialRecords: z.number(),
      continueUrl: z.string(),
    }),
  }),
  z.object({
    template: z.literal(EmailTemplate.RESOURCE_EXPORT_FINISHED),
    data: z.object({
      organizationName: z.string(),
      resourceName: z.string(),
      downloadUrl: z.string(),
      filters: z.array(z.string()),
      fileType: z.enum(['csv', 'excel']),
    }),
  })
]).transform((data) => {
  return {
    ...data,
    getSubject: () => {
      switch (data.template) {
        case EmailTemplate.BULK_CREATE_AI_FILE_EXTRACTION_FINISHED:
          return `[${data.data.organizationName}] Processamento de arquivo para criação de lançamentos financeiros em lote finalizado`;
        case EmailTemplate.RESOURCE_EXPORT_FINISHED:
          return `[${data.data.organizationName}] Exportação de "${data.data.resourceName}" finalizada`;
      }
    },
  };
});

export interface EmailServicePort {
  send({
    email,
    from,
    to,
  }: {
    email: z.output<typeof EmailSchema>,
    from?: 'notificacoes@usesofia.com' | 'sofia@usesofia.com' | 'noreply@usesofia.com',
    to: string,
  }): Promise<void>;
}
