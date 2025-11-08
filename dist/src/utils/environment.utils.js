"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Environment = void 0;
exports.getEnvironment = getEnvironment;
exports.isLocalEnvironment = isLocalEnvironment;
exports.isIntegrationTestEnvironment = isIntegrationTestEnvironment;
exports.isCli = isCli;
var Environment;
(function (Environment) {
    Environment["LOCAL"] = "local";
    Environment["DEV"] = "dev";
    Environment["STG"] = "stg";
    Environment["INTEGRATION_TEST"] = "integration-test";
    Environment["PROD"] = "prod";
})(Environment || (exports.Environment = Environment = {}));
function getEnvironment() {
    switch (process.env.ENV) {
        case 'local':
            return Environment.LOCAL;
        case 'dev':
            return Environment.DEV;
        case 'stg':
            return Environment.STG;
        case 'integration-test':
            return Environment.INTEGRATION_TEST;
        case 'prod':
            return Environment.PROD;
        default:
            throw new Error(`Invalid environment: ${process.env.ENV ?? 'undefined'}`);
    }
}
function isLocalEnvironment() {
    return getEnvironment() === Environment.LOCAL;
}
function isIntegrationTestEnvironment() {
    return getEnvironment() === Environment.INTEGRATION_TEST;
}
let _isCli = undefined;
function isCli() {
    _isCli ??= process.env.CLI === "true";
    return _isCli;
}
//# sourceMappingURL=environment.utils.js.map