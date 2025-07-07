import { FileEntitySchema } from '@app/files/entities/file.entity';
import { channel } from '@app/utils/channel.utils';
import { safeInstantiateEntity } from '@app/utils/entity.utils';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateFileUploadRequestDataEntitySchema = FileEntitySchema.omit({
  id: true,
  ownerOrganization: true,
  createdAt: true,
  updatedAt: true,
  status: true,
  objectName: true,
  url: true,
  signedUrl: true,
});

const CreateFileUploadRequestEntitySchema = z.object({
  data: CreateFileUploadRequestDataEntitySchema,
  channel,
});

export class CreateFileUploadRequestEntity extends createZodDto(CreateFileUploadRequestEntitySchema) {
  static build(input: z.input<typeof CreateFileUploadRequestEntitySchema>): CreateFileUploadRequestEntity {
    return safeInstantiateEntity(CreateFileUploadRequestEntity, input);
  }
}
