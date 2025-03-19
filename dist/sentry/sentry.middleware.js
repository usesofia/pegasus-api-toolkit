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
var SentryMiddleware_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SentryMiddleware = void 0;
const common_1 = require("@nestjs/common");
const Sentry = require("@sentry/node");
const base_1 = require("../base");
const base_config_entity_1 = require("../config/base-config.entity");
const logger_module_1 = require("../logger/logger.module");
const nestjs_cls_1 = require("nestjs-cls");
const correlation_constants_1 = require("../correlation/correlation.constants");
let SentryMiddleware = SentryMiddleware_1 = class SentryMiddleware extends base_1.Base {
    constructor(baseConfig, logger, cls) {
        super(SentryMiddleware_1.name, baseConfig, logger, cls);
        this.baseConfig = baseConfig;
        this.logger = logger;
        this.cls = cls;
    }
    use(req, res, next) {
        Sentry.setTag(correlation_constants_1.correlationIdKey, this.cls.getId());
        next();
    }
};
exports.SentryMiddleware = SentryMiddleware;
exports.SentryMiddleware = SentryMiddleware = SentryMiddleware_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(base_config_entity_1.BASE_CONFIG)),
    __param(1, (0, common_1.Inject)(logger_module_1.LOGGER_SERVICE_PORT)),
    __metadata("design:paramtypes", [base_config_entity_1.BaseConfigEntity, Object, nestjs_cls_1.ClsService])
], SentryMiddleware);
//# sourceMappingURL=sentry.middleware.js.map