"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseMultitenantMongoDbRepositoryAdapter = void 0;
const common_1 = require("@nestjs/common");
const base_1 = require("../base");
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
            options: session ? { session, maxTimeMS: 2000 } : undefined,
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
        const filteredPopulate = this.filterPopulate(request.populate);
        if (filteredPopulate) {
            await created.populate(this.buildPopulatePaths(filteredPopulate, session ?? undefined));
        }
        return this.toEntity({ doc: created, requester });
    }
    async findByIdOrThrow({ requester, request, previousSession, maxTimeMS = 2000, }) {
        const session = previousSession
            ? previousSession.getSession()
            : null;
        const doc = await this.model.findOne({
            _id: request.id,
            ownerOrganization: this.getOwnerOrganization({ requester }),
            deletedAt: null,
        }).session(session).maxTimeMS(maxTimeMS);
        if (!doc) {
            throw new common_1.NotFoundException(`Recurso do tipo ${this.model.modelName} com id ${request.id} não foi encontrado.`);
        }
        const filteredPopulate = this.filterPopulate(request.populate);
        if (filteredPopulate) {
            await doc.populate(this.buildPopulatePaths(filteredPopulate, session ?? undefined));
        }
        return this.toEntity({ doc, requester });
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
        const filteredPopulate = this.filterPopulate(request.populate);
        if (filteredPopulate) {
            await existing.populate(this.buildPopulatePaths(filteredPopulate, session));
        }
        return this.toEntity({ doc: existing, requester });
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
                numCandidates: Math.min(10 * limit, 10000),
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
        return await Promise.all(outdateds.map(async (doc) => this.toEntity({ doc })));
    }
}
exports.BaseMultitenantMongoDbRepositoryAdapter = BaseMultitenantMongoDbRepositoryAdapter;
//# sourceMappingURL=base-multitenant-mongodb-repository.adapter.js.map