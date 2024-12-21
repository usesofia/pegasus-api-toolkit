"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Base = void 0;
const correlation_constants_1 = require("./correlation/correlation.constants");
class Base {
    constructor(className, baseConfig, logger, cls) {
        this.className = className;
        this.baseConfig = baseConfig;
        this.logger = logger;
        this.cls = cls;
    }
    logLevel({ functionName, level, suffix, data, }) {
        switch (level) {
            case 'log':
                this.logger.log(`[${this.cls.getId()}] ${this.className}.${functionName}.${suffix}`, {
                    [correlation_constants_1.correlationIdKey]: this.cls.getId(),
                    ...data,
                });
                break;
            case 'error':
                this.logger.error(`[${this.cls.getId()}] ${this.className}.${functionName}.${suffix}`, {
                    [correlation_constants_1.correlationIdKey]: this.cls.getId(),
                    ...data,
                });
                break;
            case 'warn':
                this.logger.warn(`[${this.cls.getId()}] ${this.className}.${functionName}.${suffix}`, {
                    [correlation_constants_1.correlationIdKey]: this.cls.getId(),
                    ...data,
                });
                break;
            case 'debug':
                this.logger.debug(`[${this.cls.getId()}] ${this.className}.${functionName}.${suffix}`, {
                    [correlation_constants_1.correlationIdKey]: this.cls.getId(),
                    ...data,
                });
                break;
            case 'verbose':
                this.logger.verbose(`[${this.cls.getId()}] ${this.className}.${functionName}.${suffix}`, {
                    [correlation_constants_1.correlationIdKey]: this.cls.getId(),
                    ...data,
                });
                break;
            case 'fatal':
                this.logger.fatal(`[${this.cls.getId()}] ${this.className}.${functionName}.${suffix}`, {
                    [correlation_constants_1.correlationIdKey]: this.cls.getId(),
                    ...data,
                });
                break;
            default:
                throw new Error('Invalid log level.');
        }
    }
    log({ functionName, suffix, data, }) {
        this.logLevel({
            functionName,
            level: 'log',
            suffix,
            data,
        });
    }
    logDebug({ functionName, suffix, data, }) {
        this.logLevel({ functionName, level: 'debug', suffix, data });
    }
    logError({ functionName, suffix, data, }) {
        this.logLevel({ functionName, level: 'error', suffix, data });
    }
    logWarn({ functionName, suffix, data, }) {
        this.logLevel({ functionName, level: 'warn', suffix, data });
    }
    logFatal({ functionName, suffix, data, }) {
        this.logLevel({ functionName, level: 'fatal', suffix, data });
    }
    logVerbose({ functionName, suffix, data, }) {
        this.logLevel({ functionName, level: 'verbose', suffix, data });
    }
}
exports.Base = Base;
//# sourceMappingURL=base.js.map