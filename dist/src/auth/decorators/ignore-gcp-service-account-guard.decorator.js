"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IgnoreGcpServiceAccountGuard = exports.IGNORE_GCP_SERVICE_ACCOUNT_GUARD_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.IGNORE_GCP_SERVICE_ACCOUNT_GUARD_KEY = 'ignoreGcpServiceAccountGuard';
const IgnoreGcpServiceAccountGuard = () => (0, common_1.SetMetadata)(exports.IGNORE_GCP_SERVICE_ACCOUNT_GUARD_KEY, true);
exports.IgnoreGcpServiceAccountGuard = IgnoreGcpServiceAccountGuard;
//# sourceMappingURL=ignore-gcp-service-account-guard.decorator.js.map