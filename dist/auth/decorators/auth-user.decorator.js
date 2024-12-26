"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUser = void 0;
const common_1 = require("@nestjs/common");
const auth_user_entity_1 = require("../entities/auth-user.entity");
exports.AuthUser = (0, common_1.createParamDecorator)((_, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return auth_user_entity_1.AuthUserEntity.build(request.user);
});
//# sourceMappingURL=auth-user.decorator.js.map