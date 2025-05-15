import { FileEntitySchema } from '@app/files/entities/file.entity';
import { channel } from '@app/utils/channel.utils';
import { safeInstantiateEntity } from '@app/utils/entity.utils';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const PartialUpdateFileRequestDataSchema = FileEntitySchema.partial().omit({
  id: true,
  ownerOrganization: true,
  createdAt: true,
  updatedAt: true,
});

const PartialUpdateFileRequestEntitySchema = z.object({
  id: z.string(),
  data: PartialUpdateFileRequestDataSchema,
  channel,
});

export class PartialUpdateFileRequestEntity extends createZodDto(PartialUpdateFileRequestEntitySchema) {
  static build(input: z.input<typeof PartialUpdateFileRequestEntitySchema>): PartialUpdateFileRequestEntity {
    return safeInstantiateEntity(PartialUpdateFileRequestEntity, input);
  }
}
