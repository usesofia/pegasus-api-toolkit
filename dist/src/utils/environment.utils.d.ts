export declare enum Environment {
    LOCAL = "local",
    DEV = "dev",
    STG = "stg",
    INTEGRATION_TEST = "integration-test",
    PROD = "prod"
}
export declare function getEnvironment(): Environment;
export declare function isLocalEnvironment(): boolean;
export declare function isIntegrationTestEnvironment(): boolean;
export declare function isCli(): boolean;
