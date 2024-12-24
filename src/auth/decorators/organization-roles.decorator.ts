import { SetMetadata } from '@nestjs/common';
import { OrganizationRole } from '../constants/organization-role.enum';

export const ORGANIZATION_ROLES_KEY = 'organizationRoles';
export const OrganizationRoles = (...roles: OrganizationRole[]) =>
  SetMetadata(ORGANIZATION_ROLES_KEY, roles);
