"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationTypes = exports.ORGANIZATION_TYPES_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.ORGANIZATION_TYPES_KEY = 'organizationTypes';
const OrganizationTypes = (...types) => (0, common_1.SetMetadata)(exports.ORGANIZATION_TYPES_KEY, types);
exports.OrganizationTypes = OrganizationTypes;
//# sourceMappingURL=organization-types.decorator.js.map