import { FileStatus } from '@app/files/entities/file.entity';
import { safeInstantiateEntity } from '@app/utils/entity.utils';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const FindByIdFileRequestEntitySchema = z.object({
  id: z.string(),
  populate: z.string().optional(),
  status: z.nativeEnum(FileStatus).optional(),
});

export class FindByIdFileRequestEntity extends createZodDto(FindByIdFileRequestEntitySchema) {
  static build(input: z.input<typeof FindByIdFileRequestEntitySchema>): FindByIdFileRequestEntity {
    return safeInstantiateEntity(FindByIdFileRequestEntity, input);
  }
}
