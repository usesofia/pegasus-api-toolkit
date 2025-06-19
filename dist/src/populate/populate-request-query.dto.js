"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PopulateRequestQueryDto = exports.PopulateRequestQueryDtoSchema = void 0;
const nestjs_zod_1 = require("nestjs-zod");
const zod_1 = require("zod");
exports.PopulateRequestQueryDtoSchema = zod_1.z.object({
    populate: zod_1.z.string().optional(),
});
class PopulateRequestQueryDto extends (0, nestjs_zod_1.createZodDto)(exports.PopulateRequestQueryDtoSchema) {
}
exports.PopulateRequestQueryDto = PopulateRequestQueryDto;
//# sourceMappingURL=populate-request-query.dto.js.map