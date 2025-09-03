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
exports.SyncOrganizationsModule = void 0;
const clerk_module_1 = require("../clerk/clerk.module");
const base_config_entity_1 = require("../config/base-config.entity");
const primary_mongodb_database_module_1 = require("../database/primary-mongodb-database.module");
const clerk_sync_organizations_service_adapter_1 = require("./adapters/clerk-sync-organizations-service.adapter");
const mongodb_organizations_repository_adapter_1 = require("./adapters/mongodb-organizations-repository.adapter");
const mongodb_organization_model_1 = require("./mongodb-organization-model");
const sync_organizations_service_port_1 = require("./ports/sync-organizations-service.port");
const sync_organizations_constants_1 = require("./sync-organizations.constants");
const sync_organizations_controller_1 = require("./sync-organizations.controller");
const environment_utils_1 = require("../utils/environment.utils");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
let SyncOrganizationsModule = class SyncOrganizationsModule {
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
        const model = this.connection.model(sync_organizations_constants_1.ORGANIZATION_COLLECTION_NAME);
        await model.createIndexes();
    }
};
exports.SyncOrganizationsModule = SyncOrganizationsModule;
exports.SyncOrganizationsModule = SyncOrganizationsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => clerk_module_1.ClerkModule),
        ],
        controllers: [sync_organizations_controller_1.SyncOrganizationsController],
        providers: [
            mongodb_organizations_repository_adapter_1.MongoDbOrganizationsRepositoryAdapter,
            {
                provide: sync_organizations_constants_1.ORGANIZATION_MODEL,
                useFactory: (connection) => {
                    return connection.model(sync_organizations_constants_1.ORGANIZATION_COLLECTION_NAME, mongodb_organization_model_1.MongoDbOrganizationModelSchema);
                },
                inject: [primary_mongodb_database_module_1.PRIMARY_MONGOOSE_CONNECTION],
            },
            {
                provide: sync_organizations_service_port_1.SYNC_ORGANIZATIONS_SERVICE_PORT,
                useClass: clerk_sync_organizations_service_adapter_1.ClerkSyncOrganizationsServiceAdapter,
            },
        ],
    }),
    __param(0, (0, common_1.Inject)(base_config_entity_1.BASE_CONFIG)),
    __param(1, (0, common_1.Inject)(primary_mongodb_database_module_1.PRIMARY_MONGOOSE_CONNECTION)),
    __metadata("design:paramtypes", [base_config_entity_1.BaseConfigEntity,
        mongoose_1.Connection])
], SyncOrganizationsModule);
//# sourceMappingURL=sync-organizations.module.js.map