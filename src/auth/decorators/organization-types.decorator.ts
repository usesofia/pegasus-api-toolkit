import { SetMetadata } from '@nestjs/common';
import { OrganizationType } from '../constants/organization-type.enum';

export const ORGANIZATION_TYPES_KEY = 'organizationTypes';
export const OrganizationTypes = (...types: OrganizationType[]) =>
  SetMetadata(ORGANIZATION_TYPES_KEY, types);
