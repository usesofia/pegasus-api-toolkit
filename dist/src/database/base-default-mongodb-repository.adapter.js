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
exports.BaseDefaultMongoDbRepositoryAdapter = void 0;
const common_1 = require("@nestjs/common");
const base_1 = require("../base");
const log_utils_1 = require("../utils/log.utils");
const deepmerge_ts_1 = require("deepmerge-ts");
const base_mongodb_session_adapter_1 = require("./base-mongodb-session.adapter");
class BaseDefaultMongoDbRepositoryAdapter extends base_1.Base {
    constructor(className, baseConfig, logger, cls, model) {
        super(className, baseConfig, logger, cls);
        this.baseConfig = baseConfig;
        this.logger = logger;
        this.cls = cls;
        this.model = model;
    }
    filterPopulate(populate) {
        return populate;
    }
    ;
    async startSession() {
        return new base_mongodb_session_adapter_1.BaseMongoDbSessionAdapter(await this.model.db.startSession(), this.baseConfig, this.logger, this.cls);
    }
    buildPopulatePaths(populate, session) {
        return populate.split(',').map((field) => ({
            path: field.trim(),
            options: session ? { session } : undefined,
        }));
    }
    async create({ request, previousSession, }) {
        const session = previousSession
            ? previousSession.getSession()
            : null;
        const created = await this.model.insertOne({
            ...request.data,
        }, { session });
        const filteredPopulate = this.filterPopulate(request.populate);
        if (filteredPopulate) {
            await created.populate(this.buildPopulatePaths(filteredPopulate, session));
        }
        return this.toEntity(created);
    }
    async findByIdOrThrow({ request, previousSession, maxTimeMS = 2000, }) {
        const session = previousSession
            ? previousSession.getSession()
            : null;
        const doc = await this.model.findOne({
            _id: request.id,
            deletedAt: null,
        }).session(session).maxTimeMS(maxTimeMS);
        if (!doc) {
            throw new common_1.NotFoundException(`Recurso do tipo ${this.model.modelName} com id ${request.id} não foi encontrado.`);
        }
        const filteredPopulate = this.filterPopulate(request.populate);
        if (filteredPopulate) {
            await doc.populate(this.buildPopulatePaths(filteredPopulate, session ?? undefined));
        }
        return this.toEntity(doc);
    }
    async findById({ request, previousSession, }) {
        try {
            return await this.findByIdOrThrow({ request, previousSession });
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                return null;
            }
            throw error;
        }
    }
    async _partialUpdateTransactionFn({ request, session, }) {
        const existing = await this.model.findOne({
            _id: request.id,
            deletedAt: null,
        }).session(session);
        if (!existing) {
            throw new common_1.NotFoundException(`Recurso do tipo ${this.model.modelName} com id ${request.id} não foi encontrado.`);
        }
        const merged = (0, deepmerge_ts_1.deepmergeCustom)({
            mergeArrays: false,
        })(existing.toObject(), request.data);
        Object.assign(existing, merged);
        await existing.save({ session });
        const filteredPopulate = this.filterPopulate(request.populate);
        if (filteredPopulate) {
            await existing.populate(this.buildPopulatePaths(filteredPopulate, session));
        }
        return this.toEntity(existing);
    }
    async _partialUpdate({ request, session, }) {
        if (session.inTransaction()) {
            return await this._partialUpdateTransactionFn({
                request,
                session,
            });
        }
        else {
            return await session.withTransaction(async () => {
                return await this._partialUpdateTransactionFn({
                    request,
                    session,
                });
            });
        }
    }
    async partialUpdateOrThrow({ request, previousSession, }) {
        if (previousSession) {
            return await this._partialUpdate({
                request,
                session: previousSession.getSession(),
            });
        }
        else {
            const session = await this.model.db.startSession();
            let result;
            try {
                result = await this._partialUpdate({
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
    async partialUpdate({ request, previousSession, }) {
        try {
            return await this.partialUpdateOrThrow({ request, previousSession });
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                return null;
            }
            throw error;
        }
    }
    async removeOrThrow({ request, previousSession, }) {
        const session = previousSession
            ? previousSession.getSession()
            : undefined;
        const doc = await this.model.findOneAndUpdate({
            _id: request.id,
            deletedAt: null,
        }, { $set: { deletedAt: new Date() } }, {
            session,
        });
        if (!doc) {
            throw new common_1.NotFoundException(`Recurso do tipo ${this.model.modelName} com id ${request.id} não foi encontrado.`);
        }
    }
    async remove({ request, previousSession, }) {
        try {
            await this.removeOrThrow({ request, previousSession });
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                return;
            }
            throw error;
        }
    }
}
exports.BaseDefaultMongoDbRepositoryAdapter = BaseDefaultMongoDbRepositoryAdapter;
__decorate([
    (0, log_utils_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseDefaultMongoDbRepositoryAdapter.prototype, "startSession", null);
__decorate([
    (0, log_utils_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Array)
], BaseDefaultMongoDbRepositoryAdapter.prototype, "buildPopulatePaths", null);
__decorate([
    (0, log_utils_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BaseDefaultMongoDbRepositoryAdapter.prototype, "create", null);
__decorate([
    (0, log_utils_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BaseDefaultMongoDbRepositoryAdapter.prototype, "findByIdOrThrow", null);
__decorate([
    (0, log_utils_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BaseDefaultMongoDbRepositoryAdapter.prototype, "findById", null);
__decorate([
    (0, log_utils_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BaseDefaultMongoDbRepositoryAdapter.prototype, "_partialUpdateTransactionFn", null);
__decorate([
    (0, log_utils_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BaseDefaultMongoDbRepositoryAdapter.prototype, "_partialUpdate", null);
__decorate([
    (0, log_utils_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BaseDefaultMongoDbRepositoryAdapter.prototype, "partialUpdateOrThrow", null);
__decorate([
    (0, log_utils_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BaseDefaultMongoDbRepositoryAdapter.prototype, "partialUpdate", null);
__decorate([
    (0, log_utils_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BaseDefaultMongoDbRepositoryAdapter.prototype, "removeOrThrow", null);
__decorate([
    (0, log_utils_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BaseDefaultMongoDbRepositoryAdapter.prototype, "remove", null);
//# sourceMappingURL=base-default-mongodb-repository.adapter.js.map