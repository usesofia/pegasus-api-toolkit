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
class BaseMongoDbRepositoryAdapter extends base_1.Base {
    constructor(className, baseConfig, logger, cls, model) {
        super(className, baseConfig, logger, cls);
        this.baseConfig = baseConfig;
        this.logger = logger;
        this.cls = cls;
        this.model = model;
    }
    async create({ requester, request, }) {
        const created = new this.model({
            ...request.data,
            organization: requester.organization,
            createdByUser: requester.id,
            createdByOrganization: requester.organization,
        });
        let saved = await created.save();
        if (request.populate) {
            saved = await saved.populate(request.populate.split(','));
        }
        return this.toEntity(saved);
    }
    async findOne({ requester, request, }) {
        const doc = await this.model.findOne({
            _id: request.id,
            organization: requester.organization,
        });
        if (!doc) {
            throw new common_1.NotFoundException('Recurso não encontrado.');
        }
        if (request.populate) {
            await doc.populate(request.populate.split(','));
        }
        return this.toEntity(doc);
    }
    async partialUpdate({ requester, request, }) {
        const session = await this.model.db.startSession();
        try {
            let updated = await session.withTransaction(async () => {
                const existing = await this.model.findOne({
                    _id: request.id,
                    organization: requester.organization,
                }).session(session);
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
                return existing;
            });
            if (!updated) {
                throw new common_1.NotFoundException('Recurso não encontrado.');
            }
            return this.toEntity(updated);
        }
        finally {
            await session.endSession();
        }
    }
    async remove({ requester, request, }) {
        await this.model.findOneAndDelete({
            _id: request.id,
            organization: requester.organization,
        });
    }
}
exports.BaseMongoDbRepositoryAdapter = BaseMongoDbRepositoryAdapter;
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
], BaseMongoDbRepositoryAdapter.prototype, "partialUpdate", null);
__decorate([
    (0, log_utils_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BaseMongoDbRepositoryAdapter.prototype, "remove", null);
//# sourceMappingURL=base-mongodb-repository.adapter.js.map