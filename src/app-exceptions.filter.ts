import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Inject,
  LoggerService,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import * as Sentry from '@sentry/node';
import { ZodValidationException, createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { LOGGER_SERVICE_PORT } from '@app/logger/logger.module';
import { ClsService } from 'nestjs-cls';
import { correlationIdKey } from '@app/correlation/correlation.constants';
import { safeInstantiateEntity } from '@app/utils/entity.utils';

const FieldErrorEntitySchema = z.object({
  fieldPath: z.string(),
  messages: z.array(z.string()),
});

export class FieldErrorEntity extends createZodDto(FieldErrorEntitySchema) {}

const ExceptionResponseEntitySchema = z.object({
  statusCode: z.number(),
  message: z.string(),
  errors: z.array(FieldErrorEntitySchema),
});

export class ExceptionResponseEntity extends createZodDto(
  ExceptionResponseEntitySchema,
) {}

@Catch()
export class AppExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    @Inject(LOGGER_SERVICE_PORT)
    private readonly loggerService: LoggerService,
    private readonly clsService: ClsService,
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const { statusCode, message, errors } = this.prepareResponse(exception);
    if (
      statusCode === +HttpStatus.INTERNAL_SERVER_ERROR ||
      statusCode === +HttpStatus.NOT_IMPLEMENTED ||
      statusCode === +HttpStatus.BAD_GATEWAY ||
      statusCode === +HttpStatus.SERVICE_UNAVAILABLE ||
      statusCode === +HttpStatus.GATEWAY_TIMEOUT ||
      statusCode === +HttpStatus.HTTP_VERSION_NOT_SUPPORTED
    ) {
      if (exception instanceof Error) {
        Sentry.captureException(exception);
        this.loggerService.error(
          `[${this.clsService.getId()}] ${exception.message}`,
          { exception },
        );
      } else {
        const errorMessage = `[${this.clsService.getId()}] AppExceptionsFilter.unexpectedError`;
        Sentry.captureException(new Error(errorMessage));
        this.loggerService.error(errorMessage, {
          exception,
          tempTest: 'Hi Lorena v2!',
        });
      }
    } else {
      this.loggerService.log(
        `[${this.clsService.getId()}] AppExceptionsFilter.catch`,
        {
          [correlationIdKey]: this.clsService.getId(),
          statusCode,
          message,
          errors,
          exception,
        },
      );
    }

    const responseBody = safeInstantiateEntity(ExceptionResponseEntity, {
      statusCode,
      message,
      errors,
    });

    httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);
  }

  prepareResponse(exception: unknown) {
    if (exception instanceof ZodValidationException) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message:
          'Um ou mais campos são inválidos. Verifique os campos informados e tente novamente.',
        errors: this.getErrors(exception),
      };
    } else if (exception instanceof HttpException) {
      return {
        statusCode: exception.getStatus(),
        message: exception.message,
        errors: [],
      };
    } else {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message:
          'Um erro inesperado ocorreu em nossos servidores. Tente novamente. Se o erro persistir entre em contato com nosso suporte.',
        errors: [],
      };
    }
  }

  getErrors(exception: ZodValidationException): FieldErrorEntity[] {
    try {
      const errors = exception.getZodError().errors;
      const messagesByFieldPath: Record<string, string[]> = {};
      for (const error of errors) {
        const fieldPath = error.path.join('.');
        if (fieldPath in messagesByFieldPath) {
          messagesByFieldPath[fieldPath].push(error.message);
        } else {
          messagesByFieldPath[fieldPath] = [error.message];
        }
      }
      return Object.entries(messagesByFieldPath).map(
        ([fieldPath, messages]) => ({
          fieldPath,
          messages,
        }),
      );
    } catch {
      return [];
    }
  }

  isArrayOfStrings(value: unknown): value is string[] {
    return (
      Array.isArray(value) && value.every((item) => typeof item === 'string')
    );
  }
}
