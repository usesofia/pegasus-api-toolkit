"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeInstantiateEntity = safeInstantiateEntity;
exports.unsafeInstantiateEntity = unsafeInstantiateEntity;
const json_utils_1 = require("./json.utils");
const common_1 = require("@nestjs/common");
function createInstance(c) {
    return new c();
}
function safeInstantiateEntity(entityClass, input) {
    try {
        const entityInstance = createInstance(entityClass);
        const safeInput = JSON.parse(JSON.stringify(input, (0, json_utils_1.getJsonStringifyReplacer)()), (0, json_utils_1.getJsonParseReviver)());
        const validProps = entityClass.create(safeInput);
        Object.assign(entityInstance, validProps);
        Object.freeze(entityInstance);
        return entityInstance;
    }
    catch (error) {
        throw new common_1.InternalServerErrorException(error);
    }
}
function unsafeInstantiateEntity(entityClass, input) {
    const entityInstance = createInstance(entityClass);
    try {
        const validProps = entityClass.create(input);
        Object.assign(entityInstance, validProps);
        Object.freeze(entityInstance);
        return entityInstance;
    }
    catch (error) {
        throw new common_1.InternalServerErrorException(error);
    }
}
//# sourceMappingURL=entity.utils.js.map