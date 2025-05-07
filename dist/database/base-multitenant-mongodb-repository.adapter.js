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
const mongodb_1 = require("mongodb");
const regex_utils_1 = require("../utils/regex.utils");
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
    buildPopulatePaths(populate, session) {
        return populate.split(',').map((field) => ({
            path: field.trim(),
            options: session ? { session } : undefined,
        }));
    }
    async create({ requester, request, previousSession, }) {
        const session = previousSession
            ? previousSession.getSession()
            : null;
        const created = await this.model.insertOne({
            ...request.data,
            ownerOrganization: this.getOwnerOrganization({ requester }),
        }, { session });
        if (request.populate) {
            await created.populate(this.buildPopulatePaths(request.populate, session ?? undefined));
        }
        return this.toEntity(created);
    }
    async findByIdOrThrow({ requester, request, previousSession, }) {
        const session = previousSession
            ? previousSession.getSession()
            : null;
        const doc = await this.model.findOne({
            _id: request.id,
            ownerOrganization: this.getOwnerOrganization({ requester }),
            deletedAt: null,
        }).session(session);
        if (!doc) {
            throw new common_1.NotFoundException(`Recurso do tipo ${this.model.modelName} com id ${request.id} não foi encontrado.`);
        }
        if (request.populate) {
            await doc.populate(this.buildPopulatePaths(request.populate, session ?? undefined));
        }
        return this.toEntity(doc);
    }
    async findById({ requester, request, previousSession, }) {
        try {
            return await this.findByIdOrThrow({ requester, request, previousSession });
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                return null;
            }
            throw error;
        }
    }
    async _partialUpdateTransactionFn({ requester, request, session, }) {
        const existing = await this.model.findOne({
            _id: request.id,
            ownerOrganization: this.getOwnerOrganization({ requester }),
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
        if (request.populate) {
            await existing.populate(this.buildPopulatePaths(request.populate, session));
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
        const session = previousSession
            ? previousSession.getSession()
            : undefined;
        const doc = await this.model.findOneAndUpdate({
            _id: request.id,
            ownerOrganization: this.getOwnerOrganization({ requester }),
            deletedAt: null,
        }, { $set: { deletedAt: new Date() } }, {
            session,
        });
        if (!doc) {
            throw new common_1.NotFoundException(`Recurso do tipo ${this.model.modelName} com id ${request.id} não foi encontrado.`);
        }
    }
    async remove({ requester, request, previousSession, }) {
        try {
            await this.removeOrThrow({ requester, request, previousSession });
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                return;
            }
            throw error;
        }
    }
    getTextSearchPipeline({ requester, textSearchTerm, indexName = 'text_search_index', stringSearchableFields, }) {
        return {
            $search: {
                index: indexName,
                compound: {
                    filter: [
                        {
                            equals: {
                                path: 'ownerOrganization',
                                value: this.getOwnerOrganization({ requester }),
                            },
                        },
                    ],
                    should: [
                        {
                            text: {
                                query: textSearchTerm,
                                path: stringSearchableFields.map(({ path }) => path),
                                fuzzy: {},
                            },
                        },
                        ...stringSearchableFields
                            .map(({ path, sanitizer }) => {
                            const sanitized = sanitizer(textSearchTerm);
                            if (sanitized === undefined || sanitized === '')
                                return null;
                            return {
                                regex: {
                                    query: `.*${(0, regex_utils_1.escapeRegex)(sanitized)}.*`,
                                    path,
                                    allowAnalyzedField: true,
                                },
                            };
                        })
                            .filter(Boolean),
                        ...(mongodb_1.ObjectId.isValid(textSearchTerm)
                            ? [
                                {
                                    equals: {
                                        path: '_id',
                                        value: mongodb_1.ObjectId.createFromHexString(textSearchTerm),
                                    },
                                },
                            ]
                            : []),
                    ],
                    minimumShouldMatch: 1,
                },
            },
        };
    }
    getSemanticSearchPipeline({ requester, indexName = 'semantic_search_index', queryVector, path, limit, }) {
        return {
            $vectorSearch: {
                index: indexName,
                path,
                queryVector,
                numCandidates: 100,
                limit,
                filter: {
                    $and: [
                        {
                            ownerOrganization: this.getOwnerOrganization({ requester }),
                            deletedAt: null,
                        },
                    ],
                },
            },
        };
    }
    async findAllWithOutdatedMarkdownEmbedding({ limit, deltaDurationToConsiderAsOutdated, previousSession, }) {
        const session = previousSession
            ? previousSession.getSession()
            : null;
        const currentDate = new Date();
        const thresholdDate = new Date(currentDate.getTime() - deltaDurationToConsiderAsOutdated.toMillis());
        const outdateds = await this.model.find({
            $or: [
                {
                    $or: [
                        { markdownEmbeddingUpdatedAt: null },
                        { markdownEmbeddingUpdatedAt: { $exists: false } }
                    ],
                    updatedAt: { $lt: thresholdDate }
                },
                {
                    markdownEmbeddingUpdatedAt: { $ne: null, $exists: true },
                    $expr: {
                        $and: [
                            { $gt: ["$updatedAt", "$markdownEmbeddingUpdatedAt"] },
                            {
                                $gt: [
                                    { $subtract: ["$updatedAt", "$markdownEmbeddingUpdatedAt"] },
                                    deltaDurationToConsiderAsOutdated.toMillis()
                                ]
                            }
                        ]
                    }
                }
            ],
            deletedAt: null
        })
            .limit(limit)
            .session(session);
        return outdateds.map(this.toEntity.bind(this));
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
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], BaseMultitenantMongoDbRepositoryAdapter.prototype, "buildPopulatePaths", null);
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
__decorate([
    (0, log_utils_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], BaseMultitenantMongoDbRepositoryAdapter.prototype, "getTextSearchPipeline", null);
__decorate([
    (0, log_utils_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], BaseMultitenantMongoDbRepositoryAdapter.prototype, "getSemanticSearchPipeline", null);
__decorate([
    (0, log_utils_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BaseMultitenantMongoDbRepositoryAdapter.prototype, "findAllWithOutdatedMarkdownEmbedding", null);
//# sourceMappingURL=base-multitenant-mongodb-repository.adapter.js.map