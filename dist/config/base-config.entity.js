"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BASE_CONFIG = exports.BaseConfigEntity = exports.BaseConfigSchema = void 0;
const nestjs_zod_1 = require("nestjs-zod");
const zod_1 = require("zod");
const environment_utils_1 = require("../utils/environment.utils");
const entity_utils_1 = require("../utils/entity.utils");
exports.BaseConfigSchema = zod_1.z.object({
    env: zod_1.z.nativeEnum(environment_utils_1.Environment),
    nodeEnv: zod_1.z.enum(['development', 'production']),
    databases: zod_1.z.array(zod_1.z.object({
        type: zod_1.z.enum(['mongodb']),
        uri: zod_1.z.string(),
        transactionTimeoutInMiliseconds: zod_1.z.number().optional().default(5000),
        nTransactionRetries: zod_1.z.number().optional().default(7),
        maxDelayBetweenTransactionAttempts: zod_1.z.number().optional().default(2000),
    })),
    auth: zod_1.z
        .object({
        applyAuthGuardToAllRoutes: zod_1.z.boolean(),
        applyGcpServiceAccountGuardToAllRoutes: zod_1.z.boolean(),
    })
        .refine((data) => !(data.applyAuthGuardToAllRoutes &&
        data.applyGcpServiceAccountGuardToAllRoutes), {
        message: 'Cannot apply both auth guard and GCP service account guard to all routes simultaneously.',
        path: ['auth'],
    }),
    logger: zod_1.z.object({
        level: zod_1.z.enum(['log', 'error', 'warn', 'debug']),
        consoleLog: zod_1.z.boolean(),
        betterStackSourceToken: zod_1.z.string(),
        betterStackEndpoint: zod_1.z.string().optional(),
    }),
    gcp: zod_1.z.object({
        location: zod_1.z.string(),
        credentials: zod_1.z.object({
            type: zod_1.z.string(),
            project_id: zod_1.z.string(),
            private_key_id: zod_1.z.string(),
            private_key: zod_1.z.string(),
            client_email: zod_1.z.string(),
            client_id: zod_1.z.string(),
            auth_uri: zod_1.z.string(),
            token_uri: zod_1.z.string(),
            auth_provider_x509_cert_url: zod_1.z.string(),
            client_x509_cert_url: zod_1.z.string(),
            universe_domain: zod_1.z.string(),
        }),
    }),
    clerk: zod_1.z.object({
        domain: zod_1.z.string(),
        secretKey: zod_1.z.string(),
        jwtKey: zod_1.z.string(),
    }),
    cache: zod_1.z.object({
        type: zod_1.z.enum(['redis', 'memory', 'mongodb']),
        ttlInSeconds: zod_1.z.number(),
        redis: zod_1.z
            .object({
            url: zod_1.z.string(),
            keyPrefix: zod_1.z.string(),
            ssl: zod_1.z.boolean().optional().default(true),
        })
            .optional(),
        mongodb: zod_1.z
            .object({
            keyPrefix: zod_1.z.string(),
        })
            .optional(),
    }),
    sentry: zod_1.z.object({
        enabled: zod_1.z.boolean(),
        dsn: zod_1.z.string().optional(),
    }),
    swagger: zod_1.z.object({
        title: zod_1.z.string(),
        description: zod_1.z.string(),
    }),
    microservices: zod_1.z.array(zod_1.z.object({
        name: zod_1.z.string(),
        internalBaseUrl: zod_1.z.string(),
    })),
    tasks: zod_1.z.object({
        secret: zod_1.z.string(),
    }),
});
class BaseConfigEntity extends (0, nestjs_zod_1.createZodDto)(exports.BaseConfigSchema) {
    static build(input) {
        return (0, entity_utils_1.safeInstantiateEntity)(BaseConfigEntity, input);
    }
}
exports.BaseConfigEntity = BaseConfigEntity;
exports.BASE_CONFIG = Symbol('BaseConfig');
//# sourceMappingURL=base-config.entity.js.map