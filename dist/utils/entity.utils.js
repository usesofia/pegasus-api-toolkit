"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeInstantiateEntity = safeInstantiateEntity;
exports.unsafeInstantiateEntity = unsafeInstantiateEntity;
const common_1 = require("@nestjs/common");
const deepcopy_1 = require("deepcopy");
function createInstance(c) {
    return new c();
}
function safeInstantiateEntity(entityClass, input) {
    try {
        const entityInstance = createInstance(entityClass);
        const seen = new WeakSet();
        const safeInput = (0, deepcopy_1.default)(input, {
            customizer: (obj) => {
                if (obj instanceof Error) {
                    return {
                        name: obj.name,
                        message: obj.message,
                        stack: obj.stack,
                    };
                }
                if (typeof obj === 'bigint') {
                    return obj.toString();
                }
                if (typeof obj === 'object' && obj !== null) {
                    if (seen.has(obj)) {
                        return;
                    }
                    seen.add(obj);
                }
                return obj;
            },
        });
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