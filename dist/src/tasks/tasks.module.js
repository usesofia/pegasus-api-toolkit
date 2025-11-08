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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksModule = void 0;
const base_config_entity_1 = require("../config/base-config.entity");
const gcp_tasks_service_adapter_1 = require("./gcp-tasks-service.adapter");
const mongodb_tasks_service_adapter_1 = require("./mongodb-tasks-service.adapter");
const tasks_service_port_1 = require("./tasks-service.port");
const environment_utils_1 = require("../utils/environment.utils");
const tasks_1 = require("@google-cloud/tasks");
const common_1 = require("@nestjs/common");
let TasksModule = class TasksModule {
    constructor(mongoDbTasksServiceAdapter, gcpTasksServiceAdapter) {
        this.mongoDbTasksServiceAdapter = mongoDbTasksServiceAdapter;
        this.gcpTasksServiceAdapter = gcpTasksServiceAdapter;
    }
    async onApplicationShutdown() {
        await this.mongoDbTasksServiceAdapter.stopAutoFlushTasksBuffer();
        await this.gcpTasksServiceAdapter.stopAutoFlushTasksBuffer();
    }
};
exports.TasksModule = TasksModule;
exports.TasksModule = TasksModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [
            {
                provide: tasks_service_port_1.TASKS_SERVICE_PORT,
                useFactory: (mongodbTasksServiceAdapter, gcpTasksServiceAdapter) => {
                    return (0, environment_utils_1.getEnvironment)() === environment_utils_1.Environment.LOCAL ||
                        (0, environment_utils_1.getEnvironment)() === environment_utils_1.Environment.INTEGRATION_TEST ||
                        (0, environment_utils_1.isCli)()
                        ? mongodbTasksServiceAdapter
                        : gcpTasksServiceAdapter;
                },
                inject: [mongodb_tasks_service_adapter_1.MongodbTasksServiceAdapter, gcp_tasks_service_adapter_1.GcpTasksServiceAdapter],
            },
            mongodb_tasks_service_adapter_1.MongodbTasksServiceAdapter,
            gcp_tasks_service_adapter_1.GcpTasksServiceAdapter,
            {
                provide: tasks_1.v2beta2.CloudTasksClient,
                useFactory: (baseConfig) => {
                    return new tasks_1.v2beta2.CloudTasksClient({
                        credentials: baseConfig.gcp.credentials,
                        projectId: baseConfig.gcp.credentials.project_id,
                    });
                },
                inject: [base_config_entity_1.BASE_CONFIG],
            },
        ],
        exports: [tasks_service_port_1.TASKS_SERVICE_PORT],
    }),
    __metadata("design:paramtypes", [mongodb_tasks_service_adapter_1.MongodbTasksServiceAdapter,
        gcp_tasks_service_adapter_1.GcpTasksServiceAdapter])
], TasksModule);
//# sourceMappingURL=tasks.module.js.map