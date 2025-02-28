import { INestApplication, DynamicModule, Type } from '@nestjs/common';
import * as supertest from 'supertest';
import { TestingModuleBuilder } from '@nestjs/testing';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { MongoClient } from 'mongodb';
export declare class InstanceFixture {
    app: INestApplication;
    request: ReturnType<typeof supertest>;
    mongoClient: MongoClient;
    constructor({ app, request, mongoClient, }: {
        app: INestApplication;
        request: ReturnType<typeof supertest>;
        mongoClient: MongoClient;
    });
    static createTestingModule({ modules, log, }: {
        modules: Array<Type | DynamicModule>;
        log?: boolean;
    }): TestingModuleBuilder;
    static build({ moduleRef, fastifyOptions, setupApp, }: {
        moduleRef: TestingModuleBuilder;
        fastifyOptions: {
            bodyLimit: number;
        };
        setupApp: (app: NestFastifyApplication) => void;
    }): Promise<InstanceFixture>;
    getCurrentCorrelationId(): string;
    teardown(): Promise<void>;
}
