"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentCorrelationId = exports.InstanceFixture = exports.buildClsModule = void 0;
const common_1 = require("@nestjs/common");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: '.env.integration-test' });
const supertest = require("supertest");
const testing_1 = require("@nestjs/testing");
const nestjs_cls_1 = require("nestjs-cls");
const uuid_1 = require("uuid");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const portfinder = require("portfinder");
const mongodb_1 = require("mongodb");
const events_1 = require("events");
const logger_module_1 = require("../logger/logger.module");
const correlation_constants_1 = require("../correlation/correlation.constants");
const primary_mongodb_database_module_1 = require("../database/primary-mongodb-database.module");
const pub_sub_module_1 = require("../pub-sub/pub-sub.module");
const cache_module_1 = require("../cache/cache.module");
const clerk_module_1 = require("../clerk/clerk.module");
const auth_module_1 = require("../auth/auth.module");
const setup_utils_1 = require("./setup.utils");
const tasks_module_1 = require("../tasks/tasks.module");
const base_config_entity_1 = require("../config/base-config.entity");
const sentry_module_1 = require("../sentry/sentry.module");
const files_module_1 = require("../files/files.module");
events_1.EventEmitter.defaultMaxListeners = 128;
const buildClsModule = () => {
    return nestjs_cls_1.ClsModule.forRoot({
        global: true,
        middleware: {
            mount: true,
            generateId: true,
            idGenerator(req) {
                req[correlation_constants_1.correlationIdKey] =
                    req.headers[correlation_constants_1.correlationIdHeaderKey] ?? (0, uuid_1.v4)();
                return req[correlation_constants_1.correlationIdKey];
            },
        },
    });
};
exports.buildClsModule = buildClsModule;
class InstanceFixture {
    constructor({ app, request, mongoClient, primaryMongoClient, secondaryMongoClient, }) {
        this.app = app;
        this.request = request;
        this.mongoClient = mongoClient;
        this.primaryMongoClient = primaryMongoClient;
        this.secondaryMongoClient = secondaryMongoClient;
        this.baseConfig = app.get(base_config_entity_1.BASE_CONFIG);
    }
    static createTestingModule({ modules, log = false, }) {
        let moduleRef = testing_1.Test.createTestingModule({
            imports: [
                logger_module_1.LoggerModule,
                (0, exports.buildClsModule)(),
                primary_mongodb_database_module_1.PrimaryMongoDbDatabaseModule,
                pub_sub_module_1.PubSubModule,
                tasks_module_1.TasksModule,
                cache_module_1.CacheModule,
                clerk_module_1.ClerkModule,
                auth_module_1.AuthModule,
                sentry_module_1.SentryModule,
                files_module_1.FilesModule,
                ...modules,
            ],
        });
        if (log) {
            moduleRef = moduleRef.setLogger(new common_1.Logger());
        }
        return moduleRef;
    }
    static async build({ moduleRef, }) {
        const testModule = await moduleRef.compile();
        const app = testModule.createNestApplication(new platform_fastify_1.FastifyAdapter(setup_utils_1.fastifyOptions));
        (0, setup_utils_1.setupApp)({
            app,
            version: '1.0.0',
        });
        const maxRetries = 16;
        let lastError = null;
        const mongoDbUri = process.env.MONGODB_URI ?? process.env.PRIMARY_MONGODB_URI;
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
                const mongoClient = new mongodb_1.MongoClient(mongoDbUri, {
                    retryReads: true,
                    retryWrites: true,
                });
                let primaryMongoClient;
                if (primaryMongoDbUri) {
                    primaryMongoClient = new mongodb_1.MongoClient(primaryMongoDbUri, {
                        retryReads: true,
                        retryWrites: true,
                    });
                }
                let secondaryMongoClient;
                if (secondaryMongoDbUri) {
                    secondaryMongoClient = new mongodb_1.MongoClient(secondaryMongoDbUri, {
                        retryReads: true,
                        retryWrites: true,
                    });
                }
                return new InstanceFixture({ app, request, mongoClient, primaryMongoClient, secondaryMongoClient });
            }
            catch (error) {
                lastError = error;
                if (attempt === maxRetries) {
                    console.error(lastError);
                    throw new Error(`Failed to start app after ${maxRetries.toString()} attempts. Last error: ${lastError.message}.`);
                }
                await new Promise((resolve) => setTimeout(resolve, 100));
            }
        }
        throw new Error('Failed to start app.');
    }
    getCurrentCorrelationId() {
        return expect.getState().currentTestName?.split('|')[1].trim() ?? (0, uuid_1.v4)();
    }
    async teardown() {
        await this.app.close();
        await this.mongoClient.close();
    }
}
exports.InstanceFixture = InstanceFixture;
const getCurrentCorrelationId = () => {
    return expect.getState().currentTestName?.split('|')[1].trim() ?? (0, uuid_1.v4)();
};
exports.getCurrentCorrelationId = getCurrentCorrelationId;
//# sourceMappingURL=test.utils.js.map