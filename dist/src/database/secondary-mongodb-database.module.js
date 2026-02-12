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
exports.SecondaryMongoDbDatabaseModule = exports.SECONDARY_MONGOOSE_CONNECTION = void 0;
const base_config_entity_1 = require("../config/base-config.entity");
const common_1 = require("@nestjs/common");
const mongoose_1 = __importDefault(require("mongoose"));
exports.SECONDARY_MONGOOSE_CONNECTION = Symbol('SecondaryMongooseConnection');
let SecondaryMongoDbDatabaseModule = class SecondaryMongoDbDatabaseModule {
    constructor(connection) {
        this.connection = connection;
    }
    async onApplicationShutdown() {
        await this.connection.close();
    }
};
exports.SecondaryMongoDbDatabaseModule = SecondaryMongoDbDatabaseModule;
exports.SecondaryMongoDbDatabaseModule = SecondaryMongoDbDatabaseModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [
            {
                provide: exports.SECONDARY_MONGOOSE_CONNECTION,
                useFactory: async (baseConfig) => {
                    const mongoDatabases = baseConfig.databases.filter((db) => db.type === 'mongodb');
                    if (mongoDatabases.length < 2) {
                        throw new Error('No secondary MongoDB database found.');
                    }
                    const secondaryMongoDatabase = mongoDatabases[1];
                    const maxRetries = 7;
                    let delay = 2000;
                    for (let i = 0; i < maxRetries; i++) {
                        try {
                            const connection = await mongoose_1.default.createConnection(secondaryMongoDatabase.uri, {
                                maxPoolSize: 50,
                                minPoolSize: 5,
                                maxIdleTimeMS: 60000,
                                serverSelectionTimeoutMS: 10000,
                                connectTimeoutMS: 10000,
                                socketTimeoutMS: 60000,
                                readPreference: 'secondaryPreferred',
                                family: 4,
                            }).asPromise();
                            console.log('✅ Secondary MongoDB connected successfully');
                            return connection;
                        }
                        catch (error) {
                            if (i === maxRetries - 1)
                                throw error;
                            console.warn(`⚠️ Falha ao conectar ao Mongo secundário (tentativa ${i + 1}/${maxRetries}). Tentando em ${delay}ms...`);
                            console.warn('Erro:', error);
                            await new Promise((res) => setTimeout(res, delay));
                            delay *= 2;
                        }
                    }
                    throw new Error('Failed to connect to secondary MongoDB after all attempts.');
                },
                inject: [base_config_entity_1.BASE_CONFIG],
            },
        ],
        exports: [exports.SECONDARY_MONGOOSE_CONNECTION],
    }),
    __param(0, (0, common_1.Inject)(exports.SECONDARY_MONGOOSE_CONNECTION)),
    __metadata("design:paramtypes", [mongoose_1.default.Connection])
], SecondaryMongoDbDatabaseModule);
//# sourceMappingURL=secondary-mongodb-database.module.js.map