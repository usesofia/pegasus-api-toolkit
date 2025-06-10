"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeInstantiateEntity = safeInstantiateEntity;
exports.unsafeInstantiateEntity = unsafeInstantiateEntity;
const typia_1 = require("typia");
const common_1 = require("@nestjs/common");
function createInstance(c) {
    return new c();
}
function transformClonedInputForZod(data, seen = new WeakSet()) {
    if (typeof data === 'bigint') {
        return data.toString();
    }
    if (data instanceof Error) {
        return {
            name: data.name,
            message: data.message,
            stack: data.stack,
        };
    }
    if (data === null || typeof data !== 'object') {
        return data;
    }
    if (seen.has(data)) {
        return data;
    }
    seen.add(data);
    if (Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
            data[i] = transformClonedInputForZod(data[i], seen);
        }
    }
    else {
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                data[key] = transformClonedInputForZod(data[key], seen);
            }
        }
    }
    return data;
}
function safeInstantiateEntity(entityClass, input) {
    try {
        const clonedInput = typia_1.default.misc.clone(input);
        const transformedInput = transformClonedInputForZod(clonedInput);
        return entityClass.create(transformedInput);
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