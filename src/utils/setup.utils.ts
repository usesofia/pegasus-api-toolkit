/* istanbul ignore file */
import { BASE_CONFIG, BaseConfigEntity } from '@app/config/base-config.entity';
import { LOGGER_SERVICE_PORT } from '@app/logger/logger.module';
import { getJsonStringfyReplacer } from '@app/utils/json.utils';
import { NestApplicationOptions, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as Sentry from '@sentry/node';
import { nodeProfilingIntegration } from '@sentry/profiling-node';
import { ClsService } from 'nestjs-cls';
import { patchNestJsSwagger, ZodValidationPipe } from 'nestjs-zod';
import { AppExceptionsFilter } from '@app/app-exceptions.filter';

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
      JSON.stringify(data, getJsonStringfyReplacer()),
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
  patchNestJsSwagger();

  const baseConfig = app.get<BaseConfigEntity>(BASE_CONFIG);

  if (baseConfig.sentry.enabled) {
    Sentry.init({
      dsn: baseConfig.sentry.dsn,
      integrations: [nodeProfilingIntegration()],
      environment: baseConfig.env,
      release: version,
      tracesSampleRate: 0.05,
      profilesSampleRate: 0.05,
    });
  }

  const swaggerDocument = new DocumentBuilder()
    .setTitle(baseConfig.swagger.title)
    .setDescription(baseConfig.swagger.description)
    .setVersion(version)
    .build();

  const document = SwaggerModule.createDocument(app, swaggerDocument);
  SwaggerModule.setup('/external/docs', app, document);
}

export const appOptions: NestApplicationOptions = {
  rawBody: true,
  bufferLogs: false,
};

export const fastifyOptions = {
  bodyLimit: 100000000,
};
