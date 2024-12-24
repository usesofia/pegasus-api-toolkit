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
exports.ORGANIZATION_TYPES_GUARD = exports.OrganizationTypesGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const organization_types_decorator_1 = require("../decorators/organization-types.decorator");
let OrganizationTypesGuard = class OrganizationTypesGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const allowedTypes = this.reflector.get(organization_types_decorator_1.ORGANIZATION_TYPES_KEY, context.getHandler());
        if (!allowedTypes) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();
        const userOrgType = user.organitzaionType;
        if (!userOrgType) {
            return false;
        }
        return allowedTypes.includes(userOrgType);
    }
};
exports.OrganizationTypesGuard = OrganizationTypesGuard;
exports.OrganizationTypesGuard = OrganizationTypesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], OrganizationTypesGuard);
exports.ORGANIZATION_TYPES_GUARD = Symbol('OrganizationTypesGuard');
//# sourceMappingURL=organization-types.guard.js.map