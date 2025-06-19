"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDbPubSubEventModule = exports.PUB_SUB_CONNECTION_MODEL_NAME = exports.PUB_SUB_EVENT_MODEL = void 0;
const primary_mongodb_database_module_1 = require("../database/primary-mongodb-database.module");
const mongodb_pub_sub_event_model_1 = require("./mongodb-pub-sub-event.model");
const common_1 = require("@nestjs/common");
exports.PUB_SUB_EVENT_MODEL = Symbol('PubSubEventModel');
exports.PUB_SUB_CONNECTION_MODEL_NAME = 'PubSubEvents';
let MongoDbPubSubEventModule = class MongoDbPubSubEventModule {
};
exports.MongoDbPubSubEventModule = MongoDbPubSubEventModule;
exports.MongoDbPubSubEventModule = MongoDbPubSubEventModule = __decorate([
    (0, common_1.Module)({
        providers: [
            {
                provide: exports.PUB_SUB_EVENT_MODEL,
                useFactory: (connection) => {
                    return connection.model(exports.PUB_SUB_CONNECTION_MODEL_NAME, mongodb_pub_sub_event_model_1.MongoDbPubSubEventModelSchema);
                },
                inject: [primary_mongodb_database_module_1.PRIMARY_MONGOOSE_CONNECTION],
            },
        ],
        exports: [exports.PUB_SUB_EVENT_MODEL],
    })
], MongoDbPubSubEventModule);
//# sourceMappingURL=mongodb-pub-sub-event.module.js.map