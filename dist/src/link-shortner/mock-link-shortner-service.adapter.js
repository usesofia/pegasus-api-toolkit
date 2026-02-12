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
var MockLinkShortnerServiceAdapter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockLinkShortnerServiceAdapter = void 0;
const common_1 = require("@nestjs/common");
const base_1 = require("../base");
const base_config_entity_1 = require("../config/base-config.entity");
const logger_module_1 = require("../logger/logger.module");
const nestjs_cls_1 = require("nestjs-cls");
const log_utils_1 = require("../utils/log.utils");
let MockLinkShortnerServiceAdapter = MockLinkShortnerServiceAdapter_1 = class MockLinkShortnerServiceAdapter extends base_1.Base {
    constructor(baseConfig, logger, cls) {
        super(MockLinkShortnerServiceAdapter_1.name, baseConfig, logger, cls);
        this.baseConfig = baseConfig;
        this.logger = logger;
        this.cls = cls;
    }
    createShortLink(url) {
        return Promise.resolve(`https://short.io/${url.substring(url.length - 8)}`);
    }
};
exports.MockLinkShortnerServiceAdapter = MockLinkShortnerServiceAdapter;
__decorate([
    (0, log_utils_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MockLinkShortnerServiceAdapter.prototype, "createShortLink", null);
exports.MockLinkShortnerServiceAdapter = MockLinkShortnerServiceAdapter = MockLinkShortnerServiceAdapter_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(base_config_entity_1.BASE_CONFIG)),
    __param(1, (0, common_1.Inject)(logger_module_1.LOGGER_SERVICE_PORT)),
    __metadata("design:paramtypes", [base_config_entity_1.BaseConfigEntity, Object, nestjs_cls_1.ClsService])
], MockLinkShortnerServiceAdapter);
//# sourceMappingURL=mock-link-shortner-service.adapter.js.map