"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseMongoDbRepositoryAdapter = void 0;
const common_1 = require("@nestjs/common");
const base_1 = require("../base");
const log_utils_1 = require("../utils/log.utils");
const deepmerge_ts_1 = require("deepmerge-ts");
const base_mongodb_session_adapter_1 = require("./base-mongodb-session.adapter");
class BaseMongoDbRepositoryAdapter extends base_1.Base {
    constructor(className, baseConfig, logger, cls, model) {
        super(className, baseConfig, logger, cls);
        this.baseConfig = baseConfig;
        this.logger = logger;
        this.cls = cls;
        this.model = model;
    }
    async startSession() {
        return new base_mongodb_session_adapter_1.BaseMongoDbSessionAdapter(await this.model.db.startSession());
    }
    async create({ requester, request, previousSession, }) {
        const created = new this.model({
            ...request.data,
            organization: requester.organization,
            createdByUser: requester.id,
            createdByOrganization: requester.organization,
        });
        let saved = await created.save({
            session: previousSession?.getSession() ?? null,
        });
        if (request.populate) {
            saved = await saved.populate(request.populate.split(','));
        }
        return this.toEntity(saved);
    }
    async findOne({ requester, request, previousSession, }) {
        const doc = await this.model
            .findOne({
            _id: request.id,
            organization: requester.organization,
        })
            .session(previousSession?.getSession() ?? null);
        if (!doc) {
            throw new common_1.NotFoundException('Recurso não encontrado.');
        }
        if (request.populate) {
            await doc.populate(request.populate.split(','));
        }
        return this.toEntity(doc);
    }
    async _partialUpdateTransactionFn({ requester, request, session, }) {
        const existing = await this.model
            .findOne({
            _id: request.id,
            organization: requester.organization,
        })
            .session(session);
        if (!existing) {
            throw new common_1.NotFoundException('Recurso não encontrado.');
        }
        const merged = (0, deepmerge_ts_1.deepmergeCustom)({
            mergeArrays: false,
        })(existing.toObject(), request.data);
        Object.assign(existing, merged);
        await existing.save({ session });
        if (request.populate) {
            await existing.populate(request.populate.split(','));
        }
        return this.toEntity(existing);
    }
    async _partialUpdate({ requester, request, session, }) {
        if (session.inTransaction()) {
            return await this._partialUpdateTransactionFn({
                requester,
                request,
                session,
            });
        }
        else {
            return await session.withTransaction(async () => {
                return await this._partialUpdateTransactionFn({
                    requester,
                    request,
                    session,
                });
            });
        }
    }
    async partialUpdate({ requester, request, previousSession, }) {
        if (previousSession) {
            return await this._partialUpdate({
                requester,
                request,
                session: previousSession.getSession(),
            });
        }
        else {
            const session = await this.model.db.startSession();
            let result;
            try {
                result = await this._partialUpdate({
                    requester,
                    request,
                    session: session,
                });
            }
            finally {
                await session.endSession();
            }
            return result;
        }
    }
    async remove({ requester, request, previousSession, }) {
        await this.model
            .findOneAndDelete({
            _id: request.id,
            organization: requester.organization,
        })
            .session(previousSession?.getSession() ?? null);
    }
}
exports.BaseMongoDbRepositoryAdapter = BaseMongoDbRepositoryAdapter;
__decorate([
    (0, log_utils_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseMongoDbRepositoryAdapter.prototype, "startSession", null);
__decorate([
    (0, log_utils_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BaseMongoDbRepositoryAdapter.prototype, "create", null);
__decorate([
    (0, log_utils_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BaseMongoDbRepositoryAdapter.prototype, "findOne", null);
__decorate([
    (0, log_utils_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BaseMongoDbRepositoryAdapter.prototype, "_partialUpdateTransactionFn", null);
__decorate([
    (0, log_utils_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BaseMongoDbRepositoryAdapter.prototype, "_partialUpdate", null);
__decorate([
    (0, log_utils_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BaseMongoDbRepositoryAdapter.prototype, "partialUpdate", null);
__decorate([
    (0, log_utils_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BaseMongoDbRepositoryAdapter.prototype, "remove", null);
//# sourceMappingURL=base-mongodb-repository.adapter.js.map