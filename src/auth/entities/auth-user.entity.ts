import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { OrganizationRole } from '@app/auth/constants/organization-role.enum';
import { OrganizationType } from '@app/auth/constants/organization-type.enum';
import { safeInstantiateEntity } from '@app/utils/entity.utils';
import { BaseConfigEntity } from '@app/config/base-config.entity';

export const OrganizationSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.nativeEnum(OrganizationRole),
  type: z.nativeEnum(OrganizationType),
  parent: z
    .object({
      id: z.string(),
      name: z.string(),
      sharedContacts: z.boolean(),
      sharedSubcategories: z.boolean(),
      sharedTags: z.boolean(),
    })
    .nullish(),
  children: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
      }),
    )
    .nullish(),
});

export class OrganizationEntity extends createZodDto(OrganizationSchema) {
  static build(input: z.input<typeof OrganizationSchema>): OrganizationEntity {
    return safeInstantiateEntity(OrganizationEntity, input);
  }
}

export const AuthUserEntitySchema = z.object({
  id: z.string(),
  primaryEmail: z.string().email(),
  primaryPhoneNumber: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  organization: OrganizationSchema.nullish(),
});

export class AuthUserEntity extends createZodDto(AuthUserEntitySchema) {
  static build(input: z.input<typeof AuthUserEntitySchema>): AuthUserEntity {
    return safeInstantiateEntity(AuthUserEntity, input);
  }

  static buildFromGcpServiceAccount(config: BaseConfigEntity): AuthUserEntity {
    return this.build({
      id: config.gcp.credentials.client_email,
      primaryEmail: config.gcp.credentials.client_email,
      primaryPhoneNumber: '+5511999999999',
      firstName: 'GCP',
      lastName: 'Service Account',
      organization: {
        id: 'system',
        name: 'System',
        role: OrganizationRole.ADMIN,
        type: OrganizationType.LEAF,
      },
    });
  }

  getOrganizationOrThrow(): OrganizationEntity {
    if (!this.organization) {
      throw new Error('Organization not defined for the auth user.');
    }
    return OrganizationEntity.build(this.organization);
  }

  toSystem(): AuthUserEntity {
    return AuthUserEntity.build({
      ...this,
      id: 'system',
      primaryEmail: 'system@usesofia.com',
      primaryPhoneNumber: '+5511999999999',
      firstName: 'System',
      lastName: 'Requester',
      organization: this.organization,
    });
  }
}
