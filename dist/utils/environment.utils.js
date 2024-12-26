"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Environment = void 0;
exports.getEnvironment = getEnvironment;
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
            throw new Error('Invalid environment.');
    }
}
//# sourceMappingURL=environment.utils.js.map