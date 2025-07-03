import { INestApplication, DynamicModule, Type } from '@nestjs/common';
import supertest from 'supertest';
import { TestingModuleBuilder } from '@nestjs/testing';
import { MongoClient } from 'mongodb';
import { BaseConfigEntity } from '../config/base-config.entity';
export declare const buildClsModule: () => DynamicModule;
export declare class InstanceFixture {
    app: INestApplication;
    request: ReturnType<typeof supertest>;
    mongoClient: MongoClient;
    primaryMongoClient?: MongoClient;
    secondaryMongoClient?: MongoClient;
    baseConfig: BaseConfigEntity;
    constructor({ app, request, mongoClient, primaryMongoClient, secondaryMongoClient, }: {
        app: INestApplication;
        request: ReturnType<typeof supertest>;
        mongoClient: MongoClient;
        primaryMongoClient?: MongoClient;
        secondaryMongoClient?: MongoClient;
    });
    static createTestingModule({ modules, log, }: {
        modules: (Type | DynamicModule)[];
        log?: boolean;
    }): TestingModuleBuilder;
    static build({ moduleRef, }: {
        moduleRef: TestingModuleBuilder;
    }): Promise<InstanceFixture>;
    getCurrentCorrelationId(): string;
    teardown(): Promise<void>;
}
export declare const getCurrentCorrelationId: () => string;
