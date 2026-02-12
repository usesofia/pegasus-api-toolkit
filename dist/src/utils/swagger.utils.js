"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSwaggerJson = generateSwaggerJson;
const core_1 = require("@nestjs/core");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const swagger_1 = require("@nestjs/swagger");
const fs = __importStar(require("fs"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
const setup_utils_1 = require("./setup.utils");
const base_config_entity_1 = require("../config/base-config.entity");
const nestjs_zod_1 = require("nestjs-zod");
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
        .addBearerAuth({
        name: "bearer-auth",
        type: "http",
        scheme: "bearer"
    }, "access-token")
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerDocument);
    const cleaned = (0, nestjs_zod_1.cleanupOpenApiDoc)(document);
    fs.writeFileSync(`swagger.json`, JSON.stringify(cleaned, null, 2));
    await app.close();
    await replset.stop();
    process.exit(0);
}
//# sourceMappingURL=swagger.utils.js.map