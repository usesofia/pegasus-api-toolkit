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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesModule = void 0;
const base_config_entity_1 = require("../config/base-config.entity");
const primary_mongodb_database_module_1 = require("../database/primary-mongodb-database.module");
const files_service_adapter_1 = require("./adapters/files-service.adapter");
const gcs_object_storage_service_adapter_1 = require("./adapters/gcs-object-storage-service.adapter");
const mongodb_files_repository_adapter_1 = require("./adapters/mongodb-files-repository.adapter");
const files_upload_controller_1 = require("./controllers/files-upload.controller");
const files_controller_1 = require("./controllers/files.controller");
const files_constants_1 = require("./files.constants");
const mongodb_file_model_1 = require("./models/mongodb-file.model");
const files_repository_port_1 = require("./ports/files-repository.port");
const files_service_port_1 = require("./ports/files-service.port");
const object_storage_service_port_1 = require("./ports/object-storage-service.port");
const environment_utils_1 = require("../utils/environment.utils");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
let FilesModule = class FilesModule {
    constructor(baseConfig, connection) {
        this.baseConfig = baseConfig;
        this.connection = connection;
    }
    async onModuleInit() {
        if (this.baseConfig.env !== environment_utils_1.Environment.INTEGRATION_TEST) {
            await this.createIndexes();
        }
    }
    async createIndexes() {
        const model = this.connection.model(files_constants_1.FILES_COLLECTION_NAME);
        await model.createIndexes();
    }
};
exports.FilesModule = FilesModule;
exports.FilesModule = FilesModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [files_upload_controller_1.FilesUploadController, files_controller_1.FilesController],
        providers: [
            {
                provide: files_constants_1.FILE_MODEL,
                useFactory: (connection) => {
                    return connection.model(files_constants_1.FILES_COLLECTION_NAME, mongodb_file_model_1.MongoDbFileModelSchema);
                },
                inject: [primary_mongodb_database_module_1.PRIMARY_MONGOOSE_CONNECTION],
            },
            {
                provide: files_service_port_1.FILES_SERVICE_PORT,
                useClass: files_service_adapter_1.FilesServiceAdapter,
            },
            {
                provide: files_repository_port_1.FILES_REPOSITORY_PORT,
                useClass: mongodb_files_repository_adapter_1.MongoDbFilesRepositoryAdapter,
            },
            {
                provide: object_storage_service_port_1.OBJECT_STORAGE_SERVICE_PORT,
                useClass: gcs_object_storage_service_adapter_1.GcsObjectStorageServiceAdapter,
            },
        ],
        exports: [files_service_port_1.FILES_SERVICE_PORT, files_repository_port_1.FILES_REPOSITORY_PORT, object_storage_service_port_1.OBJECT_STORAGE_SERVICE_PORT],
    }),
    __param(0, (0, common_1.Inject)(base_config_entity_1.BASE_CONFIG)),
    __param(1, (0, common_1.Inject)(primary_mongodb_database_module_1.PRIMARY_MONGOOSE_CONNECTION)),
    __metadata("design:paramtypes", [base_config_entity_1.BaseConfigEntity,
        mongoose_1.Connection])
], FilesModule);
//# sourceMappingURL=files.module.js.map