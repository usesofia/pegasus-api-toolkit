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
var SendgridEmailServiceAdapter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendgridEmailServiceAdapter = void 0;
const common_1 = require("@nestjs/common");
const base_config_entity_1 = require("../../config/base-config.entity");
const logger_module_1 = require("../../logger/logger.module");
const nestjs_cls_1 = require("nestjs-cls");
const base_1 = require("../../base");
const mail_1 = require("@sendgrid/mail");
const fs = require("fs/promises");
const path = require("path");
const handlebars = require("handlebars");
const log_utils_1 = require("../../utils/log.utils");
const email_constants_1 = require("../email.constants");
let SendgridEmailServiceAdapter = SendgridEmailServiceAdapter_1 = class SendgridEmailServiceAdapter extends base_1.Base {
    constructor(baseConfig, logger, cls, sgMail) {
        super(SendgridEmailServiceAdapter_1.name, baseConfig, logger, cls);
        this.baseConfig = baseConfig;
        this.logger = logger;
        this.cls = cls;
        this.sgMail = sgMail;
    }
    async send({ email, to, }) {
        const templatePath = path.join(__dirname, '..', 'templates', `${email.template}.hbs`);
        const templateSource = await fs.readFile(templatePath, 'utf-8');
        const compiledTemplate = handlebars.compile(templateSource);
        const html = compiledTemplate(email.data);
        const msg = {
            to,
            from: 'sofia@usesofia.com',
            subject: email.getSubject(),
            html,
        };
        await this.sgMail.send(msg);
    }
};
exports.SendgridEmailServiceAdapter = SendgridEmailServiceAdapter;
__decorate([
    (0, log_utils_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SendgridEmailServiceAdapter.prototype, "send", null);
exports.SendgridEmailServiceAdapter = SendgridEmailServiceAdapter = SendgridEmailServiceAdapter_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(base_config_entity_1.BASE_CONFIG)),
    __param(1, (0, common_1.Inject)(logger_module_1.LOGGER_SERVICE_PORT)),
    __param(3, (0, common_1.Inject)(email_constants_1.SENDGRID_CLIENT)),
    __metadata("design:paramtypes", [base_config_entity_1.BaseConfigEntity, Object, nestjs_cls_1.ClsService, mail_1.default.MailService])
], SendgridEmailServiceAdapter);
//# sourceMappingURL=sendgrid-email-service.adapter.js.map