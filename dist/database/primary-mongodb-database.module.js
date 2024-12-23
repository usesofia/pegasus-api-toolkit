"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrimaryMongoDatabaseModule = exports.PRIMARY_MONGOOSE_CONNECTION = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const base_config_entity_1 = require("../config/base-config.entity");
exports.PRIMARY_MONGOOSE_CONNECTION = Symbol('PrimaryMongooseConnection');
let PrimaryMongoDatabaseModule = class PrimaryMongoDatabaseModule {
};
exports.PrimaryMongoDatabaseModule = PrimaryMongoDatabaseModule;
exports.PrimaryMongoDatabaseModule = PrimaryMongoDatabaseModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [
            {
                provide: exports.PRIMARY_MONGOOSE_CONNECTION,
                useFactory: (baseConfig) => {
                    const mongoDatabases = baseConfig.databases.filter((db) => db.type === 'mongodb');
                    if (mongoDatabases.length === 0) {
                        throw new Error('No MongoDB databases found.');
                    }
                    const primaryMongoDatabase = mongoDatabases[0];
                    return mongoose_1.default.connect(primaryMongoDatabase.uri);
                },
                inject: [base_config_entity_1.BASE_CONFIG],
            },
        ],
        exports: [exports.PRIMARY_MONGOOSE_CONNECTION],
    })
], PrimaryMongoDatabaseModule);
//# sourceMappingURL=primary-mongodb-database.module.js.map