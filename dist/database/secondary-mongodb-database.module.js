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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecondaryMongoDbDatabaseModule = exports.SECONDARY_MONGOOSE_CONNECTION = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const base_config_entity_1 = require("../config/base-config.entity");
exports.SECONDARY_MONGOOSE_CONNECTION = Symbol('SecondaryMongooseConnection');
let SecondaryMongoDbDatabaseModule = class SecondaryMongoDbDatabaseModule {
    constructor(connection) {
        this.connection = connection;
    }
    async onApplicationShutdown() {
        await this.connection.disconnect();
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
                    return await mongoose_1.default.connect(secondaryMongoDatabase.uri);
                },
                inject: [base_config_entity_1.BASE_CONFIG],
            },
        ],
        exports: [exports.SECONDARY_MONGOOSE_CONNECTION],
    }),
    __param(0, (0, common_1.Inject)(exports.SECONDARY_MONGOOSE_CONNECTION)),
    __metadata("design:paramtypes", [mongoose_1.default.Mongoose])
], SecondaryMongoDbDatabaseModule);
//# sourceMappingURL=secondary-mongodb-database.module.js.map