"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var GcpServiceAccountGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GCP_SERVICE_ACCOUNT_GUARD = exports.GcpServiceAccountGuard = exports.GCP_SERVICE_ACCOUNT_TOKEN_FOR_TESTS = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const google_auth_library_1 = require("google-auth-library");
const base_config_entity_1 = require("../../config/base-config.entity");
const nestjs_cls_1 = require("nestjs-cls");
const ignore_gcp_service_account_guard_decorator_1 = require("../decorators/ignore-gcp-service-account-guard.decorator");
const logger_module_1 = require("../../logger/logger.module");
const base_1 = require("../../base");
const environment_utils_1 = require("../../utils/environment.utils");
const Sentry = __importStar(require("@sentry/node"));
exports.GCP_SERVICE_ACCOUNT_TOKEN_FOR_TESTS = 'gcp-service-account-token';
let GcpServiceAccountGuard = GcpServiceAccountGuard_1 = class GcpServiceAccountGuard extends base_1.Base {
    constructor(baseConfig, logger, cls, reflector) {
        super(GcpServiceAccountGuard_1.name, baseConfig, logger, cls);
        this.baseConfig = baseConfig;
        this.logger = logger;
        this.cls = cls;
        this.reflector = reflector;
        this.client = new google_auth_library_1.OAuth2Client();
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const authorization = request.headers.authorization;
        const isIgnoreGcpServiceAccountGuard = this.reflector.get(ignore_gcp_service_account_guard_decorator_1.IGNORE_GCP_SERVICE_ACCOUNT_GUARD_KEY, context.getHandler());
        if (isIgnoreGcpServiceAccountGuard) {
            return true;
        }
        if (!authorization?.startsWith('Bearer ')) {
            throw new common_1.UnauthorizedException();
        }
        const token = authorization.split(' ')[1];
        if ((0, environment_utils_1.getEnvironment)() === environment_utils_1.Environment.INTEGRATION_TEST &&
            token === exports.GCP_SERVICE_ACCOUNT_TOKEN_FOR_TESTS) {
            return true;
        }
        try {
            const ticket = await this.client.verifyIdToken({
                idToken: token,
            });
            const payload = ticket.getPayload();
            if (!payload) {
                throw new common_1.UnauthorizedException();
            }
            if (payload.email !== this.baseConfig.gcp.credentials.client_email) {
                throw new common_1.UnauthorizedException();
            }
            Sentry.setUser({
                id: 'gcp',
                email: 'gcp@usesofia.com',
            });
            return true;
        }
        catch (error) {
            this.logWarn({
                functionName: this.canActivate.name,
                suffix: 'failedToVerifyGcpServiceAccountToken',
                data: {
                    token,
                    error,
                },
            });
            throw new common_1.UnauthorizedException();
        }
    }
};
exports.GcpServiceAccountGuard = GcpServiceAccountGuard;
exports.GcpServiceAccountGuard = GcpServiceAccountGuard = GcpServiceAccountGuard_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(base_config_entity_1.BASE_CONFIG)),
    __param(1, (0, common_1.Inject)(logger_module_1.LOGGER_SERVICE_PORT)),
    __metadata("design:paramtypes", [base_config_entity_1.BaseConfigEntity, Object, nestjs_cls_1.ClsService,
        core_1.Reflector])
], GcpServiceAccountGuard);
exports.GCP_SERVICE_ACCOUNT_GUARD = Symbol('GcpServiceAccountGuard');
//# sourceMappingURL=gcp-service-account.guard.js.map