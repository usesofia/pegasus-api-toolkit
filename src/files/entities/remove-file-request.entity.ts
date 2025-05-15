import { channel } from '@app/utils/channel.utils';
import { safeInstantiateEntity } from '@app/utils/entity.utils';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const RemoveFileRequestEntitySchema = z.object({
  id: z.string(),
  channel,
});

export class RemoveFileRequestEntity extends createZodDto(RemoveFileRequestEntitySchema) {
  static build(input: z.input<typeof RemoveFileRequestEntitySchema>): RemoveFileRequestEntity {
    return safeInstantiateEntity(RemoveFileRequestEntity, input);
  }
}
