"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const common_1 = require("@nestjs/common");
const admin_guard_1 = require("../guards/admin.guard");
const Admin = () => (0, common_1.UseGuards)(admin_guard_1.AdminGuard);
exports.Admin = Admin;
//# sourceMappingURL=admin.decorator.js.map