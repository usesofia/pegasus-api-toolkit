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
exports.LoggerModule = exports.LOGGER_SERVICE_PORT = void 0;
const common_1 = require("@nestjs/common");
const pino_logger_1 = require("./pino-logger");
const morgan = require("morgan");
const correlation_constants_1 = require("../correlation/correlation.constants");
exports.LOGGER_SERVICE_PORT = Symbol('LoggerServicePort');
morgan.token(correlation_constants_1.correlationIdTokenKey, (req) => req[correlation_constants_1.correlationIdKey]);
let LoggerModule = class LoggerModule {
    constructor(pinoLoggerAdapter, loggerService) {
        this.pinoLoggerAdapter = pinoLoggerAdapter;
        this.loggerService = loggerService;
    }
    async onApplicationShutdown() {
        await this.pinoLoggerAdapter.flush();
        await new Promise((resolve) => setTimeout(resolve, 4000));
    }
    configure(consumer) {
        consumer
            .apply(morgan((tokens, req, res) => {
            return [
                `[${tokens[correlation_constants_1.correlationIdTokenKey](req, res)}]`,
                tokens.method(req, res),
                tokens.url(req, res),
                tokens.status(req, res),
                tokens.res(req, res, 'content-length'),
                'bytes',
                tokens['response-time'](req, res),
                'ms',
            ].join(' ');
        }, {
            stream: {
                write: (message) => {
                    const [correlationIdWithBrackets, method, url, statusCodeString, contentLengthString, _, responseTimeInMsString, __,] = message.split(' ');
                    const correlationId = correlationIdWithBrackets.replace(/\[|\]/g, '');
                    const statusCode = parseInt(statusCodeString);
                    const contentLengthInBytes = contentLengthString
                        ? parseInt(contentLengthString)
                        : 0;
                    const responseTimeInMs = parseFloat(responseTimeInMsString);
                    const parsedMessage = [
                        correlationIdWithBrackets,
                        method,
                        url,
                        statusCodeString,
                        contentLengthInBytes,
                        'bytes',
                        responseTimeInMsString,
                        'ms',
                    ].join(' ');
                    this.loggerService.log(parsedMessage.replace(/\n$/, ''), {
                        correlationId,
                        method,
                        url,
                        statusCode,
                        contentLengthInBytes,
                        responseTimeInMs,
                    });
                },
            },
        }))
            .forRoutes('*');
    }
};
exports.LoggerModule = LoggerModule;
exports.LoggerModule = LoggerModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [
            pino_logger_1.PinoLoggerAdapter,
            {
                provide: exports.LOGGER_SERVICE_PORT,
                useFactory: (pinoLoggerAdapter) => {
                    return pinoLoggerAdapter;
                },
                inject: [pino_logger_1.PinoLoggerAdapter],
            },
        ],
        exports: [exports.LOGGER_SERVICE_PORT],
    }),
    __param(0, (0, common_1.Inject)(pino_logger_1.PinoLoggerAdapter)),
    __param(1, (0, common_1.Inject)(exports.LOGGER_SERVICE_PORT)),
    __metadata("design:paramtypes", [pino_logger_1.PinoLoggerAdapter, Object])
], LoggerModule);
//# sourceMappingURL=logger.module.js.map