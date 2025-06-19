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
})(EmailTemplate || (exports.EmailTemplate = EmailTemplate = {}));
exports.EmailSchema = zod_1.default.discriminatedUnion("template", [
    zod_1.default.object({
        template: zod_1.default.literal(EmailTemplate.BULK_CREATE_AI_FILE_EXTRACTION_FINISHED),
        data: zod_1.default.object({
            name: zod_1.default.string(),
            fileName: zod_1.default.string(),
            nFinancialRecords: zod_1.default.number(),
            continueUrl: zod_1.default.string(),
        }),
    })
]).transform((data) => {
    return {
        ...data,
        getSubject: () => {
            switch (data.template) {
                case EmailTemplate.BULK_CREATE_AI_FILE_EXTRACTION_FINISHED:
                    return `Processamento de arquivo para criação de lançamentos financeiros em lote finalizado!`;
            }
        },
    };
});
//# sourceMappingURL=email-service.port.js.map