"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSwaggerJson = generateSwaggerJson;
const core_1 = require("@nestjs/core");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const swagger_1 = require("@nestjs/swagger");
const fs = require("fs");
const mongodb_memory_server_1 = require("mongodb-memory-server");
const setup_utils_1 = require("./setup.utils");
const base_config_entity_1 = require("../config/base-config.entity");
async function generateSwaggerJson({ AppModule, version, }) {
    const replset = await mongodb_memory_server_1.MongoMemoryReplSet.create({ replSet: { count: 1 } });
    process.env.MONGODB_URI = replset.getUri();
    process.env.PRIMARY_MONGODB_URI = replset.getUri();
    process.env.SECONDARY_MONGODB_URI = replset.getUri('secondary');
    const app = await core_1.NestFactory.create(AppModule, new platform_fastify_1.FastifyAdapter(), setup_utils_1.appOptions);
    (0, setup_utils_1.setupApp)({ app, version });
    const baseConfig = app.get(base_config_entity_1.BASE_CONFIG);
    const swaggerDocument = new swagger_1.DocumentBuilder()
        .setTitle(baseConfig.swagger.title)
        .setDescription(baseConfig.swagger.description)
        .setVersion(version)
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerDocument);
    fs.writeFileSync(`swagger.json`, JSON.stringify(document, null, 2));
    await app.close();
    await replset.stop();
    process.exit(0);
}
//# sourceMappingURL=swagger.utils.js.map