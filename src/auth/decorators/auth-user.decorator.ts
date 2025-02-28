import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthUserEntity, AuthUserEntitySchema } from '@app/auth/entities/auth-user.entity';
import { z } from 'zod';

export const AuthUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): AuthUserEntity => {
    const request = ctx.switchToHttp().getRequest<{
      user: z.input<typeof AuthUserEntitySchema>;
    }>();
    return AuthUserEntity.build(request.user);
  },
);
