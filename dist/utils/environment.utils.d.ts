export declare enum Environment {
    LOCAL = "local",
    DEV = "dev",
    STG = "stg",
    INTEGRATION_TEST = "integration-test"
}
export declare function getEnvironment(): Environment;
export declare function isLocalEnvironment(): boolean;
export declare function isIntegrationTestEnvironment(): boolean;
