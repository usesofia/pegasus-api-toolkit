"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeInstantiateEntity = safeInstantiateEntity;
const common_1 = require("@nestjs/common");
const json_utils_1 = require("./json.utils");
function createInstance(c) {
    return new c();
}
function safeInstantiateEntity(entityClass, input) {
    try {
        const entityInstance = createInstance(entityClass);
        const safeInput = JSON.parse(JSON.stringify(input, (0, json_utils_1.getJsonStringfyReplacer)()), (0, json_utils_1.getJsonParseReviver)());
        const validProps = entityClass.create(safeInput);
        Object.assign(entityInstance, validProps);
        Object.freeze(entityInstance);
        return entityInstance;
    }
    catch (error) {
        throw new common_1.InternalServerErrorException(error);
    }
}
//# sourceMappingURL=entity.utils.js.map