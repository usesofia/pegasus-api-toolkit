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
exports.BaseMultitenantMongoDbRepositoryAdapter = void 0;
const common_1 = require("@nestjs/common");
const base_1 = require("../base");
const log_utils_1 = require("../utils/log.utils");
const deepmerge_ts_1 = require("deepmerge-ts");
const base_mongodb_session_adapter_1 = require("./base-mongodb-session.adapter");
class BaseMultitenantMongoDbRepositoryAdapter extends base_1.Base {
    constructor(className, baseConfig, logger, cls, model) {
        super(className, baseConfig, logger, cls);
        this.baseConfig = baseConfig;
        this.logger = logger;
        this.cls = cls;
        this.model = model;
    }
    getOwnerOrganization({ requester, }) {
        return requester.getOrganizationOrThrow().id;
    }
    async startSession() {
        return new base_mongodb_session_adapter_1.BaseMongoDbSessionAdapter(await this.model.db.startSession(), this.baseConfig, this.logger, this.cls);
    }
    async create({ requester, request, previousSession, }) {
        const created = new this.model({
            ...request.data,
            ownerOrganization: this.getOwnerOrganization({ requester }),
        });
        let saved = await created.save({
            session: previousSession
                ? previousSession.getSession()
                : null,
        });
        if (request.populate) {
            saved = await saved.populate(request.populate.split(','));
        }
        return this.toEntity(saved);
    }
    async findByIdOrThrow({ requester, request, previousSession, }) {
        const doc = await this.model
            .findOne({
            _id: request.id,
            ownerOrganization: this.getOwnerOrganization({ requester }),
            deletedAt: null,
        })
            .session(previousSession
            ? previousSession.getSession()
            : null);
        if (!doc) {
            throw new common_1.NotFoundException('Recurso não encontrado.');
        }
        if (request.populate) {
            await doc.populate(request.populate.split(','));
        }
        return this.toEntity(doc);
    }
    async findById({ requester, request, previousSession, }) {
        const doc = await this.model
            .findOne({
            _id: request.id,
            ownerOrganization: this.getOwnerOrganization({ requester }),
            deletedAt: null,
        })
            .session(previousSession
            ? previousSession.getSession()
            : null);
        if (!doc) {
            return null;
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
            ownerOrganization: this.getOwnerOrganization({ requester }),
            deletedAt: null,
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
    async partialUpdateOrThrow({ requester, request, previousSession, }) {
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
    async partialUpdate({ requester, request, previousSession, }) {
        try {
            return await this.partialUpdateOrThrow({
                requester,
                request,
                previousSession,
            });
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                return null;
            }
            throw error;
        }
    }
    async removeOrThrow({ requester, request, previousSession, }) {
        const doc = await this.model
            .findOneAndUpdate({
            _id: request.id,
            ownerOrganization: this.getOwnerOrganization({ requester }),
            deletedAt: null,
        }, { $set: { deletedAt: new Date() } })
            .session(previousSession
            ? previousSession.getSession()
            : null);
        if (!doc) {
            throw new common_1.NotFoundException('Recurso não encontrado.');
        }
    }
    async remove({ requester, request, previousSession, }) {
        await this.model
            .findOneAndUpdate({
            _id: request.id,
            ownerOrganization: this.getOwnerOrganization({ requester }),
            deletedAt: null,
        }, { $set: { deletedAt: new Date() } })
            .session(previousSession
            ? previousSession.getSession()
            : null);
    }
}
exports.BaseMultitenantMongoDbRepositoryAdapter = BaseMultitenantMongoDbRepositoryAdapter;
__decorate([
    (0, log_utils_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], BaseMultitenantMongoDbRepositoryAdapter.prototype, "getOwnerOrganization", null);
__decorate([
    (0, log_utils_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseMultitenantMongoDbRepositoryAdapter.prototype, "startSession", null);
__decorate([
    (0, log_utils_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BaseMultitenantMongoDbRepositoryAdapter.prototype, "create", null);
__decorate([
    (0, log_utils_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BaseMultitenantMongoDbRepositoryAdapter.prototype, "findByIdOrThrow", null);
__decorate([
    (0, log_utils_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BaseMultitenantMongoDbRepositoryAdapter.prototype, "findById", null);
__decorate([
    (0, log_utils_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BaseMultitenantMongoDbRepositoryAdapter.prototype, "_partialUpdateTransactionFn", null);
__decorate([
    (0, log_utils_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BaseMultitenantMongoDbRepositoryAdapter.prototype, "_partialUpdate", null);
__decorate([
    (0, log_utils_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BaseMultitenantMongoDbRepositoryAdapter.prototype, "partialUpdateOrThrow", null);
__decorate([
    (0, log_utils_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BaseMultitenantMongoDbRepositoryAdapter.prototype, "partialUpdate", null);
__decorate([
    (0, log_utils_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BaseMultitenantMongoDbRepositoryAdapter.prototype, "removeOrThrow", null);
__decorate([
    (0, log_utils_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BaseMultitenantMongoDbRepositoryAdapter.prototype, "remove", null);
//# sourceMappingURL=base-multitenant-mongodb-repository.adapter.js.map