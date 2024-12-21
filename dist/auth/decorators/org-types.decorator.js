"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrgTypes = exports.ORG_TYPES_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.ORG_TYPES_KEY = 'orgTypes';
const OrgTypes = (...types) => (0, common_1.SetMetadata)(exports.ORG_TYPES_KEY, types);
exports.OrgTypes = OrgTypes;
//# sourceMappingURL=org-types.decorator.js.map