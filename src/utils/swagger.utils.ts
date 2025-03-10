import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import { MongoMemoryReplSet } from 'mongodb-memory-server';
import { appOptions, setupApp } from '@app/utils/setup.utils';
import { DynamicModule, Type } from '@nestjs/common';
import { BASE_CONFIG, BaseConfigEntity } from '@app/config/base-config.entity';

export async function generateSwaggerJson({
  AppModule,
  version,
}: {
  AppModule: Type | DynamicModule;
  version: string;
}) {
  const replset = await MongoMemoryReplSet.create({ replSet: { count: 1 } });
  process.env.MONGODB_URI = replset.getUri();

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    appOptions,
  );
  
  setupApp({ app, version });

  const baseConfig = app.get<BaseConfigEntity>(BASE_CONFIG);

  const swaggerDocument = new DocumentBuilder()
    .setTitle(baseConfig.swagger.title)
    .setDescription(baseConfig.swagger.description)
    .setVersion(version)
    .build();

  const document: OpenAPIObject = SwaggerModule.createDocument(
    app,
    swaggerDocument,
  );

  fs.writeFileSync(`swagger.json`, JSON.stringify(document, null, 2));
  await app.close();
  await replset.stop();
  process.exit(0);
}
