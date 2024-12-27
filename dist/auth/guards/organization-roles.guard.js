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
exports.ORGANIZATION_ROLES_GUARD = exports.OrganizationRolesGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const organization_roles_decorator_1 = require("../decorators/organization-roles.decorator");
let OrganizationRolesGuard = class OrganizationRolesGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const allowedRoles = this.reflector.get(organization_roles_decorator_1.ORGANIZATION_ROLES_KEY, context.getHandler());
        if (!allowedRoles) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();
        const userOrgRole = user.organization.role;
        if (!userOrgRole) {
            return false;
        }
        return allowedRoles.includes(userOrgRole);
    }
};
exports.OrganizationRolesGuard = OrganizationRolesGuard;
exports.OrganizationRolesGuard = OrganizationRolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], OrganizationRolesGuard);
exports.ORGANIZATION_ROLES_GUARD = Symbol('OrganizationRolesGuard');
//# sourceMappingURL=organization-roles.guard.js.map