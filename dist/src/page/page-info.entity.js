"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageInfoEntity = exports.PageInfoEntitySchema = void 0;
const nestjs_zod_1 = require("nestjs-zod");
const zod_1 = require("zod");
const entity_utils_1 = require("../utils/entity.utils");
exports.PageInfoEntitySchema = zod_1.z.object({
    pageIndex: zod_1.z.number(),
    pageSize: zod_1.z.number(),
    totalPages: zod_1.z.number(),
    totalItems: zod_1.z.number(),
});
class PageInfoEntity extends (0, nestjs_zod_1.createZodDto)(exports.PageInfoEntitySchema) {
    static build(input) {
        return (0, entity_utils_1.safeInstantiateEntity)(PageInfoEntity, input);
    }
}
exports.PageInfoEntity = PageInfoEntity;
//# sourceMappingURL=page-info.entity.js.map