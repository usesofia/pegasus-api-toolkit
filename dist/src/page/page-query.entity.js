"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageQueryEntity = exports.PageQueryEntitySchema = void 0;
const nestjs_zod_1 = require("nestjs-zod");
const zod_1 = require("zod");
exports.PageQueryEntitySchema = zod_1.z.object({
    pageIndex: zod_1.z
        .preprocess((val) => Number(val), zod_1.z.number())
        .optional()
        .default(0),
    pageSize: zod_1.z
        .preprocess((val) => Number(val), zod_1.z.number())
        .optional()
        .default(100),
});
class PageQueryEntity extends (0, nestjs_zod_1.createZodDto)(exports.PageQueryEntitySchema) {
}
exports.PageQueryEntity = PageQueryEntity;
//# sourceMappingURL=page-query.entity.js.map