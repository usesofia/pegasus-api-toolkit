import { safeInstantiateEntity } from '@app/utils/entity.utils';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export enum FileType {
  DEFAULT = 'DEFAULT',
  FINANCIAL_RECORD = 'FINANCIAL_RECORD',
  EXPORT = 'EXPORT',
  INSTALLMENT_FINANCIAL_RECORD = 'INSTALLMENT_FINANCIAL_RECORD',
  RECURRING_FINANCIAL_RECORD = 'RECURRING_FINANCIAL_RECORD',
  OFX = 'OFX',
  EXTRACT_FINANCIAL_RECORD_FROM_FILE = 'EXTRACT_FINANCIAL_RECORD_FROM_FILE',
  EXTRACT_CONTACT_FROM_FILE = 'EXTRACT_CONTACT_FROM_FILE',
  FINANCIAL_RECORDS_BULK_CREATE = 'FINANCIAL_RECORDS_BULK_CREATE',
  CONTACTS_BULK_CREATE = 'CONTACTS_BULK_CREATE',
  FINANCIAL_RECORDS_BULK_CREATE_EXTRACTION_INPUT = 'FINANCIAL_RECORDS_BULK_CREATE_EXTRACTION_INPUT',
  FINANCIAL_RECORDS_BULK_CREATE_EXTRACTION_OUTPUT = 'FINANCIAL_RECORDS_BULK_CREATE_EXTRACTION_OUTPUT',
  CONTACTS_BULK_CREATE_EXTRACTION_INPUT = 'CONTACTS_BULK_CREATE_EXTRACTION_INPUT',
  CONTACTS_BULK_CREATE_EXTRACTION_OUTPUT = 'CONTACTS_BULK_CREATE_EXTRACTION_OUTPUT',
  SEVEN_DAYS_TEMP_FILE = 'SEVEN_DAYS_TEMP_FILE',
  WHATSAPP_MESSAGE_FILE = 'WHATSAPP_MESSAGE_FILE',
  EMAIL_FORWARDING_INTEGRATION = 'EMAIL_FORWARDING_INTEGRATION',
}

export enum FileStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  DELETED = 'DELETED',
}

export const BaseFileEntitySchema = z.object({
  id: z.string().describe('Identificador do arquivo.'),
  ownerOrganization: z.string().describe('Identificador da organização dona do arquivo.'),
  originalFileName: z.string().describe('Nome original do arquivo.'),
  mimeType: z.string().describe('Tipo MIME do arquivo.'),
  size: z.number().describe('Tamanho do arquivo em bytes.'),
  fileType: z.nativeEnum(FileType).describe('Tipo do arquivo.'),
  objectName: z.string().describe('Nome do objeto no storage.'),
  status: z.nativeEnum(FileStatus).describe('Status do arquivo.'),
  caption: z.string().nullish().describe('Legenda do arquivo.'),
  createdAt: z.coerce.date().describe('Data de criação do arquivo.'),
  updatedAt: z.coerce.date().describe('Data de atualização do arquivo.'),
  deletedAt: z.coerce.date().describe('Data de exclusão do arquivo.').nullable().default(null),
});

export const FileEntitySchema = BaseFileEntitySchema.extend({
  url: z.string().describe('URL do arquivo.'),
  signedUrl: z.string().describe('URL assinada do arquivo.'),
});

export class BaseFileEntity extends createZodDto(BaseFileEntitySchema) {
  static build(input: z.input<typeof BaseFileEntitySchema>): BaseFileEntity {
    return safeInstantiateEntity(BaseFileEntity, input);
  }
}

export class FileEntity extends createZodDto(FileEntitySchema) {
  static build(input: z.input<typeof FileEntitySchema>): FileEntity {
    return safeInstantiateEntity(FileEntity, input);
  }

  isImage(): boolean {
    return this.mimeType.startsWith('image/');
  }

  isAudio(): boolean {
    return this.mimeType.startsWith('audio/');
  }

  isDocument(): boolean {
    return this.mimeType.startsWith('application/') || this.mimeType.startsWith('text/');
  }

  isVideo(): boolean {
    return this.mimeType.startsWith('video/');
  }
}
