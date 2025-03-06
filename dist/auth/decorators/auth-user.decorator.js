"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUser = void 0;
const common_1 = require("@nestjs/common");
const auth_user_entity_1 = require("../entities/auth-user.entity");
class AuthUserPipe {
    transform(value) {
        return auth_user_entity_1.AuthUserEntity.build(value);
    }
}
const RawAuthUser = (0, common_1.createParamDecorator)((_, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
});
const AuthUser = () => RawAuthUser(new AuthUserPipe());
exports.AuthUser = AuthUser;
//# sourceMappingURL=auth-user.decorator.js.map