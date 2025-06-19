"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskEntity = exports.TaskEntitySchema = void 0;
const nestjs_zod_1 = require("nestjs-zod");
const zod_1 = require("zod");
exports.TaskEntitySchema = zod_1.z.object({
    queue: zod_1.z.string(),
    microservice: zod_1.z.string(),
    payload: zod_1.z.record(zod_1.z.string(), zod_1.z.any()),
});
class TaskEntity extends (0, nestjs_zod_1.createZodDto)(exports.TaskEntitySchema) {
}
exports.TaskEntity = TaskEntity;
//# sourceMappingURL=task.entity.js.map