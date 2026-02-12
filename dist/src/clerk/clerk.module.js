"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClerkModule = void 0;
const clerk_backend_1 = require("@usesofia/clerk-backend");
const clerk_logger_service_adapter_1 = require("./clerk-logger-service.adapter");
const clerk_constants_1 = require("./clerk.constants");
const base_config_entity_1 = require("../config/base-config.entity");
const common_1 = require("@nestjs/common");
let ClerkModule = class ClerkModule {
};
exports.ClerkModule = ClerkModule;
exports.ClerkModule = ClerkModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [],
        providers: [
            clerk_logger_service_adapter_1.ClerkLoggerServiceAdapter,
            {
                provide: clerk_constants_1.CLERK_CLIENT,
                useFactory: (baseConfig, clerkLoggerServiceAdapter) => {
                    return (0, clerk_backend_1.createClerkClient)({
                        secretKey: baseConfig.clerk.secretKey,
                    }, clerkLoggerServiceAdapter);
                },
                inject: [base_config_entity_1.BASE_CONFIG, clerk_logger_service_adapter_1.ClerkLoggerServiceAdapter],
            },
            {
                provide: clerk_constants_1.CLERK_VERIFY_TOKEN,
                useFactory: () => clerk_backend_1.verifyToken,
            },
        ],
        exports: [clerk_constants_1.CLERK_CLIENT, clerk_constants_1.CLERK_VERIFY_TOKEN],
    })
], ClerkModule);
//# sourceMappingURL=clerk.module.js.map