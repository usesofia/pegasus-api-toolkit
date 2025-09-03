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
exports.MongoDbOrganizationModelSchema = exports.MongoDbOrganizationModel = void 0;
const sync_organizations_constants_1 = require("./sync-organizations.constants");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let MongoDbOrganizationModel = class MongoDbOrganizationModel extends mongoose_2.Document {
};
exports.MongoDbOrganizationModel = MongoDbOrganizationModel;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], MongoDbOrganizationModel.prototype, "organizationId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], MongoDbOrganizationModel.prototype, "organizationName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, required: true }),
    __metadata("design:type", Date)
], MongoDbOrganizationModel.prototype, "organizationCreatedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: Object.values(sync_organizations_constants_1.OrganizationSubscriptionStatus), required: true }),
    __metadata("design:type", String)
], MongoDbOrganizationModel.prototype, "organizationSubscriptionStatus", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: Object.values(sync_organizations_constants_1.OrganizationSubtype), required: true }),
    __metadata("design:type", String)
], MongoDbOrganizationModel.prototype, "organizationSubtype", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: false, default: null }),
    __metadata("design:type", Object)
], MongoDbOrganizationModel.prototype, "bpoOfficeOrganizationId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: false, default: null }),
    __metadata("design:type", Object)
], MongoDbOrganizationModel.prototype, "bpoOfficeName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, required: false }),
    __metadata("design:type", Date)
], MongoDbOrganizationModel.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, required: false }),
    __metadata("design:type", Date)
], MongoDbOrganizationModel.prototype, "updatedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, nullable: true, default: null, required: false }),
    __metadata("design:type", Object)
], MongoDbOrganizationModel.prototype, "deletedAt", void 0);
exports.MongoDbOrganizationModel = MongoDbOrganizationModel = __decorate([
    (0, mongoose_1.Schema)({
        collection: sync_organizations_constants_1.ORGANIZATION_COLLECTION_NAME,
        timestamps: true,
    })
], MongoDbOrganizationModel);
exports.MongoDbOrganizationModelSchema = mongoose_1.SchemaFactory.createForClass(MongoDbOrganizationModel);
exports.MongoDbOrganizationModelSchema.index({ organizationId: 1 });
exports.MongoDbOrganizationModelSchema.index({ createdAt: -1 });
//# sourceMappingURL=mongodb-organization-model.js.map