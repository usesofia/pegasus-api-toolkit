import { Environment } from '../utils/environment.utils';
import { z } from 'zod';
export declare const BaseConfigSchema: z.ZodObject<{
    env: z.ZodEnum<typeof Environment>;
    nodeEnv: z.ZodEnum<{
        development: "development";
        production: "production";
    }>;
    databases: z.ZodArray<z.ZodObject<{
        type: z.ZodEnum<{
            mongodb: "mongodb";
            postgres: "postgres";
        }>;
        uri: z.ZodString;
        transactionTimeoutInMiliseconds: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        nTransactionRetries: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        maxDelayBetweenTransactionAttempts: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    }, z.core.$strip>>;
    auth: z.ZodObject<{
        applyAuthGuardToAllRoutes: z.ZodBoolean;
        applyGcpServiceAccountGuardToAllRoutes: z.ZodBoolean;
    }, z.core.$strip>;
    logger: z.ZodObject<{
        level: z.ZodEnum<{
            error: "error";
            log: "log";
            warn: "warn";
            debug: "debug";
        }>;
        consoleLog: z.ZodBoolean;
        betterStackSourceToken: z.ZodString;
        betterStackEndpoint: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    gcp: z.ZodObject<{
        location: z.ZodString;
        credentials: z.ZodObject<{
            type: z.ZodString;
            project_id: z.ZodString;
            private_key_id: z.ZodString;
            private_key: z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>;
            client_email: z.ZodString;
            client_id: z.ZodString;
            auth_uri: z.ZodString;
            token_uri: z.ZodString;
            auth_provider_x509_cert_url: z.ZodString;
            client_x509_cert_url: z.ZodString;
            universe_domain: z.ZodString;
        }, z.core.$strip>;
    }, z.core.$strip>;
    objectStorage: z.ZodObject<{
        organizationFilesBucket: z.ZodObject<{
            name: z.ZodString;
            projectId: z.ZodString;
            clientEmail: z.ZodString;
            privateKey: z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>;
            audience: z.ZodString;
            subjectTokenType: z.ZodString;
        }, z.core.$strip>;
    }, z.core.$strip>;
    clerk: z.ZodObject<{
        domain: z.ZodString;
        secretKey: z.ZodString;
        jwtKey: z.ZodString;
    }, z.core.$strip>;
    cache: z.ZodObject<{
        type: z.ZodEnum<{
            mongodb: "mongodb";
            redis: "redis";
            memory: "memory";
        }>;
        ttlInSeconds: z.ZodNumber;
        redis: z.ZodOptional<z.ZodObject<{
            url: z.ZodString;
            keyPrefix: z.ZodString;
            ssl: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        }, z.core.$strip>>;
        mongodb: z.ZodOptional<z.ZodObject<{
            keyPrefix: z.ZodString;
        }, z.core.$strip>>;
    }, z.core.$strip>;
    swagger: z.ZodObject<{
        title: z.ZodString;
        description: z.ZodString;
    }, z.core.$strip>;
    microservices: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        internalBaseUrl: z.ZodString;
    }, z.core.$strip>>;
    tasks: z.ZodObject<{
        secret: z.ZodString;
    }, z.core.$strip>;
    admin: z.ZodObject<{
        secret: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    email: z.ZodOptional<z.ZodObject<{
        sendgrid: z.ZodObject<{
            apiKey: z.ZodString;
        }, z.core.$strip>;
    }, z.core.$strip>>;
    shortio: z.ZodOptional<z.ZodObject<{
        apiKey: z.ZodString;
        domain: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const BaseConfigEntity_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    env: z.ZodEnum<typeof Environment>;
    nodeEnv: z.ZodEnum<{
        development: "development";
        production: "production";
    }>;
    databases: z.ZodArray<z.ZodObject<{
        type: z.ZodEnum<{
            mongodb: "mongodb";
            postgres: "postgres";
        }>;
        uri: z.ZodString;
        transactionTimeoutInMiliseconds: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        nTransactionRetries: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        maxDelayBetweenTransactionAttempts: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    }, z.core.$strip>>;
    auth: z.ZodObject<{
        applyAuthGuardToAllRoutes: z.ZodBoolean;
        applyGcpServiceAccountGuardToAllRoutes: z.ZodBoolean;
    }, z.core.$strip>;
    logger: z.ZodObject<{
        level: z.ZodEnum<{
            error: "error";
            log: "log";
            warn: "warn";
            debug: "debug";
        }>;
        consoleLog: z.ZodBoolean;
        betterStackSourceToken: z.ZodString;
        betterStackEndpoint: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    gcp: z.ZodObject<{
        location: z.ZodString;
        credentials: z.ZodObject<{
            type: z.ZodString;
            project_id: z.ZodString;
            private_key_id: z.ZodString;
            private_key: z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>;
            client_email: z.ZodString;
            client_id: z.ZodString;
            auth_uri: z.ZodString;
            token_uri: z.ZodString;
            auth_provider_x509_cert_url: z.ZodString;
            client_x509_cert_url: z.ZodString;
            universe_domain: z.ZodString;
        }, z.core.$strip>;
    }, z.core.$strip>;
    objectStorage: z.ZodObject<{
        organizationFilesBucket: z.ZodObject<{
            name: z.ZodString;
            projectId: z.ZodString;
            clientEmail: z.ZodString;
            privateKey: z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>;
            audience: z.ZodString;
            subjectTokenType: z.ZodString;
        }, z.core.$strip>;
    }, z.core.$strip>;
    clerk: z.ZodObject<{
        domain: z.ZodString;
        secretKey: z.ZodString;
        jwtKey: z.ZodString;
    }, z.core.$strip>;
    cache: z.ZodObject<{
        type: z.ZodEnum<{
            mongodb: "mongodb";
            redis: "redis";
            memory: "memory";
        }>;
        ttlInSeconds: z.ZodNumber;
        redis: z.ZodOptional<z.ZodObject<{
            url: z.ZodString;
            keyPrefix: z.ZodString;
            ssl: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        }, z.core.$strip>>;
        mongodb: z.ZodOptional<z.ZodObject<{
            keyPrefix: z.ZodString;
        }, z.core.$strip>>;
    }, z.core.$strip>;
    swagger: z.ZodObject<{
        title: z.ZodString;
        description: z.ZodString;
    }, z.core.$strip>;
    microservices: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        internalBaseUrl: z.ZodString;
    }, z.core.$strip>>;
    tasks: z.ZodObject<{
        secret: z.ZodString;
    }, z.core.$strip>;
    admin: z.ZodObject<{
        secret: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    email: z.ZodOptional<z.ZodObject<{
        sendgrid: z.ZodObject<{
            apiKey: z.ZodString;
        }, z.core.$strip>;
    }, z.core.$strip>>;
    shortio: z.ZodOptional<z.ZodObject<{
        apiKey: z.ZodString;
        domain: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>, false>;
export declare class BaseConfigEntity extends BaseConfigEntity_base {
    static build(input: z.input<typeof BaseConfigSchema>): BaseConfigEntity;
}
export declare const BASE_CONFIG: unique symbol;
export {};
