import { ExceptionFilter, ArgumentsHost, HttpStatus, LoggerService } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ZodValidationException } from 'nestjs-zod';
import { z } from 'zod';
import { ClsService } from 'nestjs-cls';
declare const FieldErrorEntity_base: import("nestjs-zod").ZodDto<{
    fieldPath: string;
    messages: string[];
}, z.ZodObjectDef<{
    fieldPath: z.ZodString;
    messages: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny>, {
    fieldPath: string;
    messages: string[];
}>;
export declare class FieldErrorEntity extends FieldErrorEntity_base {
}
declare const ExceptionResponseEntity_base: import("nestjs-zod").ZodDto<{
    message: string;
    statusCode: number;
    errors: {
        fieldPath: string;
        messages: string[];
    }[];
}, z.ZodObjectDef<{
    statusCode: z.ZodNumber;
    message: z.ZodString;
    errors: z.ZodArray<z.ZodObject<{
        fieldPath: z.ZodString;
        messages: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        fieldPath: string;
        messages: string[];
    }, {
        fieldPath: string;
        messages: string[];
    }>, "many">;
}, "strip", z.ZodTypeAny>, {
    message: string;
    statusCode: number;
    errors: {
        fieldPath: string;
        messages: string[];
    }[];
}>;
export declare class ExceptionResponseEntity extends ExceptionResponseEntity_base {
}
export declare class AppExceptionsFilter implements ExceptionFilter {
    private readonly httpAdapterHost;
    private readonly loggerService;
    private readonly clsService;
    constructor(httpAdapterHost: HttpAdapterHost, loggerService: LoggerService, clsService: ClsService);
    catch(exception: unknown, host: ArgumentsHost): void;
    prepareResponse(exception: unknown): {
        statusCode: HttpStatus;
        message: string;
        errors: FieldErrorEntity[];
    } | {
        statusCode: number;
        message: string;
        errors: never[];
    };
    getErrors(exception: ZodValidationException): FieldErrorEntity[];
    isArrayOfStrings(value: unknown): value is string[];
}
export {};
