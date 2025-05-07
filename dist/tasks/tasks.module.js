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
exports.TasksModule = void 0;
const base_config_entity_1 = require("../config/base-config.entity");
const primary_mongodb_database_module_1 = require("../database/primary-mongodb-database.module");
const logger_module_1 = require("../logger/logger.module");
const gcp_tasks_service_adapter_1 = require("./gcp-tasks-service.adapter");
const mongodb_tasks_service_adapter_1 = require("./mongodb-tasks-service.adapter");
const tasks_service_port_1 = require("./tasks-service.port");
const environment_utils_1 = require("../utils/environment.utils");
const tasks_1 = require("@google-cloud/tasks");
const common_1 = require("@nestjs/common");
const nestjs_cls_1 = require("nestjs-cls");
let TasksModule = class TasksModule {
    constructor(tasksService) {
        this.tasksService = tasksService;
    }
    async onApplicationShutdown() {
        await this.tasksService.stopAutoFlushTasksBuffer();
    }
};
exports.TasksModule = TasksModule;
exports.TasksModule = TasksModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [primary_mongodb_database_module_1.PrimaryMongoDbDatabaseModule],
        providers: [
            {
                provide: tasks_service_port_1.TASKS_SERVICE_PORT,
                useFactory: (baseConfig, logger, cls, cloudTasksClient, connection) => {
                    return (0, environment_utils_1.getEnvironment)() === environment_utils_1.Environment.LOCAL ||
                        (0, environment_utils_1.getEnvironment)() === environment_utils_1.Environment.INTEGRATION_TEST
                        ? new mongodb_tasks_service_adapter_1.MongodbTasksServiceAdapter(baseConfig, logger, cls, connection)
                        : new gcp_tasks_service_adapter_1.GcpTasksServiceAdapter(baseConfig, logger, cls, cloudTasksClient);
                },
                inject: [base_config_entity_1.BASE_CONFIG, logger_module_1.LOGGER_SERVICE_PORT, nestjs_cls_1.ClsService, tasks_1.CloudTasksClient, primary_mongodb_database_module_1.PRIMARY_MONGOOSE_CONNECTION],
            },
            {
                provide: tasks_1.CloudTasksClient,
                useFactory: (baseConfig) => {
                    return new tasks_1.CloudTasksClient({
                        credentials: baseConfig.gcp.credentials,
                        projectId: baseConfig.gcp.credentials.project_id,
                    });
                },
                inject: [base_config_entity_1.BASE_CONFIG],
            },
        ],
        exports: [tasks_service_port_1.TASKS_SERVICE_PORT],
    }),
    __param(0, (0, common_1.Inject)(tasks_service_port_1.TASKS_SERVICE_PORT)),
    __metadata("design:paramtypes", [Object])
], TasksModule);
//# sourceMappingURL=tasks.module.js.map