"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationSubtype = exports.OrganizationSubscriptionStatus = exports.ORGANIZATION_MODEL = exports.ORGANIZATION_COLLECTION_NAME = void 0;
exports.ORGANIZATION_COLLECTION_NAME = 'Organizations';
exports.ORGANIZATION_MODEL = Symbol('OrganizationModel');
var OrganizationSubscriptionStatus;
(function (OrganizationSubscriptionStatus) {
    OrganizationSubscriptionStatus["TRIAL"] = "TRIAL";
    OrganizationSubscriptionStatus["PAYING"] = "PAYING";
    OrganizationSubscriptionStatus["FREE"] = "FREE";
    OrganizationSubscriptionStatus["CANCELLED"] = "CANCELLED";
})(OrganizationSubscriptionStatus || (exports.OrganizationSubscriptionStatus = OrganizationSubscriptionStatus = {}));
var OrganizationSubtype;
(function (OrganizationSubtype) {
    OrganizationSubtype["PERSONAL"] = "PERSONAL";
    OrganizationSubtype["DEFAULT_BUSINESS"] = "DEFAULT_BUSINESS";
    OrganizationSubtype["BPO_MANAGED_BUSINESS"] = "BPO_MANAGED_BUSINESS";
    OrganizationSubtype["BPO_OFFICE"] = "BPO_OFFICE";
})(OrganizationSubtype || (exports.OrganizationSubtype = OrganizationSubtype = {}));
//# sourceMappingURL=sync-organizations.constants.js.map