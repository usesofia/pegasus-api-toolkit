import { FileEntitySchema } from '@app/files/entities/file.entity';
import { channel } from '@app/utils/channel.utils';
import { safeInstantiateEntity } from '@app/utils/entity.utils';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const ConfirmFileUploadRequestDataEntitySchema = FileEntitySchema.omit({
  ownerOrganization: true,
  createdAt: true,
  updatedAt: true,
  fileType: true,
  mimeType: true,
  originalFileName: true,
  size: true,
  objectName: true,
  url: true,
  signedUrl: true,
});

const ConfirmFileUploadRequestEntitySchema = z.object({
  data: ConfirmFileUploadRequestDataEntitySchema,
  channel,
});

export class ConfirmFileUploadRequestEntity extends createZodDto(ConfirmFileUploadRequestEntitySchema) {
  static build(input: z.input<typeof ConfirmFileUploadRequestEntitySchema>): ConfirmFileUploadRequestEntity {
    return safeInstantiateEntity(ConfirmFileUploadRequestEntity, input);
  }
}
