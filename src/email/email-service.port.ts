import z from "zod";

export const EMAIL_SERVICE_PORT = Symbol('EmailServicePort');

export enum EmailTemplate {
  BULK_CREATE_AI_FILE_EXTRACTION_FINISHED = 'bulk-create-ai-file-extraction-finished',
}

export const EmailSchema = z.discriminatedUnion("template", [
  z.object({
    template: z.literal(EmailTemplate.BULK_CREATE_AI_FILE_EXTRACTION_FINISHED),
    data: z.object({
      name: z.string(),
      fileName: z.string(),
      nFinancialRecords: z.number(),
      continueUrl: z.string(),
    }),
  })
]).transform((data) => {
  return {
    ...data,
    getSubject: () => {
      switch (data.template) {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        case EmailTemplate.BULK_CREATE_AI_FILE_EXTRACTION_FINISHED:
          return `Processamento de arquivo para criação de lançamentos financeiros em lote finalizado!`;
      }
    },
  };
});

export interface EmailServicePort {
  send({
    email,
    to,
  }: {
    email: z.output<typeof EmailSchema>,
    to: string,
  }): Promise<void>;
}
