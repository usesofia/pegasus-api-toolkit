"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fastifyOptions = exports.appOptions = void 0;
exports.setupApp = setupApp;
const app_exceptions_filter_1 = require("../app-exceptions.filter");
const base_config_entity_1 = require("../config/base-config.entity");
const logger_module_1 = require("../logger/logger.module");
const json_utils_1 = require("./json.utils");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const mongoose_1 = require("mongoose");
const nestjs_cls_1 = require("nestjs-cls");
const nestjs_zod_1 = require("nestjs-zod");
mongoose_1.default.Schema.Types.String.checkRequired((v) => v !== null && v !== undefined);
function setupApp({ app, version, }) {
    app
        .getHttpAdapter()
        .getInstance()
        .setReplySerializer((data) => JSON.stringify(data, (0, json_utils_1.getJsonStringifyReplacer)()));
    app.useLogger(app.get(logger_module_1.LOGGER_SERVICE_PORT));
    app.useGlobalFilters(new app_exceptions_filter_1.AppExceptionsFilter(app.get(core_1.HttpAdapterHost), app.get(logger_module_1.LOGGER_SERVICE_PORT), app.get(nestjs_cls_1.ClsService)));
    app.useGlobalPipes(new nestjs_zod_1.ZodValidationPipe(), new common_1.ValidationPipe({
        transform: true,
    }));
    app.enableCors();
    app.enableShutdownHooks();
    (0, nestjs_zod_1.patchNestJsSwagger)();
    const baseConfig = app.get(base_config_entity_1.BASE_CONFIG);
    const swaggerDocument = new swagger_1.DocumentBuilder()
        .setTitle(baseConfig.swagger.title)
        .setDescription(baseConfig.swagger.description)
        .setVersion(version)
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerDocument);
    swagger_1.SwaggerModule.setup('/external/docs', app, document);
}
exports.appOptions = {
    rawBody: true,
    bufferLogs: false,
};
exports.fastifyOptions = {
    bodyLimit: 100000000,
};
//# sourceMappingURL=setup.utils.js.map