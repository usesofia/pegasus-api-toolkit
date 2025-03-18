import {
  createParamDecorator,
  ExecutionContext,
  PipeTransform,
} from '@nestjs/common';
import {
  AuthUserEntity,
  AuthUserEntitySchema,
} from '@app/auth/entities/auth-user.entity';
import { z } from 'zod';

class AuthUserPipe
  implements PipeTransform<z.infer<typeof AuthUserEntitySchema>, AuthUserEntity>
{
  transform(value: z.infer<typeof AuthUserEntitySchema>): AuthUserEntity {
    return AuthUserEntity.build(value);
  }
}

const RawAuthUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): z.infer<typeof AuthUserEntitySchema> => {
    const request = ctx.switchToHttp().getRequest<{
      user: z.input<typeof AuthUserEntitySchema>;
    }>();
    return request.user;
  },
);

export const AuthUser = () => RawAuthUser(new AuthUserPipe());
