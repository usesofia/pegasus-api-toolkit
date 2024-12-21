import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthUserEntity } from '../entities/auth-user.entity';

export const AuthUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): AuthUserEntity => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
