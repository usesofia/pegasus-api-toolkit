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
var FilesUploadController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesUploadController = void 0;
const app_exceptions_filter_1 = require("../../app-exceptions.filter");
const base_1 = require("../../base");
const confirm_file_upload_request_body_dto_1 = require("../dtos/confirm-file-upload-request-body.dto");
const create_file_upload_request_body_dto_1 = require("../dtos/create-file-upload-request-body.dto");
const confirm_file_upload_request_entity_1 = require("../entities/confirm-file-upload-request.entity");
const create_file_upload_request_entity_1 = require("../entities/create-file-upload-request.entity");
const files_service_port_1 = require("../ports/files-service.port");
const logger_module_1 = require("../../logger/logger.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const nestjs_cls_1 = require("nestjs-cls");
const base_config_entity_1 = require("../../config/base-config.entity");
const organization_types_decorator_1 = require("../../auth/decorators/organization-types.decorator");
const organization_type_enum_1 = require("../../auth/constants/organization-type.enum");
const auth_user_decorator_1 = require("../../auth/decorators/auth-user.decorator");
const auth_user_entity_1 = require("../../auth/entities/auth-user.entity");
const file_entity_1 = require("../entities/file.entity");
const log_utils_1 = require("../../utils/log.utils");
let FilesUploadController = FilesUploadController_1 = class FilesUploadController extends base_1.Base {
    constructor(baseConfig, logger, cls, filesService) {
        super(FilesUploadController_1.name, baseConfig, logger, cls);
        this.baseConfig = baseConfig;
        this.logger = logger;
        this.cls = cls;
        this.filesService = filesService;
    }
    async create(requester, body) {
        const { channel, ...data } = body;
        const { file, uploadUrl } = await this.filesService.createUploadRequest({
            requester,
            request: create_file_upload_request_entity_1.CreateFileUploadRequestEntity.build({ data, channel }),
        });
        return { fileId: file.id, uploadUrl };
    }
    async confirm(requester, body) {
        const { channel, ...data } = body;
        return await this.filesService.confirmUploadRequest({
            requester,
            request: confirm_file_upload_request_entity_1.ConfirmFileUploadRequestEntity.build({ data, channel }),
        });
    }
};
exports.FilesUploadController = FilesUploadController;
__decorate([
    (0, swagger_1.ApiOperation)({
        operationId: 'createFileUpload',
        summary: 'Cria uma nova solicitação de upload de arquivo',
    }),
    (0, swagger_1.ApiBody)({
        type: create_file_upload_request_body_dto_1.CreateFileUploadRequestBodyDto,
    }),
    (0, swagger_1.ApiOkResponse)({
        schema: {
            type: 'object',
            properties: {
                fileId: { type: 'string' },
                uploadUrl: { type: 'string' },
            },
        },
    }),
    (0, common_1.Post)('/external/files/upload'),
    (0, organization_types_decorator_1.OrganizationTypes)(organization_type_enum_1.OrganizationType.LEAF),
    (0, log_utils_1.Log)('controller'),
    __param(0, (0, auth_user_decorator_1.AuthUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_user_entity_1.AuthUserEntity,
        create_file_upload_request_body_dto_1.CreateFileUploadRequestBodyDto]),
    __metadata("design:returntype", Promise)
], FilesUploadController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        operationId: 'confirmFileUpload',
        summary: 'Confirms a file upload',
    }),
    (0, swagger_1.ApiBody)({
        type: confirm_file_upload_request_body_dto_1.ConfirmFileUploadRequestBodyDto,
    }),
    (0, swagger_1.ApiCreatedResponse)({
        type: file_entity_1.FileEntity,
    }),
    (0, common_1.Post)('/external/files/upload/confirm'),
    (0, organization_types_decorator_1.OrganizationTypes)(organization_type_enum_1.OrganizationType.LEAF),
    (0, log_utils_1.Log)('controller'),
    __param(0, (0, auth_user_decorator_1.AuthUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_user_entity_1.AuthUserEntity, confirm_file_upload_request_body_dto_1.ConfirmFileUploadRequestBodyDto]),
    __metadata("design:returntype", Promise)
], FilesUploadController.prototype, "confirm", null);
exports.FilesUploadController = FilesUploadController = FilesUploadController_1 = __decorate([
    (0, swagger_1.ApiTags)('Files Upload'),
    (0, swagger_1.ApiResponse)({
        type: app_exceptions_filter_1.ExceptionResponseEntity,
    }),
    (0, common_1.Controller)(),
    __param(0, (0, common_1.Inject)(base_config_entity_1.BASE_CONFIG)),
    __param(1, (0, common_1.Inject)(logger_module_1.LOGGER_SERVICE_PORT)),
    __param(3, (0, common_1.Inject)(files_service_port_1.FILES_SERVICE_PORT)),
    __metadata("design:paramtypes", [base_config_entity_1.BaseConfigEntity, Object, nestjs_cls_1.ClsService, Object])
], FilesUploadController);
//# sourceMappingURL=files-upload.controller.js.map