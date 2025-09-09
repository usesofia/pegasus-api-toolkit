"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailSchema = exports.EmailTemplate = exports.EMAIL_SERVICE_PORT = void 0;
const zod_1 = __importDefault(require("zod"));
exports.EMAIL_SERVICE_PORT = Symbol('EmailServicePort');
var EmailTemplate;
(function (EmailTemplate) {
    EmailTemplate["BULK_CREATE_AI_FILE_EXTRACTION_FINISHED"] = "bulk-create-ai-file-extraction-finished";
    EmailTemplate["RESOURCE_EXPORT_FINISHED"] = "resource-export-finished";
})(EmailTemplate || (exports.EmailTemplate = EmailTemplate = {}));
exports.EmailSchema = zod_1.default.discriminatedUnion("template", [
    zod_1.default.object({
        template: zod_1.default.literal(EmailTemplate.BULK_CREATE_AI_FILE_EXTRACTION_FINISHED),
        data: zod_1.default.object({
            organizationName: zod_1.default.string(),
            name: zod_1.default.string(),
            fileName: zod_1.default.string(),
            nFinancialRecords: zod_1.default.number(),
            continueUrl: zod_1.default.string(),
        }),
    }),
    zod_1.default.object({
        template: zod_1.default.literal(EmailTemplate.RESOURCE_EXPORT_FINISHED),
        data: zod_1.default.object({
            organizationName: zod_1.default.string(),
            resourceName: zod_1.default.string(),
            downloadUrl: zod_1.default.string(),
            filters: zod_1.default.array(zod_1.default.string()),
            fileType: zod_1.default.enum(['csv', 'excel']),
        }),
    })
]).transform((data) => {
    return {
        ...data,
        getSubject: () => {
            switch (data.template) {
                case EmailTemplate.BULK_CREATE_AI_FILE_EXTRACTION_FINISHED:
                    return `[${data.data.organizationName}] Processamento de arquivo para criação de lançamentos financeiros em lote finalizado!`;
                case EmailTemplate.RESOURCE_EXPORT_FINISHED:
                    return `[${data.data.organizationName}] Exportação de "${data.data.resourceName}" finalizada!`;
            }
        },
    };
});
//# sourceMappingURL=email-service.port.js.map