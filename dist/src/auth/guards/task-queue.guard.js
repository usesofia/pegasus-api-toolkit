"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var TaskQueueGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskQueueGuard = exports.tasksQueueSecretHeaderKey = void 0;
const base_1 = require("../../base");
const base_config_entity_1 = require("../../config/base-config.entity");
const logger_module_1 = require("../../logger/logger.module");
const common_1 = require("@nestjs/common");
const nestjs_cls_1 = require("nestjs-cls");
const Sentry = __importStar(require("@sentry/node"));
exports.tasksQueueSecretHeaderKey = 'x-tasks-queue-secret';
let TaskQueueGuard = TaskQueueGuard_1 = class TaskQueueGuard extends base_1.Base {
    constructor(baseConfig, logger, cls) {
        super(TaskQueueGuard_1.name, baseConfig, logger, cls);
        this.baseConfig = baseConfig;
        this.logger = logger;
        this.cls = cls;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const secret = request.headers[exports.tasksQueueSecretHeaderKey];
        if (secret !== this.baseConfig.tasks.secret) {
            throw new common_1.UnauthorizedException();
        }
        Sentry.setUser({
            id: 'queue',
            email: 'queue@usesofia.com',
        });
        return Promise.resolve(true);
    }
};
exports.TaskQueueGuard = TaskQueueGuard;
exports.TaskQueueGuard = TaskQueueGuard = TaskQueueGuard_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(base_config_entity_1.BASE_CONFIG)),
    __param(1, (0, common_1.Inject)(logger_module_1.LOGGER_SERVICE_PORT)),
    __metadata("design:paramtypes", [base_config_entity_1.BaseConfigEntity, Object, nestjs_cls_1.ClsService])
], TaskQueueGuard);
//# sourceMappingURL=task-queue.guard.js.map