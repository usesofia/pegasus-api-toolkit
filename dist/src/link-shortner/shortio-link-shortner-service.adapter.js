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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var ShortioLinkShortnerServiceAdapter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortioLinkShortnerServiceAdapter = void 0;
const common_1 = require("@nestjs/common");
const base_1 = require("../base");
const base_config_entity_1 = require("../config/base-config.entity");
const logger_module_1 = require("../logger/logger.module");
const nestjs_cls_1 = require("nestjs-cls");
const log_utils_1 = require("../utils/log.utils");
const axios_1 = __importDefault(require("axios"));
let ShortioLinkShortnerServiceAdapter = ShortioLinkShortnerServiceAdapter_1 = class ShortioLinkShortnerServiceAdapter extends base_1.Base {
    constructor(baseConfig, logger, cls) {
        super(ShortioLinkShortnerServiceAdapter_1.name, baseConfig, logger, cls);
        this.baseConfig = baseConfig;
        this.logger = logger;
        this.cls = cls;
    }
    async createShortLink(url) {
        if (!this.baseConfig.shortio) {
            throw new Error('Short.io configuration is not set.');
        }
        const response = await axios_1.default.post('https://api.short.io/links', {
            originalURL: url,
            domain: this.baseConfig.shortio.domain,
        }, {
            headers: {
                Authorization: this.baseConfig.shortio.apiKey,
            },
        });
        return response.data.shortURL;
    }
};
exports.ShortioLinkShortnerServiceAdapter = ShortioLinkShortnerServiceAdapter;
__decorate([
    (0, log_utils_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ShortioLinkShortnerServiceAdapter.prototype, "createShortLink", null);
exports.ShortioLinkShortnerServiceAdapter = ShortioLinkShortnerServiceAdapter = ShortioLinkShortnerServiceAdapter_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(base_config_entity_1.BASE_CONFIG)),
    __param(1, (0, common_1.Inject)(logger_module_1.LOGGER_SERVICE_PORT)),
    __metadata("design:paramtypes", [base_config_entity_1.BaseConfigEntity, Object, nestjs_cls_1.ClsService])
], ShortioLinkShortnerServiceAdapter);
//# sourceMappingURL=shortio-link-shortner-service.adapter.js.map