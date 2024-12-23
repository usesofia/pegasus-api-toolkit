import { z } from 'zod';
import { Environment } from '../utils/environment.utils';
export declare const BaseConfigSchema: z.ZodObject<{
    env: z.ZodNativeEnum<typeof Environment>;
    nodeEnv: z.ZodEnum<["development", "production"]>;
    databases: z.ZodArray<z.ZodObject<{
        type: z.ZodEnum<["mongodb"]>;
        uri: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "mongodb";
        uri: string;
    }, {
        type: "mongodb";
        uri: string;
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
    }, "strip", z.ZodTypeAny, {
        level: "log" | "error" | "warn" | "debug";
        consoleLog: boolean;
        betterStackSourceToken: string;
    }, {
        level: "log" | "error" | "warn" | "debug";
        consoleLog: boolean;
        betterStackSourceToken: string;
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
        secretKey: z.ZodString;
        jwtKey: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        secretKey: string;
        jwtKey: string;
    }, {
        secretKey: string;
        jwtKey: string;
    }>;
    cache: z.ZodObject<{
        type: z.ZodEnum<["redis", "memory"]>;
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
    }, "strip", z.ZodTypeAny, {
        type: "redis" | "memory";
        ttlInSeconds: number;
        redis?: {
            url: string;
            keyPrefix: string;
            ssl: boolean;
        } | undefined;
    }, {
        type: "redis" | "memory";
        ttlInSeconds: number;
        redis?: {
            url: string;
            keyPrefix: string;
            ssl?: boolean | undefined;
        } | undefined;
    }>;
    pubSub: z.ZodObject<{
        topics: z.ZodObject<{
            cacheHitOnGetAuthUser: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            cacheHitOnGetAuthUser: string;
        }, {
            cacheHitOnGetAuthUser: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        topics: {
            cacheHitOnGetAuthUser: string;
        };
    }, {
        topics: {
            cacheHitOnGetAuthUser: string;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    env: Environment;
    nodeEnv: "development" | "production";
    databases: {
        type: "mongodb";
        uri: string;
    }[];
    auth: {
        applyAuthGuardToAllRoutes: boolean;
        applyGcpServiceAccountGuardToAllRoutes: boolean;
    };
    logger: {
        level: "log" | "error" | "warn" | "debug";
        consoleLog: boolean;
        betterStackSourceToken: string;
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
        secretKey: string;
        jwtKey: string;
    };
    cache: {
        type: "redis" | "memory";
        ttlInSeconds: number;
        redis?: {
            url: string;
            keyPrefix: string;
            ssl: boolean;
        } | undefined;
    };
    pubSub: {
        topics: {
            cacheHitOnGetAuthUser: string;
        };
    };
}, {
    env: Environment;
    nodeEnv: "development" | "production";
    databases: {
        type: "mongodb";
        uri: string;
    }[];
    auth: {
        applyAuthGuardToAllRoutes: boolean;
        applyGcpServiceAccountGuardToAllRoutes: boolean;
    };
    logger: {
        level: "log" | "error" | "warn" | "debug";
        consoleLog: boolean;
        betterStackSourceToken: string;
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
        secretKey: string;
        jwtKey: string;
    };
    cache: {
        type: "redis" | "memory";
        ttlInSeconds: number;
        redis?: {
            url: string;
            keyPrefix: string;
            ssl?: boolean | undefined;
        } | undefined;
    };
    pubSub: {
        topics: {
            cacheHitOnGetAuthUser: string;
        };
    };
}>;
declare const BaseConfigEntity_base: import("nestjs-zod").ZodDto<{
    env: Environment;
    nodeEnv: "development" | "production";
    databases: {
        type: "mongodb";
        uri: string;
    }[];
    auth: {
        applyAuthGuardToAllRoutes: boolean;
        applyGcpServiceAccountGuardToAllRoutes: boolean;
    };
    logger: {
        level: "log" | "error" | "warn" | "debug";
        consoleLog: boolean;
        betterStackSourceToken: string;
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
        secretKey: string;
        jwtKey: string;
    };
    cache: {
        type: "redis" | "memory";
        ttlInSeconds: number;
        redis?: {
            url: string;
            keyPrefix: string;
            ssl: boolean;
        } | undefined;
    };
    pubSub: {
        topics: {
            cacheHitOnGetAuthUser: string;
        };
    };
}, z.ZodObjectDef<{
    env: z.ZodNativeEnum<typeof Environment>;
    nodeEnv: z.ZodEnum<["development", "production"]>;
    databases: z.ZodArray<z.ZodObject<{
        type: z.ZodEnum<["mongodb"]>;
        uri: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "mongodb";
        uri: string;
    }, {
        type: "mongodb";
        uri: string;
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
    }, "strip", z.ZodTypeAny, {
        level: "log" | "error" | "warn" | "debug";
        consoleLog: boolean;
        betterStackSourceToken: string;
    }, {
        level: "log" | "error" | "warn" | "debug";
        consoleLog: boolean;
        betterStackSourceToken: string;
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
        secretKey: z.ZodString;
        jwtKey: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        secretKey: string;
        jwtKey: string;
    }, {
        secretKey: string;
        jwtKey: string;
    }>;
    cache: z.ZodObject<{
        type: z.ZodEnum<["redis", "memory"]>;
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
    }, "strip", z.ZodTypeAny, {
        type: "redis" | "memory";
        ttlInSeconds: number;
        redis?: {
            url: string;
            keyPrefix: string;
            ssl: boolean;
        } | undefined;
    }, {
        type: "redis" | "memory";
        ttlInSeconds: number;
        redis?: {
            url: string;
            keyPrefix: string;
            ssl?: boolean | undefined;
        } | undefined;
    }>;
    pubSub: z.ZodObject<{
        topics: z.ZodObject<{
            cacheHitOnGetAuthUser: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            cacheHitOnGetAuthUser: string;
        }, {
            cacheHitOnGetAuthUser: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        topics: {
            cacheHitOnGetAuthUser: string;
        };
    }, {
        topics: {
            cacheHitOnGetAuthUser: string;
        };
    }>;
}, "strip", z.ZodTypeAny>, {
    env: Environment;
    nodeEnv: "development" | "production";
    databases: {
        type: "mongodb";
        uri: string;
    }[];
    auth: {
        applyAuthGuardToAllRoutes: boolean;
        applyGcpServiceAccountGuardToAllRoutes: boolean;
    };
    logger: {
        level: "log" | "error" | "warn" | "debug";
        consoleLog: boolean;
        betterStackSourceToken: string;
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
        secretKey: string;
        jwtKey: string;
    };
    cache: {
        type: "redis" | "memory";
        ttlInSeconds: number;
        redis?: {
            url: string;
            keyPrefix: string;
            ssl?: boolean | undefined;
        } | undefined;
    };
    pubSub: {
        topics: {
            cacheHitOnGetAuthUser: string;
        };
    };
}>;
export declare class BaseConfigEntity extends BaseConfigEntity_base {
    static build(input: z.infer<typeof BaseConfigSchema>): BaseConfigEntity;
}
export declare const BASE_CONFIG: unique symbol;
export {};