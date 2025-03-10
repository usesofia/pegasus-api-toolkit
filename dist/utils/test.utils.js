"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstanceFixture = void 0;
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
events_1.EventEmitter.defaultMaxListeners = 128;
class InstanceFixture {
    constructor({ app, request, mongoClient, }) {
        this.app = app;
        this.request = request;
        this.mongoClient = mongoClient;
    }
    static createTestingModule({ modules, log = false, }) {
        let moduleRef = testing_1.Test.createTestingModule({
            imports: [
                logger_module_1.LoggerModule,
                nestjs_cls_1.ClsModule.forRoot({
                    global: true,
                    middleware: {
                        mount: true,
                        generateId: true,
                        idGenerator(req) {
                            req[correlation_constants_1.correlationIdKey] = req.headers[correlation_constants_1.correlationIdHeaderKey] ?? (0, uuid_1.v4)();
                            return req[correlation_constants_1.correlationIdKey];
                        },
                    },
                }),
                primary_mongodb_database_module_1.PrimaryMongoDbDatabaseModule,
                pub_sub_module_1.PubSubModule,
                cache_module_1.CacheModule,
                clerk_module_1.ClerkModule,
                auth_module_1.AuthModule,
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
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                const port = await portfinder.getPortPromise();
                const url = `http://localhost:${port}`;
                await app.listen(port);
                const request = supertest(url);
                const mongoClient = new mongodb_1.MongoClient(process.env.MONGODB_URI);
                return new InstanceFixture({ app, request, mongoClient });
            }
            catch (error) {
                lastError = error;
                if (attempt === maxRetries) {
                    console.error(lastError);
                    throw new Error(`Failed to start app after ${maxRetries} attempts. Last error: ${lastError.message}.`);
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
//# sourceMappingURL=test.utils.js.map