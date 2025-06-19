"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IgnoreAuthGuard = exports.IGNORE_AUTH_GUARD_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.IGNORE_AUTH_GUARD_KEY = 'ignoreAuthGuard';
const IgnoreAuthGuard = () => (0, common_1.SetMetadata)(exports.IGNORE_AUTH_GUARD_KEY, true);
exports.IgnoreAuthGuard = IgnoreAuthGuard;
//# sourceMappingURL=ignore-auth-guard.decorator.js.map