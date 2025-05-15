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
var MongoDbFilesRepositoryAdapter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDbFilesRepositoryAdapter = void 0;
const file_entity_1 = require("../entities/file.entity");
const files_constants_1 = require("../files.constants");
const common_1 = require("@nestjs/common");
const base_multitenant_mongodb_repository_adapter_1 = require("../../database/base-multitenant-mongodb-repository.adapter");
const mongoose_1 = require("mongoose");
const nestjs_cls_1 = require("nestjs-cls");
const base_config_entity_1 = require("../../config/base-config.entity");
const logger_module_1 = require("../../logger/logger.module");
let MongoDbFilesRepositoryAdapter = MongoDbFilesRepositoryAdapter_1 = class MongoDbFilesRepositoryAdapter extends base_multitenant_mongodb_repository_adapter_1.BaseMultitenantMongoDbRepositoryAdapter {
    constructor(baseConfig, logger, cls, fileModel) {
        super(MongoDbFilesRepositoryAdapter_1.name, baseConfig, logger, cls, fileModel);
        this.baseConfig = baseConfig;
        this.logger = logger;
        this.cls = cls;
    }
    toEntity(doc) {
        return file_entity_1.FileEntity.build({ ...doc.toObject(), id: doc.id.toString() });
    }
};
exports.MongoDbFilesRepositoryAdapter = MongoDbFilesRepositoryAdapter;
exports.MongoDbFilesRepositoryAdapter = MongoDbFilesRepositoryAdapter = MongoDbFilesRepositoryAdapter_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(base_config_entity_1.BASE_CONFIG)),
    __param(1, (0, common_1.Inject)(logger_module_1.LOGGER_SERVICE_PORT)),
    __param(3, (0, common_1.Inject)(files_constants_1.MODEL)),
    __metadata("design:paramtypes", [base_config_entity_1.BaseConfigEntity, Object, nestjs_cls_1.ClsService,
        mongoose_1.Model])
], MongoDbFilesRepositoryAdapter);
//# sourceMappingURL=mongodb-files-repository.adapter.js.map