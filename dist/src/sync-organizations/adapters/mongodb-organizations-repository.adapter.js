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
var MongoDbOrganizationsRepositoryAdapter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDbOrganizationsRepositoryAdapter = void 0;
const base_1 = require("../../base");
const base_config_entity_1 = require("../../config/base-config.entity");
const logger_module_1 = require("../../logger/logger.module");
const sync_organizations_constants_1 = require("../sync-organizations.constants");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const nestjs_cls_1 = require("nestjs-cls");
let MongoDbOrganizationsRepositoryAdapter = MongoDbOrganizationsRepositoryAdapter_1 = class MongoDbOrganizationsRepositoryAdapter extends base_1.Base {
    constructor(baseConfig, logger, cls, model) {
        super(MongoDbOrganizationsRepositoryAdapter_1.name, baseConfig, logger, cls);
        this.baseConfig = baseConfig;
        this.logger = logger;
        this.cls = cls;
        this.model = model;
    }
    async createOrUpdate({ organizationId, organizationName, organizationCreatedAt, organizationSubscriptionStatus, organizationSubtype, bpoOfficeOrganizationId, bpoOfficeName, }) {
        await this.model.updateOne({ organizationId }, {
            organizationName,
            organizationCreatedAt,
            organizationSubscriptionStatus,
            organizationSubtype,
            bpoOfficeOrganizationId,
            bpoOfficeName,
        }, { upsert: true });
    }
};
exports.MongoDbOrganizationsRepositoryAdapter = MongoDbOrganizationsRepositoryAdapter;
exports.MongoDbOrganizationsRepositoryAdapter = MongoDbOrganizationsRepositoryAdapter = MongoDbOrganizationsRepositoryAdapter_1 = __decorate([
    __param(0, (0, common_1.Inject)(base_config_entity_1.BASE_CONFIG)),
    __param(1, (0, common_1.Inject)(logger_module_1.LOGGER_SERVICE_PORT)),
    __param(3, (0, common_1.Inject)(sync_organizations_constants_1.ORGANIZATION_MODEL)),
    __metadata("design:paramtypes", [base_config_entity_1.BaseConfigEntity, Object, nestjs_cls_1.ClsService,
        mongoose_1.Model])
], MongoDbOrganizationsRepositoryAdapter);
//# sourceMappingURL=mongodb-organizations-repository.adapter.js.map