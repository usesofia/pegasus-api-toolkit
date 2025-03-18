"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = Log;
function Log(level = 'debug') {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            const instance = this;
            const functionName = propertyKey;
            instance.logLevel({
                functionName,
                level,
                suffix: 'input',
                data: { args },
            });
            try {
                const result = originalMethod.apply(this, args);
                if (result instanceof Promise) {
                    return result
                        .then((resolvedResult) => {
                        instance.logLevel({
                            functionName,
                            level,
                            suffix: 'output',
                            data: { result: resolvedResult },
                        });
                        return resolvedResult;
                    })
                        .catch((error) => {
                        instance.logLevel({
                            functionName,
                            level: 'warn',
                            suffix: 'error',
                            data: { error },
                        });
                        throw error;
                    });
                }
                instance.logLevel({
                    functionName,
                    level,
                    suffix: 'output',
                    data: { result },
                });
                return result;
            }
            catch (error) {
                instance.logLevel({
                    functionName,
                    level: 'warn',
                    suffix: 'treatableError',
                    data: { error },
                });
                throw error;
            }
        };
        return descriptor;
    };
}
//# sourceMappingURL=log.utils.js.map