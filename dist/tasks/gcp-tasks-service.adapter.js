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
var GcpTasksServiceAdapter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GcpTasksServiceAdapter = void 0;
const task_queue_guard_1 = require("../auth/guards/task-queue.guard");
const base_1 = require("../base");
const base_config_entity_1 = require("../config/base-config.entity");
const correlation_constants_1 = require("../correlation/correlation.constants");
const logger_module_1 = require("../logger/logger.module");
const tasks_1 = require("@google-cloud/tasks");
const common_1 = require("@nestjs/common");
const nestjs_cls_1 = require("nestjs-cls");
let GcpTasksServiceAdapter = GcpTasksServiceAdapter_1 = class GcpTasksServiceAdapter extends base_1.Base {
    constructor(baseConfig, logger, cls, cloudTasksClient) {
        super(GcpTasksServiceAdapter_1.name, baseConfig, logger, cls);
        this.baseConfig = baseConfig;
        this.logger = logger;
        this.cls = cls;
        this.cloudTasksClient = cloudTasksClient;
    }
    async appendTask({ task, correlationId, }) {
        const baseUrl = this.baseConfig.microservices.find((m) => m.name === task.microservice)?.internalBaseUrl;
        if (!baseUrl) {
            throw new Error(`Microservice ${task.microservice} not found.`);
        }
        const url = `${baseUrl}/internal/queues/${task.queue}`;
        const finalCorrelationId = correlationId ?? this.cls.getId();
        const headers = {
            [task_queue_guard_1.tasksQueueSecretHeaderKey]: this.baseConfig.tasks.secret,
            'Content-Type': 'application/json',
            [correlation_constants_1.correlationIdHeaderKey]: finalCorrelationId,
        };
        await this.cloudTasksClient.createTask({
            parent: this.cloudTasksClient.queuePath(this.baseConfig.gcp.credentials.project_id, this.baseConfig.gcp.location, task.queue),
            task: {
                httpRequest: {
                    httpMethod: 'POST',
                    url,
                    body: Buffer.from(JSON.stringify(task.payload)).toString('base64'),
                    headers,
                },
            },
        });
    }
};
exports.GcpTasksServiceAdapter = GcpTasksServiceAdapter;
exports.GcpTasksServiceAdapter = GcpTasksServiceAdapter = GcpTasksServiceAdapter_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(base_config_entity_1.BASE_CONFIG)),
    __param(1, (0, common_1.Inject)(logger_module_1.LOGGER_SERVICE_PORT)),
    __metadata("design:paramtypes", [base_config_entity_1.BaseConfigEntity, Object, nestjs_cls_1.ClsService,
        tasks_1.CloudTasksClient])
], GcpTasksServiceAdapter);
//# sourceMappingURL=gcp-tasks-service.adapter.js.map