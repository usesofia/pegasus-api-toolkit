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
  FINANCIAL_RECORDS_BULK_CREATE_EXTRACTION = 'FINANCIAL_RECORDS_BULK_CREATE_EXTRACTION',
  CONTACTS_BULK_CREATE_EXTRACTION = 'CONTACTS_BULK_CREATE_EXTRACTION',
  SEVEN_DAYS_TEMP_FILE = 'SEVEN_DAYS_TEMP_FILE',
}

export enum FileStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  DELETED = 'DELETED',
}

export const FileEntitySchema = z.object({
  id: z.string().describe('Identificador do arquivo.'),
  ownerOrganization: z.string().describe('Identificador da organização dona do arquivo.'),
  originalFileName: z.string().describe('Nome original do arquivo.'),
  mimeType: z.string().describe('Tipo MIME do arquivo.'),
  size: z.number().describe('Tamanho do arquivo em bytes.'),
  fileType: z.nativeEnum(FileType).describe('Tipo do arquivo.'),
  objectName: z.string().describe('Nome do objeto no storage.'),
  status: z.nativeEnum(FileStatus).describe('Status do arquivo.'),
  createdAt: z.coerce.date().describe('Data de criação do arquivo.'),
  updatedAt: z.coerce.date().describe('Data de atualização do arquivo.'),
  deletedAt: z.coerce.date().describe('Data de exclusão do arquivo.').nullable().default(null),
  signedUrl: z.string().describe('URL assinada do arquivo.').optional(),
});

export class FileEntity extends createZodDto(FileEntitySchema) {
  static build(input: z.input<typeof FileEntitySchema>): FileEntity {
    return safeInstantiateEntity(FileEntity, input);
  }
}
