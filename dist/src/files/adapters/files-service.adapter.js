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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var FilesServiceAdapter_1;
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesServiceAdapter = void 0;
const base_config_entity_1 = require("../../config/base-config.entity");
const create_file_request_entity_1 = require("../entities/create-file-request.entity");
const file_entity_1 = require("../entities/file.entity");
const find_by_id_file_request_entity_1 = require("../entities/find-by-id-file-request.entity");
const partial_update_file_request_entity_1 = require("../entities/partial-update-file-request.entity");
const files_repository_port_1 = require("../ports/files-repository.port");
const object_storage_service_port_1 = require("../ports/object-storage-service.port");
const common_1 = require("@nestjs/common");
const nestjs_cls_1 = require("nestjs-cls");
const logger_module_1 = require("../../logger/logger.module");
const base_1 = require("../../base");
const log_utils_1 = require("../../utils/log.utils");
const luxon_1 = require("luxon");
const axios_1 = __importDefault(require("axios"));
let FilesServiceAdapter = FilesServiceAdapter_1 = class FilesServiceAdapter extends base_1.Base {
    constructor(baseConfig, logger, cls, filesRepository, objectStorageService) {
        super(FilesServiceAdapter_1.name, baseConfig, logger, cls);
        this.baseConfig = baseConfig;
        this.logger = logger;
        this.cls = cls;
        this.filesRepository = filesRepository;
        this.objectStorageService = objectStorageService;
    }
    async createUploadRequest({ requester, request, }) {
        const objectName = this.objectStorageService.generateUniqueObjectName({
            requester,
            fileType: request.data.fileType,
            originalFileName: request.data.originalFileName,
        });
        const file = await this.filesRepository.create({
            requester,
            request: create_file_request_entity_1.CreateFileRequestEntity.build({
                data: { ...request.data, status: file_entity_1.FileStatus.PENDING, objectName },
                channel: request.channel,
            }),
        });
        const uploadUrl = await this.objectStorageService.createSignedUploadUrl({
            objectName,
            mimeType: request.data.mimeType,
        });
        return { file: await this.enhanceBaseFile(file), uploadUrl };
    }
    async confirmUploadRequest({ requester, request, }) {
        const session = await this.filesRepository.startSession();
        const file = await session.withTransaction(async () => {
            await this.filesRepository.findByIdOrThrow({
                requester,
                request: find_by_id_file_request_entity_1.FindByIdFileRequestEntity.build({ id: request.data.id, status: file_entity_1.FileStatus.PENDING }),
                previousSession: session,
            });
            const file = await this.filesRepository.partialUpdateOrThrow({
                requester,
                request: partial_update_file_request_entity_1.PartialUpdateFileRequestEntity.build({
                    id: request.data.id,
                    data: { status: request.data.status, size: request.data.size },
                    channel: request.channel,
                }),
                previousSession: session,
            });
            return file;
        });
        return this.enhanceBaseFile(file);
    }
    async removeOrThrow({ requester, request, }) {
        const session = await this.filesRepository.startSession();
        await session.withTransaction(async () => {
            await this.filesRepository.partialUpdateOrThrow({
                requester,
                request: partial_update_file_request_entity_1.PartialUpdateFileRequestEntity.build({
                    id: request.id,
                    data: { status: file_entity_1.FileStatus.DELETED, deletedAt: new Date() },
                    channel: request.channel,
                }),
                previousSession: session,
            });
        });
    }
    async getFilesSignedUrlsOrThrow(files) {
        const objectNames = files.map((file) => file.objectName);
        const signedUrls = await this.objectStorageService.createManySignedDownloadUrls({ objectNames });
        return files.map((file, index) => (file_entity_1.FileEntity.build({ ...file, signedUrl: signedUrls[index] })));
    }
    async enrichEntityWithFileSignedUrls(entity, buildableEntity) {
        if (!entity.files || entity.files.length === 0) {
            return entity;
        }
        const populatedFiles = await Promise.all(entity.files.map((fileId) => this.systemFindByIdOrThrow({ id: fileId })));
        return buildableEntity.build({ ...entity, populatedFiles });
    }
    async enrichEntitiesWithFileSignedUrls(entities, buildableEntity) {
        return Promise.all(entities.map((entity) => this.enrichEntityWithFileSignedUrls(entity, buildableEntity)));
    }
    async getSignedUrlFromUrl({ requester, url, }) {
        try {
            const response = await axios_1.default.head(url);
            if (response.status === 200) {
                return url;
            }
        }
        catch {
        }
        const objectName = this.objectStorageService.extractObjectNameFromUrl({ url });
        if (!objectName.startsWith(requester.getOrganizationOrThrow().id)) {
            throw new common_1.ForbiddenException('Você não tem permissão para acessar este arquivo.');
        }
        const signedUrl = await this.objectStorageService.createSignedDownloadUrl({ objectName, expiresInMinutes: luxon_1.Duration.fromObject({ days: 1 }).as('minutes') });
        return signedUrl;
    }
    async systemGetSignedUrlFromUrl({ url, }) {
        try {
            const response = await axios_1.default.head(url);
            if (response.status === 200) {
                return url;
            }
        }
        catch {
        }
        const objectName = this.objectStorageService.extractObjectNameFromUrl({ url });
        const signedUrl = await this.objectStorageService.createSignedDownloadUrl({ objectName, expiresInMinutes: luxon_1.Duration.fromObject({ days: 1 }).as('minutes') });
        return signedUrl;
    }
    async enhanceBaseFile(file) {
        const signedUrls = await this.objectStorageService.createManySignedDownloadUrls({ objectNames: [file.objectName], expiresInMinutes: luxon_1.Duration.fromObject({ days: 1 }).as('minutes') });
        const signedUrl = signedUrls[0];
        const url = this.removeQueryParamsFromUrl(signedUrl);
        if (!url) {
            throw new Error('URL não encontrada.');
        }
        return file_entity_1.FileEntity.build({
            ...file,
            signedUrl,
            url: url,
        });
    }
    removeQueryParamsFromUrl(url) {
        return url.split('?')[0];
    }
    async findByIdOrThrow({ requester, id, }) {
        const file = await this.filesRepository.findByIdOrThrow({ requester, request: find_by_id_file_request_entity_1.FindByIdFileRequestEntity.build({ id }) });
        if (file.status === file_entity_1.FileStatus.DELETED || file.status === file_entity_1.FileStatus.PENDING) {
            throw new common_1.NotFoundException('Arquivo não encontrado.');
        }
        return this.enhanceBaseFile(file);
    }
    async systemFindByIdOrThrow({ id }) {
        const file = await this.filesRepository.systemFindByIdOrThrow({ id });
        return this.enhanceBaseFile(file);
    }
};
exports.FilesServiceAdapter = FilesServiceAdapter;
__decorate([
    (0, log_utils_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FilesServiceAdapter.prototype, "createUploadRequest", null);
__decorate([
    (0, log_utils_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FilesServiceAdapter.prototype, "confirmUploadRequest", null);
__decorate([
    (0, log_utils_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FilesServiceAdapter.prototype, "removeOrThrow", null);
__decorate([
    (0, log_utils_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], FilesServiceAdapter.prototype, "getFilesSignedUrlsOrThrow", null);
__decorate([
    (0, log_utils_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof T !== "undefined" && T) === "function" ? _a : Object, Object]),
    __metadata("design:returntype", Promise)
], FilesServiceAdapter.prototype, "enrichEntityWithFileSignedUrls", null);
__decorate([
    (0, log_utils_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", Promise)
], FilesServiceAdapter.prototype, "enrichEntitiesWithFileSignedUrls", null);
__decorate([
    (0, log_utils_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FilesServiceAdapter.prototype, "getSignedUrlFromUrl", null);
__decorate([
    (0, log_utils_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FilesServiceAdapter.prototype, "systemGetSignedUrlFromUrl", null);
__decorate([
    (0, log_utils_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [file_entity_1.BaseFileEntity]),
    __metadata("design:returntype", Promise)
], FilesServiceAdapter.prototype, "enhanceBaseFile", null);
__decorate([
    (0, log_utils_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", String)
], FilesServiceAdapter.prototype, "removeQueryParamsFromUrl", null);
__decorate([
    (0, log_utils_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FilesServiceAdapter.prototype, "findByIdOrThrow", null);
__decorate([
    (0, log_utils_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FilesServiceAdapter.prototype, "systemFindByIdOrThrow", null);
exports.FilesServiceAdapter = FilesServiceAdapter = FilesServiceAdapter_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(base_config_entity_1.BASE_CONFIG)),
    __param(1, (0, common_1.Inject)(logger_module_1.LOGGER_SERVICE_PORT)),
    __param(3, (0, common_1.Inject)(files_repository_port_1.FILES_REPOSITORY_PORT)),
    __param(4, (0, common_1.Inject)(object_storage_service_port_1.OBJECT_STORAGE_SERVICE_PORT)),
    __metadata("design:paramtypes", [base_config_entity_1.BaseConfigEntity, Object, nestjs_cls_1.ClsService, Object, Object])
], FilesServiceAdapter);
//# sourceMappingURL=files-service.adapter.js.map