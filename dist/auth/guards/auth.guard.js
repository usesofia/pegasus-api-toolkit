"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AuthGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const auth_service_port_1 = require("../ports/auth-service.port");
const core_1 = require("@nestjs/core");
const base_config_entity_1 = require("../../config/base-config.entity");
const nestjs_cls_1 = require("nestjs-cls");
const ignore_auth_guard_decorator_1 = require("../decorators/ignore-auth-guard.decorator");
const base_1 = require("../../base");
const logger_module_1 = require("../../logger/logger.module");
let AuthGuard = AuthGuard_1 = class AuthGuard extends base_1.Base {
    constructor(baseConfig, logger, cls, reflector, authService) {
        super(AuthGuard_1.name, baseConfig, logger, cls);
        this.baseConfig = baseConfig;
        this.logger = logger;
        this.cls = cls;
        this.reflector = reflector;
        this.authService = authService;
    }
    extractTokenFromHeader(request) {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
    async canActivate(context) {
        const isIgnoreAuthGuard = this.reflector.get(ignore_auth_guard_decorator_1.IGNORE_AUTH_GUARD_KEY, context.getHandler());
        if (isIgnoreAuthGuard) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new common_1.UnauthorizedException();
        }
        try {
            const user = await this.authService.verifyToken(token);
            request.user = user;
            return true;
        }
        catch (_) {
            throw new common_1.UnauthorizedException();
        }
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = AuthGuard_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(base_config_entity_1.BASE_CONFIG)),
    __param(1, (0, common_1.Inject)(logger_module_1.LOGGER_SERVICE_PORT)),
    __param(4, (0, common_1.Inject)(auth_service_port_1.AUTH_SERVICE_PORT)),
    __metadata("design:paramtypes", [base_config_entity_1.BaseConfigEntity, Object, nestjs_cls_1.ClsService,
        core_1.Reflector, Object])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map