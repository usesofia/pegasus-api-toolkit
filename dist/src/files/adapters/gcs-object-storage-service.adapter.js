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
var GcsObjectStorageServiceAdapter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GcsObjectStorageServiceAdapter = void 0;
const base_1 = require("../../base");
const base_config_entity_1 = require("../../config/base-config.entity");
const logger_module_1 = require("../../logger/logger.module");
const log_utils_1 = require("../../utils/log.utils");
const storage_1 = require("@google-cloud/storage");
const common_1 = require("@nestjs/common");
const luxon_1 = require("luxon");
const nestjs_cls_1 = require("nestjs-cls");
const uuid_1 = require("uuid");
const zod_1 = require("zod");
let GcsObjectStorageServiceAdapter = GcsObjectStorageServiceAdapter_1 = class GcsObjectStorageServiceAdapter extends base_1.Base {
    constructor(baseConfig, logger, cls) {
        super(GcsObjectStorageServiceAdapter_1.name, baseConfig, logger, cls);
        this.baseConfig = baseConfig;
        this.logger = logger;
        this.cls = cls;
        this.bucketName = baseConfig.objectStorage.organizationFilesBucket.name;
        this.storage = new storage_1.Storage({
            projectId: baseConfig.objectStorage.organizationFilesBucket.projectId,
            credentials: {
                client_email: baseConfig.objectStorage.organizationFilesBucket.clientEmail,
                private_key: baseConfig.objectStorage.organizationFilesBucket.privateKey,
                audience: baseConfig.objectStorage.organizationFilesBucket.audience,
                subject_token_type: baseConfig.objectStorage.organizationFilesBucket.subjectTokenType,
            },
        });
    }
    createWritableStream({ objectName }) {
        return this.storage.bucket(this.bucketName).file(objectName).createWriteStream();
    }
    createReadableStream({ objectName }) {
        return this.storage.bucket(this.bucketName).file(objectName).createReadStream();
    }
    async createSignedUploadUrl({ objectName, mimeType, expiresInMinutes = 15, }) {
        const [url] = await this.storage
            .bucket(this.bucketName)
            .file(objectName)
            .getSignedUrl({
            version: 'v4',
            action: 'write',
            expires: luxon_1.DateTime.now().plus({ minutes: expiresInMinutes }).toJSDate(),
            contentType: mimeType,
        });
        return url;
    }
    async createSignedDownloadUrl({ objectName, expiresInMinutes = 60 * 24, }) {
        const [url] = await this.storage
            .bucket(this.bucketName)
            .file(objectName)
            .getSignedUrl({
            version: 'v4',
            action: 'read',
            expires: luxon_1.DateTime.now().plus({ minutes: expiresInMinutes }).toJSDate(),
        });
        return url;
    }
    async getObjectSize({ objectName }) {
        const [metadata] = await this.storage.bucket(this.bucketName).file(objectName).getMetadata();
        return zod_1.z.number({ coerce: true }).parse(metadata.size);
    }
    async createManySignedDownloadUrls({ objectNames, expiresInMinutes, }) {
        return await Promise.all(objectNames.map((objectName) => this.createSignedDownloadUrl({ objectName, expiresInMinutes })));
    }
    generateUniqueObjectName({ requester, fileType, originalFileName, }) {
        if (requester.organization) {
            return `${requester.getOrganizationOrThrow().id}/${fileType}/${(0, uuid_1.v4)()}/${originalFileName}`;
        }
        else {
            return `${requester.id}/${fileType}/${(0, uuid_1.v4)()}/${originalFileName}`;
        }
    }
    removeQueryParamsFromUrl(url) {
        return url.split('?')[0];
    }
    extractObjectNameFromUrl({ url }) {
        const decodedUrl = decodeURIComponent(url);
        const urlWithoutQueryParams = this.removeQueryParamsFromUrl(decodedUrl);
        const urlObject = new URL(urlWithoutQueryParams);
        return urlObject.pathname.split('/').slice(2).join('/');
    }
};
exports.GcsObjectStorageServiceAdapter = GcsObjectStorageServiceAdapter;
__decorate([
    (0, log_utils_1.Log)("log"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], GcsObjectStorageServiceAdapter.prototype, "extractObjectNameFromUrl", null);
exports.GcsObjectStorageServiceAdapter = GcsObjectStorageServiceAdapter = GcsObjectStorageServiceAdapter_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(base_config_entity_1.BASE_CONFIG)),
    __param(1, (0, common_1.Inject)(logger_module_1.LOGGER_SERVICE_PORT)),
    __metadata("design:paramtypes", [base_config_entity_1.BaseConfigEntity, Object, nestjs_cls_1.ClsService])
], GcsObjectStorageServiceAdapter);
//# sourceMappingURL=gcs-object-storage-service.adapter.js.map