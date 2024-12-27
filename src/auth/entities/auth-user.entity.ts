import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { OrganizationRole } from '../constants/organization-role.enum';
import { OrganizationType } from '../constants/organization-type.enum';
import { safeInstantiateEntity } from '../../utils/entity.utils';

export const AuthUserEntitySchema = z.object({
  id: z.string(),
  primaryEmail: z.string().email(),
  primaryPhoneNumber: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  organization: z.object({
    id: z.string(),
    name: z.string(),
    role: z.nativeEnum(OrganizationRole),
    type: z.nativeEnum(OrganizationType),
    parent: z.object({
      id: z.string(),
      name: z.string(),
      sharedContacts: z.boolean(),
    }).nullish(),
    children: z.array(z.object({
      id: z.string(),
      name: z.string(),
    })).nullish(),
  }),
});

export class AuthUserEntity extends createZodDto(AuthUserEntitySchema) {
  static build(input: z.infer<typeof AuthUserEntitySchema>): AuthUserEntity {
    return safeInstantiateEntity(AuthUserEntity, input);
  }
}
