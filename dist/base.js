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
    logLevel({ functionName, level, suffix, data, correlationId, }) {
        switch (level) {
            case 'log':
                this.logger.log(`[${correlationId ?? this.cls.getId()}] ${this.className}.${functionName}.${suffix}`, {
                    [correlation_constants_1.correlationIdKey]: correlationId ?? this.cls.getId(),
                    ...data,
                });
                break;
            case 'error':
                this.logger.error(`[${correlationId ?? this.cls.getId()}] ${this.className}.${functionName}.${suffix}`, {
                    [correlation_constants_1.correlationIdKey]: correlationId ?? this.cls.getId(),
                    ...data,
                });
                break;
            case 'warn':
                this.logger.warn(`[${correlationId ?? this.cls.getId()}] ${this.className}.${functionName}.${suffix}`, {
                    [correlation_constants_1.correlationIdKey]: correlationId ?? this.cls.getId(),
                    ...data,
                });
                break;
            case 'debug':
                this.logger.debug(`[${correlationId ?? this.cls.getId()}] ${this.className}.${functionName}.${suffix}`, {
                    [correlation_constants_1.correlationIdKey]: correlationId ?? this.cls.getId(),
                    ...data,
                });
                break;
            case 'verbose':
                this.logger.verbose(`[${correlationId ?? this.cls.getId()}] ${this.className}.${functionName}.${suffix}`, {
                    [correlation_constants_1.correlationIdKey]: correlationId ?? this.cls.getId(),
                    ...data,
                });
                break;
            case 'fatal':
                this.logger.fatal(`[${correlationId ?? this.cls.getId()}] ${this.className}.${functionName}.${suffix}`, {
                    [correlation_constants_1.correlationIdKey]: correlationId ?? this.cls.getId(),
                    ...data,
                });
                break;
            default:
                throw new Error('Invalid log level.');
        }
    }
    log({ functionName, suffix, data, correlationId, }) {
        this.logLevel({
            functionName,
            level: 'log',
            suffix,
            data,
            correlationId,
        });
    }
    logDebug({ functionName, suffix, data, correlationId, }) {
        this.logLevel({
            functionName,
            level: 'debug',
            suffix,
            data,
            correlationId,
        });
    }
    logError({ functionName, suffix, data, correlationId, }) {
        this.logLevel({
            functionName,
            level: 'error',
            suffix,
            data,
            correlationId,
        });
    }
    logWarn({ functionName, suffix, data, correlationId, }) {
        this.logLevel({ functionName, level: 'warn', suffix, data, correlationId });
    }
    logFatal({ functionName, suffix, data, correlationId, }) {
        this.logLevel({
            functionName,
            level: 'fatal',
            suffix,
            data,
            correlationId,
        });
    }
    logVerbose({ functionName, suffix, data, correlationId, }) {
        this.logLevel({
            functionName,
            level: 'verbose',
            suffix,
            data,
            correlationId,
        });
    }
}
exports.Base = Base;
//# sourceMappingURL=base.js.map