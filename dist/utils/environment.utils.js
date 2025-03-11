"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Environment = void 0;
exports.getEnvironment = getEnvironment;
exports.isLocalEnvironment = isLocalEnvironment;
exports.isIntegrationTestEnvironment = isIntegrationTestEnvironment;
var Environment;
(function (Environment) {
    Environment["LOCAL"] = "local";
    Environment["DEV"] = "dev";
    Environment["INTEGRATION_TEST"] = "integration-test";
})(Environment || (exports.Environment = Environment = {}));
function getEnvironment() {
    switch (process.env.ENV) {
        case 'local':
            return Environment.LOCAL;
        case 'dev':
            return Environment.DEV;
        case 'integration-test':
            return Environment.INTEGRATION_TEST;
        default:
            throw new Error(`Invalid environment: ${(process.env.ENV ?? 'undefined').toString()}`);
    }
}
function isLocalEnvironment() {
    return getEnvironment() === Environment.LOCAL;
}
function isIntegrationTestEnvironment() {
    return getEnvironment() === Environment.INTEGRATION_TEST;
}
//# sourceMappingURL=environment.utils.js.map