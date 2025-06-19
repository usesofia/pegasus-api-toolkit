"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationRoles = exports.ORGANIZATION_ROLES_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.ORGANIZATION_ROLES_KEY = 'organizationRoles';
const OrganizationRoles = (...roles) => (0, common_1.SetMetadata)(exports.ORGANIZATION_ROLES_KEY, roles);
exports.OrganizationRoles = OrganizationRoles;
//# sourceMappingURL=organization-roles.decorator.js.map