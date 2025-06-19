"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GcpPubSubModule = exports.GCP_PUB_SUB = void 0;
const common_1 = require("@nestjs/common");
const pubsub_1 = require("@google-cloud/pubsub");
const base_config_entity_1 = require("../config/base-config.entity");
exports.GCP_PUB_SUB = Symbol('GcpPubSub');
let GcpPubSubModule = class GcpPubSubModule {
};
exports.GcpPubSubModule = GcpPubSubModule;
exports.GcpPubSubModule = GcpPubSubModule = __decorate([
    (0, common_1.Module)({
        providers: [
            {
                provide: exports.GCP_PUB_SUB,
                useFactory: (config) => {
                    return new pubsub_1.PubSub({
                        credentials: config.gcp.credentials,
                        projectId: config.gcp.credentials.project_id,
                    });
                },
                inject: [base_config_entity_1.BASE_CONFIG],
            },
        ],
        exports: [exports.GCP_PUB_SUB],
    })
], GcpPubSubModule);
//# sourceMappingURL=gcp-pub-sub.module.js.map