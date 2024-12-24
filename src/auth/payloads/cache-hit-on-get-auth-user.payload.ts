import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { safeInstantiateEntity } from '../../utils/entity.utils';

const CacheHitOnGetAuthUserPayloadSchema = z.object({
  userId: z.string(),
  organizationId: z.string(),
  organizationRole: z.string(),
});

export class CacheHitOnGetAuthUserPayload extends createZodDto(
  CacheHitOnGetAuthUserPayloadSchema,
) {
  static build(
    input: z.infer<typeof CacheHitOnGetAuthUserPayloadSchema>,
  ): CacheHitOnGetAuthUserPayload {
    return safeInstantiateEntity(CacheHitOnGetAuthUserPayload, input);
  }
}
