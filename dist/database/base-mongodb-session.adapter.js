"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseMongoDbSessionAdapter = void 0;
const base_1 = require("../base");
const common_1 = require("@nestjs/common");
class BaseMongoDbSessionAdapter extends base_1.Base {
    constructor(session, baseConfig, logger, cls) {
        super(BaseMongoDbSessionAdapter.name, baseConfig, logger, cls);
        this.baseConfig = baseConfig;
        this.logger = logger;
        this.cls = cls;
        this.session = session;
    }
    endSession() {
        return this.session.endSession();
    }
    async withTransaction(fn, options) {
        const mongoDbConfig = this.baseConfig.databases.find((db) => db.type === 'mongodb');
        if (!mongoDbConfig) {
            throw new Error('MongoDB config not found.');
        }
        let attempt = 1;
        const maxNAttempts = options?.nRetries ?? mongoDbConfig.nTransactionRetries;
        const maxDelayBetweenAttempts = options?.maxDelayBetweenAttempts ?? mongoDbConfig.maxDelayBetweenTransactionAttempts;
        let result;
        while (attempt <= maxNAttempts) {
            try {
                result = await this.session.withTransaction(fn, {
                    timeoutMS: options?.timeoutInMiliseconds ?? mongoDbConfig.transactionTimeoutInMiliseconds,
                });
                return result;
            }
            catch (error) {
                if (error instanceof common_1.HttpException) {
                    throw error;
                }
                this.logWarn({
                    functionName: 'withTransaction',
                    suffix: `attemptFailed`,
                    data: {
                        attempt,
                        maxNAttempts,
                        error,
                    },
                });
                attempt++;
                const delay = Math.min(maxDelayBetweenAttempts, 100 * Math.pow(2, attempt - 1));
                await new Promise((resolve) => setTimeout(resolve, delay));
            }
        }
        throw new Error('Transaction failed after all attempts.');
    }
    getSession() {
        return this.session;
    }
}
exports.BaseMongoDbSessionAdapter = BaseMongoDbSessionAdapter;
//# sourceMappingURL=base-mongodb-session.adapter.js.map