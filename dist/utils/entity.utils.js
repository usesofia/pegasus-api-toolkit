"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeInstantiateEntity = safeInstantiateEntity;
exports.unsafeInstantiateEntity = unsafeInstantiateEntity;
const common_1 = require("@nestjs/common");
function createInstance(c) {
    return new c();
}
function safeInstantiateEntity(entityClass, input) {
    try {
        const entityInstance = createInstance(entityClass);
        const validProps = entityClass.create(input);
        Object.assign(entityInstance, validProps);
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
        return entityInstance;
    }
    catch (error) {
        throw new common_1.InternalServerErrorException(error);
    }
}
//# sourceMappingURL=entity.utils.js.map