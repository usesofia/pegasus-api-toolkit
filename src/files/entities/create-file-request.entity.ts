import { FileEntitySchema } from '@app/files/entities/file.entity';
import { channel } from '@app/utils/channel.utils';
import { safeInstantiateEntity } from '@app/utils/entity.utils';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const CreateFileRequestDataEntitySchema = FileEntitySchema.omit({
  id: true,
  ownerOrganization: true,
  createdAt: true,
  updatedAt: true,
  url: true,
  signedUrl: true,
});

const CreateFileRequestEntitySchema = z.object({
  data: CreateFileRequestDataEntitySchema,
  populate: z.string().optional(),
  channel,
});

export class CreateFileRequestEntity extends createZodDto(CreateFileRequestEntitySchema) {
  static build(input: z.input<typeof CreateFileRequestEntitySchema>): CreateFileRequestEntity {
    return safeInstantiateEntity(CreateFileRequestEntity, input);
  }
}
