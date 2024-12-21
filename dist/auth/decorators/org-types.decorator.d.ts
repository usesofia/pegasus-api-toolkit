import { OrgType } from '../constants/org-type.enum';
export declare const ORG_TYPES_KEY = "orgTypes";
export declare const OrgTypes: (...types: OrgType[]) => import("@nestjs/common").CustomDecorator<string>;
