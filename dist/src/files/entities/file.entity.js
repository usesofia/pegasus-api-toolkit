"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileEntity = exports.BaseFileEntity = exports.FileEntitySchema = exports.BaseFileEntitySchema = exports.FileStatus = exports.FileType = void 0;
const entity_utils_1 = require("../../utils/entity.utils");
const nestjs_zod_1 = require("nestjs-zod");
const zod_1 = require("zod");
var FileType;
(function (FileType) {
    FileType["DEFAULT"] = "DEFAULT";
    FileType["FINANCIAL_RECORD"] = "FINANCIAL_RECORD";
    FileType["EXPORT"] = "EXPORT";
    FileType["INSTALLMENT_FINANCIAL_RECORD"] = "INSTALLMENT_FINANCIAL_RECORD";
    FileType["RECURRING_FINANCIAL_RECORD"] = "RECURRING_FINANCIAL_RECORD";
    FileType["OFX"] = "OFX";
    FileType["EXTRACT_FINANCIAL_RECORD_FROM_FILE"] = "EXTRACT_FINANCIAL_RECORD_FROM_FILE";
    FileType["EXTRACT_CONTACT_FROM_FILE"] = "EXTRACT_CONTACT_FROM_FILE";
    FileType["FINANCIAL_RECORDS_BULK_CREATE"] = "FINANCIAL_RECORDS_BULK_CREATE";
    FileType["CONTACTS_BULK_CREATE"] = "CONTACTS_BULK_CREATE";
    FileType["FINANCIAL_RECORDS_BULK_CREATE_EXTRACTION_INPUT"] = "FINANCIAL_RECORDS_BULK_CREATE_EXTRACTION_INPUT";
    FileType["FINANCIAL_RECORDS_BULK_CREATE_EXTRACTION_OUTPUT"] = "FINANCIAL_RECORDS_BULK_CREATE_EXTRACTION_OUTPUT";
    FileType["CONTACTS_BULK_CREATE_EXTRACTION_INPUT"] = "CONTACTS_BULK_CREATE_EXTRACTION_INPUT";
    FileType["CONTACTS_BULK_CREATE_EXTRACTION_OUTPUT"] = "CONTACTS_BULK_CREATE_EXTRACTION_OUTPUT";
    FileType["SEVEN_DAYS_TEMP_FILE"] = "SEVEN_DAYS_TEMP_FILE";
    FileType["WHATSAPP_MESSAGE_FILE"] = "WHATSAPP_MESSAGE_FILE";
})(FileType || (exports.FileType = FileType = {}));
var FileStatus;
(function (FileStatus) {
    FileStatus["PENDING"] = "PENDING";
    FileStatus["COMPLETED"] = "COMPLETED";
    FileStatus["FAILED"] = "FAILED";
    FileStatus["DELETED"] = "DELETED";
})(FileStatus || (exports.FileStatus = FileStatus = {}));
exports.BaseFileEntitySchema = zod_1.z.object({
    id: zod_1.z.string().describe('Identificador do arquivo.'),
    ownerOrganization: zod_1.z.string().describe('Identificador da organização dona do arquivo.'),
    originalFileName: zod_1.z.string().describe('Nome original do arquivo.'),
    mimeType: zod_1.z.string().describe('Tipo MIME do arquivo.'),
    size: zod_1.z.number().describe('Tamanho do arquivo em bytes.'),
    fileType: zod_1.z.nativeEnum(FileType).describe('Tipo do arquivo.'),
    objectName: zod_1.z.string().describe('Nome do objeto no storage.'),
    status: zod_1.z.nativeEnum(FileStatus).describe('Status do arquivo.'),
    caption: zod_1.z.string().nullish().describe('Legenda do arquivo.'),
    createdAt: zod_1.z.coerce.date().describe('Data de criação do arquivo.'),
    updatedAt: zod_1.z.coerce.date().describe('Data de atualização do arquivo.'),
    deletedAt: zod_1.z.coerce.date().describe('Data de exclusão do arquivo.').nullable().default(null),
});
exports.FileEntitySchema = exports.BaseFileEntitySchema.extend({
    url: zod_1.z.string().describe('URL do arquivo.'),
    signedUrl: zod_1.z.string().describe('URL assinada do arquivo.'),
});
class BaseFileEntity extends (0, nestjs_zod_1.createZodDto)(exports.BaseFileEntitySchema) {
    static build(input) {
        return (0, entity_utils_1.safeInstantiateEntity)(BaseFileEntity, input);
    }
}
exports.BaseFileEntity = BaseFileEntity;
class FileEntity extends (0, nestjs_zod_1.createZodDto)(exports.FileEntitySchema) {
    static build(input) {
        return (0, entity_utils_1.safeInstantiateEntity)(FileEntity, input);
    }
    isImage() {
        return this.mimeType.startsWith('image/');
    }
    isAudio() {
        return this.mimeType.startsWith('audio/');
    }
    isDocument() {
        return this.mimeType.startsWith('application/') || this.mimeType.startsWith('text/');
    }
    isVideo() {
        return this.mimeType.startsWith('video/');
    }
}
exports.FileEntity = FileEntity;
//# sourceMappingURL=file.entity.js.map