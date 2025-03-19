import { z } from 'zod';
import { Environment } from '../utils/environment.utils';
export declare const BaseConfigSchema: z.ZodObject<{
    env: z.ZodNativeEnum<typeof Environment>;
    nodeEnv: z.ZodEnum<["development", "production"]>;
    databases: z.ZodArray<z.ZodObject<{
        type: z.ZodEnum<["mongodb", "postgres"]>;
        uri: z.ZodString;
        transactionTimeoutInMiliseconds: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        nTransactionRetries: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        maxDelayBetweenTransactionAttempts: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        type: "mongodb" | "postgres";
        uri: string;
        transactionTimeoutInMiliseconds: number;
        nTransactionRetries: number;
        maxDelayBetweenTransactionAttempts: number;
    }, {
        type: "mongodb" | "postgres";
        uri: string;
        transactionTimeoutInMiliseconds?: number | undefined;
        nTransactionRetries?: number | undefined;
        maxDelayBetweenTransactionAttempts?: number | undefined;
    }>, "many">;
    auth: z.ZodEffects<z.ZodObject<{
        applyAuthGuardToAllRoutes: z.ZodBoolean;
        applyGcpServiceAccountGuardToAllRoutes: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        applyAuthGuardToAllRoutes: boolean;
        applyGcpServiceAccountGuardToAllRoutes: boolean;
    }, {
        applyAuthGuardToAllRoutes: boolean;
        applyGcpServiceAccountGuardToAllRoutes: boolean;
    }>, {
        applyAuthGuardToAllRoutes: boolean;
        applyGcpServiceAccountGuardToAllRoutes: boolean;
    }, {
        applyAuthGuardToAllRoutes: boolean;
        applyGcpServiceAccountGuardToAllRoutes: boolean;
    }>;
    logger: z.ZodObject<{
        level: z.ZodEnum<["log", "error", "warn", "debug"]>;
        consoleLog: z.ZodBoolean;
        betterStackSourceToken: z.ZodString;
        betterStackEndpoint: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        level: "log" | "error" | "warn" | "debug";
        consoleLog: boolean;
        betterStackSourceToken: string;
        betterStackEndpoint?: string | undefined;
    }, {
        level: "log" | "error" | "warn" | "debug";
        consoleLog: boolean;
        betterStackSourceToken: string;
        betterStackEndpoint?: string | undefined;
    }>;
    gcp: z.ZodObject<{
        location: z.ZodString;
        credentials: z.ZodObject<{
            type: z.ZodString;
            project_id: z.ZodString;
            private_key_id: z.ZodString;
            private_key: z.ZodString;
            client_email: z.ZodString;
            client_id: z.ZodString;
            auth_uri: z.ZodString;
            token_uri: z.ZodString;
            auth_provider_x509_cert_url: z.ZodString;
            client_x509_cert_url: z.ZodString;
            universe_domain: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: string;
            project_id: string;
            private_key_id: string;
            private_key: string;
            client_email: string;
            client_id: string;
            auth_uri: string;
            token_uri: string;
            auth_provider_x509_cert_url: string;
            client_x509_cert_url: string;
            universe_domain: string;
        }, {
            type: string;
            project_id: string;
            private_key_id: string;
            private_key: string;
            client_email: string;
            client_id: string;
            auth_uri: string;
            token_uri: string;
            auth_provider_x509_cert_url: string;
            client_x509_cert_url: string;
            universe_domain: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        location: string;
        credentials: {
            type: string;
            project_id: string;
            private_key_id: string;
            private_key: string;
            client_email: string;
            client_id: string;
            auth_uri: string;
            token_uri: string;
            auth_provider_x509_cert_url: string;
            client_x509_cert_url: string;
            universe_domain: string;
        };
    }, {
        location: string;
        credentials: {
            type: string;
            project_id: string;
            private_key_id: string;
            private_key: string;
            client_email: string;
            client_id: string;
            auth_uri: string;
            token_uri: string;
            auth_provider_x509_cert_url: string;
            client_x509_cert_url: string;
            universe_domain: string;
        };
    }>;
    clerk: z.ZodObject<{
        domain: z.ZodString;
        secretKey: z.ZodString;
        jwtKey: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        domain: string;
        secretKey: string;
        jwtKey: string;
    }, {
        domain: string;
        secretKey: string;
        jwtKey: string;
    }>;
    cache: z.ZodObject<{
        type: z.ZodEnum<["redis", "memory", "mongodb"]>;
        ttlInSeconds: z.ZodNumber;
        redis: z.ZodOptional<z.ZodObject<{
            url: z.ZodString;
            keyPrefix: z.ZodString;
            ssl: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        }, "strip", z.ZodTypeAny, {
            url: string;
            keyPrefix: string;
            ssl: boolean;
        }, {
            url: string;
            keyPrefix: string;
            ssl?: boolean | undefined;
        }>>;
        mongodb: z.ZodOptional<z.ZodObject<{
            keyPrefix: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            keyPrefix: string;
        }, {
            keyPrefix: string;
        }>>;
    }, "strip", z.ZodTypeAny, {
        type: "mongodb" | "redis" | "memory";
        ttlInSeconds: number;
        mongodb?: {
            keyPrefix: string;
        } | undefined;
        redis?: {
            url: string;
            keyPrefix: string;
            ssl: boolean;
        } | undefined;
    }, {
        type: "mongodb" | "redis" | "memory";
        ttlInSeconds: number;
        mongodb?: {
            keyPrefix: string;
        } | undefined;
        redis?: {
            url: string;
            keyPrefix: string;
            ssl?: boolean | undefined;
        } | undefined;
    }>;
    swagger: z.ZodObject<{
        title: z.ZodString;
        description: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        title: string;
        description: string;
    }, {
        title: string;
        description: string;
    }>;
    microservices: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        internalBaseUrl: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        internalBaseUrl: string;
    }, {
        name: string;
        internalBaseUrl: string;
    }>, "many">;
    tasks: z.ZodObject<{
        secret: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        secret: string;
    }, {
        secret: string;
    }>;
}, "strip", z.ZodTypeAny, {
    env: Environment;
    nodeEnv: "development" | "production";
    databases: {
        type: "mongodb" | "postgres";
        uri: string;
        transactionTimeoutInMiliseconds: number;
        nTransactionRetries: number;
        maxDelayBetweenTransactionAttempts: number;
    }[];
    auth: {
        applyAuthGuardToAllRoutes: boolean;
        applyGcpServiceAccountGuardToAllRoutes: boolean;
    };
    logger: {
        level: "log" | "error" | "warn" | "debug";
        consoleLog: boolean;
        betterStackSourceToken: string;
        betterStackEndpoint?: string | undefined;
    };
    gcp: {
        location: string;
        credentials: {
            type: string;
            project_id: string;
            private_key_id: string;
            private_key: string;
            client_email: string;
            client_id: string;
            auth_uri: string;
            token_uri: string;
            auth_provider_x509_cert_url: string;
            client_x509_cert_url: string;
            universe_domain: string;
        };
    };
    clerk: {
        domain: string;
        secretKey: string;
        jwtKey: string;
    };
    cache: {
        type: "mongodb" | "redis" | "memory";
        ttlInSeconds: number;
        mongodb?: {
            keyPrefix: string;
        } | undefined;
        redis?: {
            url: string;
            keyPrefix: string;
            ssl: boolean;
        } | undefined;
    };
    swagger: {
        title: string;
        description: string;
    };
    microservices: {
        name: string;
        internalBaseUrl: string;
    }[];
    tasks: {
        secret: string;
    };
}, {
    env: Environment;
    nodeEnv: "development" | "production";
    databases: {
        type: "mongodb" | "postgres";
        uri: string;
        transactionTimeoutInMiliseconds?: number | undefined;
        nTransactionRetries?: number | undefined;
        maxDelayBetweenTransactionAttempts?: number | undefined;
    }[];
    auth: {
        applyAuthGuardToAllRoutes: boolean;
        applyGcpServiceAccountGuardToAllRoutes: boolean;
    };
    logger: {
        level: "log" | "error" | "warn" | "debug";
        consoleLog: boolean;
        betterStackSourceToken: string;
        betterStackEndpoint?: string | undefined;
    };
    gcp: {
        location: string;
        credentials: {
            type: string;
            project_id: string;
            private_key_id: string;
            private_key: string;
            client_email: string;
            client_id: string;
            auth_uri: string;
            token_uri: string;
            auth_provider_x509_cert_url: string;
            client_x509_cert_url: string;
            universe_domain: string;
        };
    };
    clerk: {
        domain: string;
        secretKey: string;
        jwtKey: string;
    };
    cache: {
        type: "mongodb" | "redis" | "memory";
        ttlInSeconds: number;
        mongodb?: {
            keyPrefix: string;
        } | undefined;
        redis?: {
            url: string;
            keyPrefix: string;
            ssl?: boolean | undefined;
        } | undefined;
    };
    swagger: {
        title: string;
        description: string;
    };
    microservices: {
        name: string;
        internalBaseUrl: string;
    }[];
    tasks: {
        secret: string;
    };
}>;
declare const BaseConfigEntity_base: import("nestjs-zod").ZodDto<{
    env: Environment;
    nodeEnv: "development" | "production";
    databases: {
        type: "mongodb" | "postgres";
        uri: string;
        transactionTimeoutInMiliseconds: number;
        nTransactionRetries: number;
        maxDelayBetweenTransactionAttempts: number;
    }[];
    auth: {
        applyAuthGuardToAllRoutes: boolean;
        applyGcpServiceAccountGuardToAllRoutes: boolean;
    };
    logger: {
        level: "log" | "error" | "warn" | "debug";
        consoleLog: boolean;
        betterStackSourceToken: string;
        betterStackEndpoint?: string | undefined;
    };
    gcp: {
        location: string;
        credentials: {
            type: string;
            project_id: string;
            private_key_id: string;
            private_key: string;
            client_email: string;
            client_id: string;
            auth_uri: string;
            token_uri: string;
            auth_provider_x509_cert_url: string;
            client_x509_cert_url: string;
            universe_domain: string;
        };
    };
    clerk: {
        domain: string;
        secretKey: string;
        jwtKey: string;
    };
    cache: {
        type: "mongodb" | "redis" | "memory";
        ttlInSeconds: number;
        mongodb?: {
            keyPrefix: string;
        } | undefined;
        redis?: {
            url: string;
            keyPrefix: string;
            ssl: boolean;
        } | undefined;
    };
    swagger: {
        title: string;
        description: string;
    };
    microservices: {
        name: string;
        internalBaseUrl: string;
    }[];
    tasks: {
        secret: string;
    };
}, z.ZodObjectDef<{
    env: z.ZodNativeEnum<typeof Environment>;
    nodeEnv: z.ZodEnum<["development", "production"]>;
    databases: z.ZodArray<z.ZodObject<{
        type: z.ZodEnum<["mongodb", "postgres"]>;
        uri: z.ZodString;
        transactionTimeoutInMiliseconds: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        nTransactionRetries: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        maxDelayBetweenTransactionAttempts: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        type: "mongodb" | "postgres";
        uri: string;
        transactionTimeoutInMiliseconds: number;
        nTransactionRetries: number;
        maxDelayBetweenTransactionAttempts: number;
    }, {
        type: "mongodb" | "postgres";
        uri: string;
        transactionTimeoutInMiliseconds?: number | undefined;
        nTransactionRetries?: number | undefined;
        maxDelayBetweenTransactionAttempts?: number | undefined;
    }>, "many">;
    auth: z.ZodEffects<z.ZodObject<{
        applyAuthGuardToAllRoutes: z.ZodBoolean;
        applyGcpServiceAccountGuardToAllRoutes: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        applyAuthGuardToAllRoutes: boolean;
        applyGcpServiceAccountGuardToAllRoutes: boolean;
    }, {
        applyAuthGuardToAllRoutes: boolean;
        applyGcpServiceAccountGuardToAllRoutes: boolean;
    }>, {
        applyAuthGuardToAllRoutes: boolean;
        applyGcpServiceAccountGuardToAllRoutes: boolean;
    }, {
        applyAuthGuardToAllRoutes: boolean;
        applyGcpServiceAccountGuardToAllRoutes: boolean;
    }>;
    logger: z.ZodObject<{
        level: z.ZodEnum<["log", "error", "warn", "debug"]>;
        consoleLog: z.ZodBoolean;
        betterStackSourceToken: z.ZodString;
        betterStackEndpoint: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        level: "log" | "error" | "warn" | "debug";
        consoleLog: boolean;
        betterStackSourceToken: string;
        betterStackEndpoint?: string | undefined;
    }, {
        level: "log" | "error" | "warn" | "debug";
        consoleLog: boolean;
        betterStackSourceToken: string;
        betterStackEndpoint?: string | undefined;
    }>;
    gcp: z.ZodObject<{
        location: z.ZodString;
        credentials: z.ZodObject<{
            type: z.ZodString;
            project_id: z.ZodString;
            private_key_id: z.ZodString;
            private_key: z.ZodString;
            client_email: z.ZodString;
            client_id: z.ZodString;
            auth_uri: z.ZodString;
            token_uri: z.ZodString;
            auth_provider_x509_cert_url: z.ZodString;
            client_x509_cert_url: z.ZodString;
            universe_domain: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: string;
            project_id: string;
            private_key_id: string;
            private_key: string;
            client_email: string;
            client_id: string;
            auth_uri: string;
            token_uri: string;
            auth_provider_x509_cert_url: string;
            client_x509_cert_url: string;
            universe_domain: string;
        }, {
            type: string;
            project_id: string;
            private_key_id: string;
            private_key: string;
            client_email: string;
            client_id: string;
            auth_uri: string;
            token_uri: string;
            auth_provider_x509_cert_url: string;
            client_x509_cert_url: string;
            universe_domain: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        location: string;
        credentials: {
            type: string;
            project_id: string;
            private_key_id: string;
            private_key: string;
            client_email: string;
            client_id: string;
            auth_uri: string;
            token_uri: string;
            auth_provider_x509_cert_url: string;
            client_x509_cert_url: string;
            universe_domain: string;
        };
    }, {
        location: string;
        credentials: {
            type: string;
            project_id: string;
            private_key_id: string;
            private_key: string;
            client_email: string;
            client_id: string;
            auth_uri: string;
            token_uri: string;
            auth_provider_x509_cert_url: string;
            client_x509_cert_url: string;
            universe_domain: string;
        };
    }>;
    clerk: z.ZodObject<{
        domain: z.ZodString;
        secretKey: z.ZodString;
        jwtKey: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        domain: string;
        secretKey: string;
        jwtKey: string;
    }, {
        domain: string;
        secretKey: string;
        jwtKey: string;
    }>;
    cache: z.ZodObject<{
        type: z.ZodEnum<["redis", "memory", "mongodb"]>;
        ttlInSeconds: z.ZodNumber;
        redis: z.ZodOptional<z.ZodObject<{
            url: z.ZodString;
            keyPrefix: z.ZodString;
            ssl: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        }, "strip", z.ZodTypeAny, {
            url: string;
            keyPrefix: string;
            ssl: boolean;
        }, {
            url: string;
            keyPrefix: string;
            ssl?: boolean | undefined;
        }>>;
        mongodb: z.ZodOptional<z.ZodObject<{
            keyPrefix: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            keyPrefix: string;
        }, {
            keyPrefix: string;
        }>>;
    }, "strip", z.ZodTypeAny, {
        type: "mongodb" | "redis" | "memory";
        ttlInSeconds: number;
        mongodb?: {
            keyPrefix: string;
        } | undefined;
        redis?: {
            url: string;
            keyPrefix: string;
            ssl: boolean;
        } | undefined;
    }, {
        type: "mongodb" | "redis" | "memory";
        ttlInSeconds: number;
        mongodb?: {
            keyPrefix: string;
        } | undefined;
        redis?: {
            url: string;
            keyPrefix: string;
            ssl?: boolean | undefined;
        } | undefined;
    }>;
    swagger: z.ZodObject<{
        title: z.ZodString;
        description: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        title: string;
        description: string;
    }, {
        title: string;
        description: string;
    }>;
    microservices: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        internalBaseUrl: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        internalBaseUrl: string;
    }, {
        name: string;
        internalBaseUrl: string;
    }>, "many">;
    tasks: z.ZodObject<{
        secret: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        secret: string;
    }, {
        secret: string;
    }>;
}, "strip", z.ZodTypeAny>, {
    env: Environment;
    nodeEnv: "development" | "production";
    databases: {
        type: "mongodb" | "postgres";
        uri: string;
        transactionTimeoutInMiliseconds?: number | undefined;
        nTransactionRetries?: number | undefined;
        maxDelayBetweenTransactionAttempts?: number | undefined;
    }[];
    auth: {
        applyAuthGuardToAllRoutes: boolean;
        applyGcpServiceAccountGuardToAllRoutes: boolean;
    };
    logger: {
        level: "log" | "error" | "warn" | "debug";
        consoleLog: boolean;
        betterStackSourceToken: string;
        betterStackEndpoint?: string | undefined;
    };
    gcp: {
        location: string;
        credentials: {
            type: string;
            project_id: string;
            private_key_id: string;
            private_key: string;
            client_email: string;
            client_id: string;
            auth_uri: string;
            token_uri: string;
            auth_provider_x509_cert_url: string;
            client_x509_cert_url: string;
            universe_domain: string;
        };
    };
    clerk: {
        domain: string;
        secretKey: string;
        jwtKey: string;
    };
    cache: {
        type: "mongodb" | "redis" | "memory";
        ttlInSeconds: number;
        mongodb?: {
            keyPrefix: string;
        } | undefined;
        redis?: {
            url: string;
            keyPrefix: string;
            ssl?: boolean | undefined;
        } | undefined;
    };
    swagger: {
        title: string;
        description: string;
    };
    microservices: {
        name: string;
        internalBaseUrl: string;
    }[];
    tasks: {
        secret: string;
    };
}>;
export declare class BaseConfigEntity extends BaseConfigEntity_base {
    static build(input: z.input<typeof BaseConfigSchema>): BaseConfigEntity;
}
export declare const BASE_CONFIG: unique symbol;
export {};
