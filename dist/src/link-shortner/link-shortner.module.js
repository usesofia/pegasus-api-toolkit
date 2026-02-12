"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkShortnerModule = void 0;
const common_1 = require("@nestjs/common");
const link_shortner_service_port_1 = require("./link-shortner-service.port");
const shortio_link_shortner_service_adapter_1 = require("./shortio-link-shortner-service.adapter");
const environment_utils_1 = require("../utils/environment.utils");
const mock_link_shortner_service_adapter_1 = require("./mock-link-shortner-service.adapter");
let LinkShortnerModule = class LinkShortnerModule {
};
exports.LinkShortnerModule = LinkShortnerModule;
exports.LinkShortnerModule = LinkShortnerModule = __decorate([
    (0, common_1.Module)({
        providers: [
            {
                provide: link_shortner_service_port_1.LINK_SHORTNER_SERVICE_PORT,
                useClass: (0, environment_utils_1.isIntegrationTestEnvironment)()
                    ? mock_link_shortner_service_adapter_1.MockLinkShortnerServiceAdapter
                    : shortio_link_shortner_service_adapter_1.ShortioLinkShortnerServiceAdapter,
            },
        ],
        exports: [link_shortner_service_port_1.LINK_SHORTNER_SERVICE_PORT],
    })
], LinkShortnerModule);
//# sourceMappingURL=link-shortner.module.js.map