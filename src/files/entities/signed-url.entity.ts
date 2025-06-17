import { safeInstantiateEntity } from '@app/utils/entity.utils';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const SignedUrlEntitySchema = z.object({
  url: z.string(),
  signedUrl: z.string(),
});

export class SignedUrlEntity extends createZodDto(SignedUrlEntitySchema) {
  static build(input: z.input<typeof SignedUrlEntitySchema>): SignedUrlEntity {
    return safeInstantiateEntity(SignedUrlEntity, input);
  }
}
