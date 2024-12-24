import { OrganizationRole } from '../constants/organization-role.enum';
export declare const ORGANIZATION_ROLES_KEY = "organizationRoles";
export declare const OrganizationRoles: (...roles: OrganizationRole[]) => import("@nestjs/common").CustomDecorator<string>;
