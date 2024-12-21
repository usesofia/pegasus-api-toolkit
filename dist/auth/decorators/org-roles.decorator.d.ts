import { OrgRole } from '../constants/org-role.enum';
export declare const ORG_ROLES_KEY = "orgRoles";
export declare const OrgRoles: (...roles: OrgRole[]) => import("@nestjs/common").CustomDecorator<string>;
