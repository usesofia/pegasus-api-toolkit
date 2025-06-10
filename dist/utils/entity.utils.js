"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeInstantiateEntity = safeInstantiateEntity;
exports.unsafeInstantiateEntity = unsafeInstantiateEntity;
const common_1 = require("@nestjs/common");
const typia_1 = require("typia");
function createInstance(c) {
    return new c();
}
function safeInstantiateEntity(entityClass, input) {
    try {
        const entityInstance = createInstance(entityClass);
        const safeInput = typia_1.default.json.isParse(typia_1.default.json.stringify(input));
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
    try {
        const entityInstance = createInstance(entityClass);
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