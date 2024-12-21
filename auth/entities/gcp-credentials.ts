import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { safeInstantiateEntity } from '../../utils/entity.utils';

const GcpCredentialsEntitySchema = z.object({
  accessToken: z.string(),
});

export class GcpCredentialsEntity extends createZodDto(
  GcpCredentialsEntitySchema,
) {
  static build(
    input: z.infer<typeof GcpCredentialsEntitySchema>,
  ): GcpCredentialsEntity {
    return safeInstantiateEntity(GcpCredentialsEntity, input);
  }
}
