"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailModule = void 0;
const common_1 = require("@nestjs/common");
const email_service_port_1 = require("./email-service.port");
const sendgrid_email_service_adapter_1 = require("./adapters/sendgrid-email-service.adapter");
const mail_1 = __importDefault(require("@sendgrid/mail"));
const base_config_entity_1 = require("../config/base-config.entity");
const email_constants_1 = require("./email.constants");
let EmailModule = class EmailModule {
};
exports.EmailModule = EmailModule;
exports.EmailModule = EmailModule = __decorate([
    (0, common_1.Module)({
        providers: [
            {
                provide: email_constants_1.SENDGRID_CLIENT,
                useFactory: (baseConfig) => {
                    mail_1.default.setApiKey(baseConfig.email.sendgrid.apiKey);
                    return mail_1.default;
                },
                inject: [base_config_entity_1.BASE_CONFIG],
            },
            {
                provide: email_service_port_1.EMAIL_SERVICE_PORT,
                useClass: sendgrid_email_service_adapter_1.SendgridEmailServiceAdapter,
            },
        ],
        exports: [email_service_port_1.EMAIL_SERVICE_PORT],
    })
], EmailModule);
//# sourceMappingURL=email.module.js.map