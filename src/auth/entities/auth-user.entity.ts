import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { OrgRole } from '../constants/org-role.enum';
import { OrgType } from '../constants/org-type.enum';
import { safeInstantiateEntity } from '../../utils/entity.utils';

export const AuthUserEntitySchema = z.object({
  id: z.string(),
  primaryEmail: z.string().email(),
  primaryPhoneNumber: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  org: z.string(),
  orgRole: z.nativeEnum(OrgRole),
  orgType: z.nativeEnum(OrgType),
});

export class AuthUserEntity extends createZodDto(AuthUserEntitySchema) {
  static build(input: z.infer<typeof AuthUserEntitySchema>): AuthUserEntity {
    return safeInstantiateEntity(AuthUserEntity, input);
  }
}
