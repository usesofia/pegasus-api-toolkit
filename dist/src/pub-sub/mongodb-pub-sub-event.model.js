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
exports.MongoDbPubSubEventModelSchema = exports.MongoDbPubSubEventModel = exports.PUB_SUB_EVENTS_COLLECTION_NAME = void 0;
const mongoose_1 = require("@nestjs/mongoose");
exports.PUB_SUB_EVENTS_COLLECTION_NAME = '_PubSubEvents';
let MongoDbPubSubEventModel = class MongoDbPubSubEventModel {
};
exports.MongoDbPubSubEventModel = MongoDbPubSubEventModel;
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], MongoDbPubSubEventModel.prototype, "topic", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], MongoDbPubSubEventModel.prototype, "payload", void 0);
exports.MongoDbPubSubEventModel = MongoDbPubSubEventModel = __decorate([
    (0, mongoose_1.Schema)({
        collection: exports.PUB_SUB_EVENTS_COLLECTION_NAME,
        timestamps: true,
    })
], MongoDbPubSubEventModel);
exports.MongoDbPubSubEventModelSchema = mongoose_1.SchemaFactory.createForClass(MongoDbPubSubEventModel);
//# sourceMappingURL=mongodb-pub-sub-event.model.js.map