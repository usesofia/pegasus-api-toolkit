/* istanbul ignore file */
import { AppExceptionsFilter } from '@app/app-exceptions.filter';
import { BASE_CONFIG, BaseConfigEntity } from '@app/config/base-config.entity';
import { LOGGER_SERVICE_PORT } from '@app/logger/logger.module';
import { getJsonStringifyReplacer } from '@app/utils/json.utils';
import { NestApplicationOptions, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { ClsService } from 'nestjs-cls';
import { cleanupOpenApiDoc, ZodValidationPipe } from 'nestjs-zod';
import dns from 'dns';

dns.setDefaultResultOrder('ipv4first');

mongoose.Schema.Types.String.checkRequired((v: unknown) => v !== null && v !== undefined);

export function setupApp({
  app,
  version,
}: {
  app: NestFastifyApplication;
  version: string;
}) {
  // Configure the FastifyAdapter to use JSON.stringify for serialization
  app
    .getHttpAdapter()
    .getInstance()
    .setReplySerializer((data: unknown) =>
      JSON.stringify(data, getJsonStringifyReplacer()),
    );

  app.useLogger(app.get(LOGGER_SERVICE_PORT));
  app.useGlobalFilters(
    new AppExceptionsFilter(
      app.get(HttpAdapterHost),
      app.get(LOGGER_SERVICE_PORT),
      app.get(ClsService),
    ),
  );
  app.useGlobalPipes(
    new ZodValidationPipe(),
    new ValidationPipe({
      transform: true,
    }),
  );
  app.enableCors();
  app.enableShutdownHooks();

  const baseConfig = app.get<BaseConfigEntity>(BASE_CONFIG);

  const swaggerDocument = new DocumentBuilder()
    .setTitle(baseConfig.swagger.title)
    .setDescription(baseConfig.swagger.description)
    .setVersion(version)
    .build();

  const document = SwaggerModule.createDocument(app, swaggerDocument);
  SwaggerModule.setup('/external/docs', app, cleanupOpenApiDoc(document));
}

export const appOptions: NestApplicationOptions = {
  rawBody: true,
  bufferLogs: false,
};

export const fastifyOptions = {
  bodyLimit: 100000000,
};
