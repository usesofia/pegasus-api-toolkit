import { OrganizationType } from '../constants/organization-type.enum';
export declare const ORGANIZATION_TYPES_KEY = "organizationTypes";
export declare const OrganizationTypes: (...types: OrganizationType[]) => import("@nestjs/common").CustomDecorator<string>;
