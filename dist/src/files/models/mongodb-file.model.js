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
exports.MongoDbFileModelSchema = exports.MongoDbFileModel = void 0;
const file_entity_1 = require("../entities/file.entity");
const files_constants_1 = require("../files.constants");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let MongoDbFileModel = class MongoDbFileModel extends mongoose_2.Document {
};
exports.MongoDbFileModel = MongoDbFileModel;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], MongoDbFileModel.prototype, "ownerOrganization", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], MongoDbFileModel.prototype, "originalFileName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], MongoDbFileModel.prototype, "mimeType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true }),
    __metadata("design:type", Number)
], MongoDbFileModel.prototype, "size", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: Object.values(file_entity_1.FileType), required: true }),
    __metadata("design:type", String)
], MongoDbFileModel.prototype, "fileType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, unique: true }),
    __metadata("design:type", String)
], MongoDbFileModel.prototype, "objectName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: Object.values(file_entity_1.FileStatus), required: true }),
    __metadata("design:type", String)
], MongoDbFileModel.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: false, default: null }),
    __metadata("design:type", Object)
], MongoDbFileModel.prototype, "caption", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, required: false }),
    __metadata("design:type", Date)
], MongoDbFileModel.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, required: false }),
    __metadata("design:type", Date)
], MongoDbFileModel.prototype, "updatedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, nullable: true, default: null, required: false }),
    __metadata("design:type", Object)
], MongoDbFileModel.prototype, "deletedAt", void 0);
exports.MongoDbFileModel = MongoDbFileModel = __decorate([
    (0, mongoose_1.Schema)({ collection: files_constants_1.FILES_COLLECTION_NAME, timestamps: true })
], MongoDbFileModel);
exports.MongoDbFileModelSchema = mongoose_1.SchemaFactory.createForClass(MongoDbFileModel);
exports.MongoDbFileModelSchema.index({ ownerOrganization: 1 });
exports.MongoDbFileModelSchema.index({ status: 1 });
exports.MongoDbFileModelSchema.index({ deletedAt: 1 });
//# sourceMappingURL=mongodb-file.model.js.map