import { INestApplication, DynamicModule, Type } from '@nestjs/common';
import * as supertest from 'supertest';
import { TestingModuleBuilder } from '@nestjs/testing';
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
    static build({ moduleRef, fastifyOptions, }: {
        moduleRef: TestingModuleBuilder;
        fastifyOptions: {
            bodyLimit: number;
        };
    }): Promise<InstanceFixture>;
    getCurrentCorrelationId(): string;
    teardown(): Promise<void>;
}
