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
var FilesController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesController = void 0;
const remove_file_request_body_dto_1 = require("../dtos/remove-file-request-body.dto");
const remove_file_request_entity_1 = require("../entities/remove-file-request.entity");
const files_service_port_1 = require("../ports/files-service.port");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const nestjs_cls_1 = require("nestjs-cls");
const base_1 = require("../../base");
const logger_module_1 = require("../../logger/logger.module");
const app_exceptions_filter_1 = require("../../app-exceptions.filter");
const auth_user_decorator_1 = require("../../auth/decorators/auth-user.decorator");
const base_config_entity_1 = require("../../config/base-config.entity");
const organization_types_decorator_1 = require("../../auth/decorators/organization-types.decorator");
const auth_user_entity_1 = require("../../auth/entities/auth-user.entity");
const organization_type_enum_1 = require("../../auth/constants/organization-type.enum");
let FilesController = FilesController_1 = class FilesController extends base_1.Base {
    constructor(baseConfig, logger, cls, filesService) {
        super(FilesController_1.name, baseConfig, logger, cls);
        this.baseConfig = baseConfig;
        this.logger = logger;
        this.cls = cls;
        this.filesService = filesService;
    }
    async delete(requester, id, body) {
        await this.filesService.removeOrThrow({
            requester,
            request: remove_file_request_entity_1.RemoveFileRequestEntity.build({ id, channel: body.channel }),
        });
    }
};
exports.FilesController = FilesController;
__decorate([
    (0, swagger_1.ApiOperation)({
        operationId: 'deleteFile',
        summary: 'Deletes a file',
    }),
    (0, swagger_1.ApiBody)({
        type: remove_file_request_body_dto_1.RemoveFileRequestBodyDto,
    }),
    (0, common_1.Delete)('/external/files/:id'),
    (0, organization_types_decorator_1.OrganizationTypes)(organization_type_enum_1.OrganizationType.LEAF),
    __param(0, (0, auth_user_decorator_1.AuthUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_user_entity_1.AuthUserEntity, String, remove_file_request_body_dto_1.RemoveFileRequestBodyDto]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "delete", null);
exports.FilesController = FilesController = FilesController_1 = __decorate([
    (0, swagger_1.ApiTags)('Files'),
    (0, swagger_1.ApiResponse)({
        type: app_exceptions_filter_1.ExceptionResponseEntity,
    }),
    (0, common_1.Controller)(),
    __param(0, (0, common_1.Inject)(base_config_entity_1.BASE_CONFIG)),
    __param(1, (0, common_1.Inject)(logger_module_1.LOGGER_SERVICE_PORT)),
    __param(3, (0, common_1.Inject)(files_service_port_1.FILES_SERVICE_PORT)),
    __metadata("design:paramtypes", [base_config_entity_1.BaseConfigEntity, Object, nestjs_cls_1.ClsService, Object])
], FilesController);
//# sourceMappingURL=files.controller.js.map