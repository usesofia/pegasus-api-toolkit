"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PinoLoggerAdapter = void 0;
const pino_1 = require("pino");
const common_1 = require("@nestjs/common");
const nested_mask_attributes_1 = require("nested-mask-attributes");
const base_config_entity_1 = require("../config/base-config.entity");
const sensitiveFields = [
    'password',
    'passwordHash',
    'accessToken',
    'refreshToken',
    'code',
    'token',
];
const getStringfyReplacer = () => {
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
};
let PinoLoggerAdapter = class PinoLoggerAdapter {
    constructor(baseConfig) {
        this.baseConfig = baseConfig;
        this.remoteLogger = (0, pino_1.default)({
            transport: {
                target: '@logtail/pino',
                options: {
                    sourceToken: baseConfig.logger.betterStackSourceToken,
                    options: {
                        batchInterval: 100,
                        retryCount: 16,
                        retryBackoff: 400,
                    },
                },
            },
            level: baseConfig.logger.level,
        });
        this.consoleLogger = (0, pino_1.default)({
            transport: {
                target: 'pino-pretty',
            },
            level: baseConfig.logger.level,
        });
        this.shouldConsoleLog = baseConfig.logger.consoleLog;
        this.environment = baseConfig.env.toString();
    }
    logLevel(level, message, ...optionalParams) {
        let data = {
            environment: this.environment,
        };
        if (optionalParams.length === 1 &&
            typeof optionalParams[0] === 'object' &&
            !(optionalParams[0] instanceof Error)) {
            data = {
                ...(0, nested_mask_attributes_1.maskAttribute)(JSON.parse(JSON.stringify(optionalParams[0], getStringfyReplacer())), sensitiveFields, {
                    action: nested_mask_attributes_1.MaskActions.MASK,
                }),
                environment: this.environment,
            };
        }
        else if (optionalParams.length === 1 &&
            optionalParams[0] instanceof Error) {
            data = {
                environment: this.environment,
                err: optionalParams[0],
            };
        }
        switch (level) {
            case 'log':
                this.remoteLogger.info(data, `${message}`);
                if (this.shouldConsoleLog)
                    this.consoleLogger.info(data, message);
                break;
            case 'error':
                this.remoteLogger.error(data, message);
                if (this.shouldConsoleLog)
                    this.consoleLogger.error(data, message);
                break;
            case 'warn':
                this.remoteLogger.warn(data, message);
                if (this.shouldConsoleLog)
                    this.consoleLogger.warn(data, message);
                break;
            case 'debug':
                this.remoteLogger.debug(data, message);
                if (this.shouldConsoleLog)
                    this.consoleLogger.debug(data, message);
                break;
            case 'verbose':
                this.remoteLogger.info(data, message);
                if (this.shouldConsoleLog)
                    this.consoleLogger.info(data, message);
                break;
            case 'fatal':
                this.remoteLogger.fatal(data, message);
                if (this.shouldConsoleLog)
                    this.consoleLogger.error(data, message);
                break;
            default:
                throw new Error('Invalid log level.');
        }
    }
    log(message, ...optionalParams) {
        this.logLevel('log', message, ...optionalParams);
    }
    error(message, ...optionalParams) {
        this.logLevel('error', message, ...optionalParams);
    }
    warn(message, ...optionalParams) {
        this.logLevel('warn', message, ...optionalParams);
    }
    debug(message, ...optionalParams) {
        this.logLevel('debug', message, ...optionalParams);
    }
    verbose(message, ...optionalParams) {
        this.logLevel('verbose', message, ...optionalParams);
    }
    fatal(message, ...optionalParams) {
        this.logLevel('fatal', message, ...optionalParams);
    }
    setLogLevels(_) {
        throw new Error('Not implemented.');
    }
    async flush() {
        await new Promise((resolve) => {
            this.remoteLogger.flush((_) => {
                resolve();
            });
        });
    }
};
exports.PinoLoggerAdapter = PinoLoggerAdapter;
exports.PinoLoggerAdapter = PinoLoggerAdapter = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(base_config_entity_1.BASE_CONFIG)),
    __metadata("design:paramtypes", [base_config_entity_1.BaseConfigEntity])
], PinoLoggerAdapter);
//# sourceMappingURL=pino-logger.js.map