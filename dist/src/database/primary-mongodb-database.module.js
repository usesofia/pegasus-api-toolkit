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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrimaryMongoDbDatabaseModule = exports.PRIMARY_MONGOOSE_CONNECTION = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = __importDefault(require("mongoose"));
const base_config_entity_1 = require("../config/base-config.entity");
exports.PRIMARY_MONGOOSE_CONNECTION = Symbol('PrimaryMongooseConnection');
let PrimaryMongoDbDatabaseModule = class PrimaryMongoDbDatabaseModule {
    constructor(connection) {
        this.connection = connection;
    }
    async onApplicationShutdown() {
        await this.connection.close();
    }
};
exports.PrimaryMongoDbDatabaseModule = PrimaryMongoDbDatabaseModule;
exports.PrimaryMongoDbDatabaseModule = PrimaryMongoDbDatabaseModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [
            {
                provide: exports.PRIMARY_MONGOOSE_CONNECTION,
                useFactory: async (baseConfig) => {
                    const mongoDatabases = baseConfig.databases.filter((db) => db.type === 'mongodb');
                    if (mongoDatabases.length === 0) {
                        throw new Error('No MongoDB database found.');
                    }
                    const primaryMongoDatabase = mongoDatabases[0];
                    return await mongoose_1.default.createConnection(primaryMongoDatabase.uri).asPromise();
                },
                inject: [base_config_entity_1.BASE_CONFIG],
            },
        ],
        exports: [exports.PRIMARY_MONGOOSE_CONNECTION],
    }),
    __param(0, (0, common_1.Inject)(exports.PRIMARY_MONGOOSE_CONNECTION)),
    __metadata("design:paramtypes", [mongoose_1.default.Connection])
], PrimaryMongoDbDatabaseModule);
//# sourceMappingURL=primary-mongodb-database.module.js.map