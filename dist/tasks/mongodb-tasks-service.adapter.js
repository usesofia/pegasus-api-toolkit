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
var MongodbTasksServiceAdapter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongodbTasksServiceAdapter = exports.TASKS_COLLECTION_NAME = void 0;
const base_1 = require("../base");
const base_config_entity_1 = require("../config/base-config.entity");
const primary_mongodb_database_module_1 = require("../database/primary-mongodb-database.module");
const logger_module_1 = require("../logger/logger.module");
const log_utils_1 = require("../utils/log.utils");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const nestjs_cls_1 = require("nestjs-cls");
const uuid_1 = require("uuid");
exports.TASKS_COLLECTION_NAME = '_Tasks';
const MAX_TASKS_BUFFER_SIZE = 4096;
const TaskSchema = new mongoose_1.Schema({
    correlationId: { type: String, required: true },
    queue: { type: String, required: true },
    microservice: { type: String, required: true },
    payload: { type: Object, required: true },
}, {
    timestamps: true,
    collection: exports.TASKS_COLLECTION_NAME,
});
let MongodbTasksServiceAdapter = MongodbTasksServiceAdapter_1 = class MongodbTasksServiceAdapter extends base_1.Base {
    constructor(baseConfig, logger, cls, connection) {
        super(MongodbTasksServiceAdapter_1.name, baseConfig, logger, cls);
        this.baseConfig = baseConfig;
        this.logger = logger;
        this.cls = cls;
        this.connection = connection;
        this.tasksBuffer = [];
        this.taskModel = this.connection.model('Task', TaskSchema);
        this.flushing = false;
        this.tasksBufferFlushInterval = setInterval(() => void this.flushTasksBuffer({ max: 512 }), 400);
    }
    async appendTask({ task, correlationId, }) {
        const finalCorrelationId = correlationId ?? this.cls.getId();
        await this.taskModel.create({
            correlationId: finalCorrelationId,
            queue: task.queue,
            microservice: task.microservice,
            payload: task.payload,
        });
    }
    unsafeAppendTask({ task, }) {
        if (this.tasksBuffer.length >= MAX_TASKS_BUFFER_SIZE) {
            throw new Error(`Tasks buffer is full. It has ${this.tasksBuffer.length.toString()} items.`);
        }
        this.tasksBuffer.push({
            correlationId: this.cls.getId(),
            id: (0, uuid_1.v4)(),
            task,
        });
    }
    async flushTasksBuffer({ max }) {
        if (this.tasksBuffer.length === 0) {
            return;
        }
        if (this.flushing) {
            return;
        }
        this.flushing = true;
        const calculatedMax = max ?? this.tasksBuffer.length;
        const itemsToBeProcessed = this.tasksBuffer.slice(0, calculatedMax);
        const successItemIdsProcessed = [];
        await Promise.all(itemsToBeProcessed.map(async (item) => {
            try {
                await this.appendTask({
                    task: item.task,
                    correlationId: item.correlationId,
                });
                successItemIdsProcessed.push(item.id);
            }
            catch (error) {
                this.logWarn({
                    correlationId: item.correlationId,
                    functionName: 'flushTasksBuffer',
                    suffix: 'itemFailedToBeProcessed',
                    data: {
                        error,
                        item,
                    },
                });
            }
        }));
        this.tasksBuffer = this.tasksBuffer.filter((item) => !successItemIdsProcessed.includes(item.id));
        this.flushing = false;
    }
    async stopAutoFlushTasksBuffer() {
        clearInterval(this.tasksBufferFlushInterval);
        let attempts = 0;
        while (this.flushing && attempts < 100) {
            await new Promise((resolve) => setTimeout(resolve, 100));
            attempts++;
        }
        await this.flushTasksBuffer({});
    }
};
exports.MongodbTasksServiceAdapter = MongodbTasksServiceAdapter;
__decorate([
    (0, log_utils_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MongodbTasksServiceAdapter.prototype, "appendTask", null);
__decorate([
    (0, log_utils_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MongodbTasksServiceAdapter.prototype, "unsafeAppendTask", null);
__decorate([
    (0, log_utils_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MongodbTasksServiceAdapter.prototype, "flushTasksBuffer", null);
__decorate([
    (0, log_utils_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MongodbTasksServiceAdapter.prototype, "stopAutoFlushTasksBuffer", null);
exports.MongodbTasksServiceAdapter = MongodbTasksServiceAdapter = MongodbTasksServiceAdapter_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(base_config_entity_1.BASE_CONFIG)),
    __param(1, (0, common_1.Inject)(logger_module_1.LOGGER_SERVICE_PORT)),
    __param(3, (0, common_1.Inject)(primary_mongodb_database_module_1.PRIMARY_MONGOOSE_CONNECTION)),
    __metadata("design:paramtypes", [base_config_entity_1.BaseConfigEntity, Object, nestjs_cls_1.ClsService,
        mongoose_1.Connection])
], MongodbTasksServiceAdapter);
//# sourceMappingURL=mongodb-tasks-service.adapter.js.map