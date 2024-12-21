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
exports.AppExceptionsFilter = exports.ExceptionResponseEntity = exports.FieldErrorEntity = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const Sentry = require("@sentry/node");
const nestjs_zod_1 = require("nestjs-zod");
const zod_1 = require("zod");
const logger_module_1 = require("./logger/logger.module");
const nestjs_cls_1 = require("nestjs-cls");
const correlation_constants_1 = require("./correlation/correlation.constants");
const entity_utils_1 = require("./utils/entity.utils");
const FieldErrorEntitySchema = zod_1.z.object({
    fieldPath: zod_1.z.string(),
    messages: zod_1.z.array(zod_1.z.string()),
});
class FieldErrorEntity extends (0, nestjs_zod_1.createZodDto)(FieldErrorEntitySchema) {
}
exports.FieldErrorEntity = FieldErrorEntity;
const ExceptionResponseEntitySchema = zod_1.z.object({
    statusCode: zod_1.z.number(),
    message: zod_1.z.string(),
    errors: zod_1.z.array(FieldErrorEntitySchema),
});
class ExceptionResponseEntity extends (0, nestjs_zod_1.createZodDto)(ExceptionResponseEntitySchema) {
}
exports.ExceptionResponseEntity = ExceptionResponseEntity;
let AppExceptionsFilter = class AppExceptionsFilter {
    constructor(httpAdapterHost, loggerService, clsService) {
        this.httpAdapterHost = httpAdapterHost;
        this.loggerService = loggerService;
        this.clsService = clsService;
    }
    catch(exception, host) {
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();
        const { statusCode, message, errors } = this.prepareResponse(exception);
        if (statusCode === common_1.HttpStatus.INTERNAL_SERVER_ERROR ||
            statusCode === common_1.HttpStatus.NOT_IMPLEMENTED ||
            statusCode === common_1.HttpStatus.BAD_GATEWAY ||
            statusCode === common_1.HttpStatus.SERVICE_UNAVAILABLE ||
            statusCode === common_1.HttpStatus.GATEWAY_TIMEOUT ||
            statusCode === common_1.HttpStatus.HTTP_VERSION_NOT_SUPPORTED) {
            if (exception instanceof Error) {
                Sentry.captureException(exception, {
                    extra: {
                        [correlation_constants_1.correlationIdKey]: this.clsService.getId(),
                    },
                });
                this.loggerService.error(`[${this.clsService.getId()}] ${exception.message}`, exception);
            }
            else {
                const errorMessage = `[${this.clsService.getId()}] AppExceptionsFilter.unexpectedError`;
                Sentry.captureException(new Error(errorMessage), {
                    extra: {
                        [correlation_constants_1.correlationIdKey]: this.clsService.getId(),
                    },
                });
                this.loggerService.error(errorMessage, exception);
            }
        }
        else {
            this.loggerService.log(`[${this.clsService.getId()}] AppExceptionsFilter.catch`, {
                [correlation_constants_1.correlationIdKey]: this.clsService.getId(),
                statusCode,
                message,
                errors,
            });
        }
        const responseBody = (0, entity_utils_1.safeInstantiateEntity)(ExceptionResponseEntity, {
            statusCode,
            message,
            errors,
        });
        httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);
    }
    prepareResponse(exception) {
        if (exception instanceof nestjs_zod_1.ZodValidationException) {
            return {
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: 'Um ou mais campos são inválidos. Verifique os campos informados e tente novamente.',
                errors: this.getErrors(exception),
            };
        }
        else if (exception instanceof common_1.UnauthorizedException) {
            return {
                statusCode: common_1.HttpStatus.UNAUTHORIZED,
                message: 'Você precisa estar autenticado para realizar a chamada em questão.',
                errors: [],
            };
        }
        else if (exception instanceof common_1.ForbiddenException) {
            return {
                statusCode: common_1.HttpStatus.FORBIDDEN,
                message: 'Você não tem permissão para realizar a chamada em questão.',
                errors: [],
            };
        }
        else if (exception instanceof common_1.HttpException) {
            return {
                statusCode: exception.getStatus(),
                message: exception.message,
                errors: [],
            };
        }
        else {
            return {
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Um erro inesperado ocorreu em nossos servidores. Tente novamente. Se o erro persistir entre em contato com nosso suporte.',
                errors: [],
            };
        }
    }
    getErrors(exception) {
        try {
            const errors = exception.getZodError().errors;
            const messagesByFieldPath = {};
            for (const error of errors) {
                const fieldPath = error.path.join('.');
                if (fieldPath in messagesByFieldPath) {
                    messagesByFieldPath[fieldPath].push(error.message);
                }
                else {
                    messagesByFieldPath[fieldPath] = [error.message];
                }
            }
            return Object.entries(messagesByFieldPath).map(([fieldPath, messages]) => ({
                fieldPath,
                messages,
            }));
        }
        catch (_) {
            return [];
        }
    }
    isArrayOfStrings(value) {
        return (Array.isArray(value) && value.every((item) => typeof item === 'string'));
    }
};
exports.AppExceptionsFilter = AppExceptionsFilter;
exports.AppExceptionsFilter = AppExceptionsFilter = __decorate([
    (0, common_1.Catch)(),
    __param(1, (0, common_1.Inject)(logger_module_1.LOGGER_SERVICE_PORT)),
    __metadata("design:paramtypes", [core_1.HttpAdapterHost, Object, nestjs_cls_1.ClsService])
], AppExceptionsFilter);
//# sourceMappingURL=app-exceptions.filter.js.map