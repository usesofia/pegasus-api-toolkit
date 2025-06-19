import { INestApplication, Logger, DynamicModule, Type } from '@nestjs/common';
import { config } from 'dotenv';
// Load .env.integration-test file
config({ path: '.env.integration-test' });
import supertest from 'supertest';
import { Test, TestingModuleBuilder } from '@nestjs/testing';
import { ClsModule } from 'nestjs-cls';
import { v4 } from 'uuid';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import portfinder from 'portfinder';
import { MongoClient } from 'mongodb';
import { EventEmitter } from 'events';
import { LoggerModule } from '@app/logger/logger.module';
import {
  correlationIdHeaderKey,
  correlationIdKey,
} from '@app/correlation/correlation.constants';
import { PrimaryMongoDbDatabaseModule } from '@app/database/primary-mongodb-database.module';
import { PubSubModule } from '@app/pub-sub/pub-sub.module';
import { CacheModule } from '@app/cache/cache.module';
import { ClerkModule } from '@app/clerk/clerk.module';
import { AuthModule } from '@app/auth/auth.module';
import { fastifyOptions, setupApp } from '@app/utils/setup.utils';
import { TasksModule } from '@app/tasks/tasks.module';
import { BASE_CONFIG, BaseConfigEntity } from '@app/config/base-config.entity';
import { SentryModule } from '@app/sentry/sentry.module';
import { FilesModule } from '@app/files/files.module';

EventEmitter.defaultMaxListeners = 128;

export const buildClsModule = () => {
  return ClsModule.forRoot({
    global: true,
    middleware: {
      mount: true,
      generateId: true,
      idGenerator(req: {
        headers: Record<string, string | undefined>;
        [correlationIdKey]: string;
      }): string {
        req[correlationIdKey] =
          req.headers[correlationIdHeaderKey] ?? v4();
        return req[correlationIdKey];
      },
    },
  });
};

export class InstanceFixture {
  app: INestApplication;
  request: ReturnType<typeof supertest>;
  mongoClient: MongoClient;
  primaryMongoClient?: MongoClient;
  secondaryMongoClient?: MongoClient;
  baseConfig: BaseConfigEntity;

  constructor({
    app,
    request,
    mongoClient,
    primaryMongoClient,
    secondaryMongoClient,
  }: {
    app: INestApplication;
    request: ReturnType<typeof supertest>;
    mongoClient: MongoClient;
    primaryMongoClient?: MongoClient;
    secondaryMongoClient?: MongoClient;
  }) {
    this.app = app;
    this.request = request;
    this.mongoClient = mongoClient;
    this.primaryMongoClient = primaryMongoClient;
    this.secondaryMongoClient = secondaryMongoClient;
    this.baseConfig = app.get<BaseConfigEntity>(BASE_CONFIG);
  }

  static createTestingModule({
    modules,
    log = false,
  }: {
    modules: (Type | DynamicModule)[];
    log?: boolean;
  }): TestingModuleBuilder {
    let moduleRef = Test.createTestingModule({
      imports: [
        LoggerModule,
        buildClsModule(),
        PrimaryMongoDbDatabaseModule,
        PubSubModule,
        TasksModule,
        CacheModule,
        ClerkModule,
        AuthModule,
        SentryModule,
        FilesModule,
        ...modules,
      ],
    });

    if (log) {
      moduleRef = moduleRef.setLogger(new Logger());
    }

    return moduleRef;
  }

  static async build({
    moduleRef,
  }: {
    moduleRef: TestingModuleBuilder;
  }): Promise<InstanceFixture> {
    const testModule = await moduleRef.compile();
    const app = testModule.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(fastifyOptions),
    );

    setupApp({
      app,
      version: '1.0.0',
    });

    const maxRetries = 16;
    let lastError: Error | null = null;

    const mongoDbUri =
      process.env.MONGODB_URI ?? process.env.PRIMARY_MONGODB_URI;

    if (!mongoDbUri) {
      throw new Error('MONGODB_URI or PRIMARY_MONGODB_URI is not set');
    }

    const primaryMongoDbUri = process.env.PRIMARY_MONGODB_URI ?? process.env.MONGODB_URI;
    const secondaryMongoDbUri = process.env.SECONDARY_MONGODB_URI;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const port = await portfinder.getPortPromise();
        const url = `http://localhost:${port.toString()}`;
        await app.listen(port);
        const request = supertest(url);
        const mongoClient = new MongoClient(mongoDbUri, {
          retryReads: true,
          retryWrites: true,
        });
        let primaryMongoClient: MongoClient | undefined;
        if (primaryMongoDbUri) {
          primaryMongoClient = new MongoClient(primaryMongoDbUri, {
            retryReads: true,
            retryWrites: true,
          });
        }
        let secondaryMongoClient: MongoClient | undefined;
        if (secondaryMongoDbUri) {
          secondaryMongoClient = new MongoClient(secondaryMongoDbUri, {
            retryReads: true,
            retryWrites: true,
          });
        }
        return new InstanceFixture({ app, request, mongoClient, primaryMongoClient, secondaryMongoClient });
      } catch (error) {
        lastError = error as Error;
        if (attempt === maxRetries) {
          console.error(lastError);
          throw new Error(
            `Failed to start app after ${maxRetries.toString()} attempts. Last error: ${lastError.message}.`,
          );
        }
        // Wait for a short time before retrying
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    }

    throw new Error('Failed to start app.');
  }

  getCurrentCorrelationId() {
    return expect.getState().currentTestName?.split('|')[1].trim() ?? v4();
  }

  async teardown() {
    await this.app.close();
    await this.mongoClient.close();
  }
}

export const getCurrentCorrelationId = () => {
  return expect.getState().currentTestName?.split('|')[1].trim() ?? v4();
};
