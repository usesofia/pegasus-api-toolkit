"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PubSubModule = void 0;
const common_1 = require("@nestjs/common");
const pub_sub_service_port_1 = require("./pub-sub-service.port");
const gcp_pub_sub_service_adapter_1 = require("./gcp-pub-sub-service.adapter");
const gcp_pub_sub_module_1 = require("./gcp-pub-sub.module");
let PubSubModule = class PubSubModule {
};
exports.PubSubModule = PubSubModule;
exports.PubSubModule = PubSubModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [gcp_pub_sub_module_1.GcpPubSubModule],
        providers: [
            { provide: pub_sub_service_port_1.PUB_SUB_SERVICE_PORT, useClass: gcp_pub_sub_service_adapter_1.GcpPubSubServiceAdapter },
        ],
        exports: [pub_sub_service_port_1.PUB_SUB_SERVICE_PORT],
    })
], PubSubModule);
//# sourceMappingURL=pub-sub.module.js.map