"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseMongoDbSessionAdapter = void 0;
class BaseMongoDbSessionAdapter {
    constructor(session) {
        this.session = session;
    }
    endSession() {
        return this.session.endSession();
    }
    withTransaction(fn) {
        return this.session.withTransaction(fn);
    }
    getSession() {
        return this.session;
    }
}
exports.BaseMongoDbSessionAdapter = BaseMongoDbSessionAdapter;
//# sourceMappingURL=base-mongodb-session.adapter.js.map