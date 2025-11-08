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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PubSubModule = void 0;
const common_1 = require("@nestjs/common");
const pub_sub_service_port_1 = require("./pub-sub-service.port");
const gcp_pub_sub_service_adapter_1 = require("./gcp-pub-sub-service.adapter");
const gcp_pub_sub_module_1 = require("./gcp-pub-sub.module");
const mongodb_pub_sub_service_adapter_1 = require("./mongodb-pub-sub-service.adapter");
const environment_utils_1 = require("../utils/environment.utils");
const mongodb_pub_sub_event_module_1 = require("./mongodb-pub-sub-event.module");
const logger_module_1 = require("../logger/logger.module");
const base_config_entity_1 = require("../config/base-config.entity");
const nestjs_cls_1 = require("nestjs-cls");
let PubSubModule = class PubSubModule {
    constructor(pubSubService) {
        this.pubSubService = pubSubService;
    }
    async onApplicationShutdown() {
        await this.pubSubService.stopAutoFlushPublishBuffer();
    }
};
exports.PubSubModule = PubSubModule;
exports.PubSubModule = PubSubModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [gcp_pub_sub_module_1.GcpPubSubModule, mongodb_pub_sub_event_module_1.MongoDbPubSubEventModule],
        providers: [
            {
                provide: pub_sub_service_port_1.PUB_SUB_SERVICE_PORT,
                useFactory: (baseConfig, logger, cls, pubSubEventModel, pubSub) => {
                    if ((0, environment_utils_1.isLocalEnvironment)() || (0, environment_utils_1.isIntegrationTestEnvironment)() || (0, environment_utils_1.isCli)()) {
                        return new mongodb_pub_sub_service_adapter_1.MongoDbPubSubServiceAdapter(baseConfig, logger, cls, pubSubEventModel);
                    }
                    return new gcp_pub_sub_service_adapter_1.GcpPubSubServiceAdapter(baseConfig, logger, cls, pubSub);
                },
                inject: [
                    base_config_entity_1.BASE_CONFIG,
                    logger_module_1.LOGGER_SERVICE_PORT,
                    nestjs_cls_1.ClsService,
                    mongodb_pub_sub_event_module_1.PUB_SUB_EVENT_MODEL,
                    gcp_pub_sub_module_1.GCP_PUB_SUB,
                ],
            },
        ],
        exports: [pub_sub_service_port_1.PUB_SUB_SERVICE_PORT],
    }),
    __param(0, (0, common_1.Inject)(pub_sub_service_port_1.PUB_SUB_SERVICE_PORT)),
    __metadata("design:paramtypes", [Object])
], PubSubModule);
//# sourceMappingURL=pub-sub.module.js.map