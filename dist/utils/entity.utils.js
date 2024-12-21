"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeInstantiateEntity = safeInstantiateEntity;
const common_1 = require("@nestjs/common");
function createInstance(c) {
    return new c();
}
function getStringfyReplacer() {
    const seen = new WeakSet();
    return (key, value) => {
        if (value instanceof Error) {
            return {
                name: value.name,
                message: value.message,
                stack: value.stack,
            };
        }
        if (typeof value === 'object' && value !== null) {
            if (seen.has(value)) {
                return;
            }
            seen.add(value);
        }
        return value;
    };
}
function safeInstantiateEntity(entityClass, input) {
    try {
        const entityInstance = createInstance(entityClass);
        const safeInput = JSON.parse(JSON.stringify(input, getStringfyReplacer()));
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