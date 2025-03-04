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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PubSubModule = void 0;
const common_1 = require("@nestjs/common");
const pub_sub_service_port_1 = require("./pub-sub-service.port");
const gcp_pub_sub_service_adapter_1 = require("./gcp-pub-sub-service.adapter");
const gcp_pub_sub_module_1 = require("./gcp-pub-sub.module");
const mongodb_pub_sub_service_adapter_1 = require("./mongodb-pub-sub-service.adapter");
const environment_utils_1 = require("../utils/environment.utils");
const mongodb_pub_sub_event_module_1 = require("./mongodb-pub-sub-event.module");
let PubSubModule = class PubSubModule {
    constructor(gcpPubSubServiceAdapter, mongoDbPubSubServiceAdapter) {
        this.gcpPubSubServiceAdapter = gcpPubSubServiceAdapter;
        this.mongoDbPubSubServiceAdapter = mongoDbPubSubServiceAdapter;
    }
    async onApplicationShutdown() {
        await this.gcpPubSubServiceAdapter.stopAutoFlushPublishBuffer();
        await this.mongoDbPubSubServiceAdapter.stopAutoFlushPublishBuffer();
    }
};
exports.PubSubModule = PubSubModule;
exports.PubSubModule = PubSubModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [gcp_pub_sub_module_1.GcpPubSubModule, mongodb_pub_sub_event_module_1.MongoDbPubSubEventModule],
        providers: [
            gcp_pub_sub_service_adapter_1.GcpPubSubServiceAdapter,
            mongodb_pub_sub_service_adapter_1.MongoDbPubSubServiceAdapter,
            {
                provide: pub_sub_service_port_1.PUB_SUB_SERVICE_PORT,
                useFactory: (gcpPubSubServiceAdapter, mongoDbPubSubServiceAdapter) => {
                    if ((0, environment_utils_1.isLocalEnvironment)() || (0, environment_utils_1.isIntegrationTestEnvironment)()) {
                        return mongoDbPubSubServiceAdapter;
                    }
                    return gcpPubSubServiceAdapter;
                },
                inject: [gcp_pub_sub_service_adapter_1.GcpPubSubServiceAdapter, mongodb_pub_sub_service_adapter_1.MongoDbPubSubServiceAdapter],
            },
        ],
        exports: [pub_sub_service_port_1.PUB_SUB_SERVICE_PORT],
    }),
    __metadata("design:paramtypes", [gcp_pub_sub_service_adapter_1.GcpPubSubServiceAdapter,
        mongodb_pub_sub_service_adapter_1.MongoDbPubSubServiceAdapter])
], PubSubModule);
//# sourceMappingURL=pub-sub.module.js.map