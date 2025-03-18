import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  LoggerService,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  AuthUserEntity,
  AuthUserEntitySchema,
} from '@app/auth/entities/auth-user.entity';
import { ORGANIZATION_ROLES_KEY } from '@app/auth/decorators/organization-roles.decorator';
import { AuthGuard } from '@app/auth/guards/auth.guard';
import { BASE_CONFIG, BaseConfigEntity } from '@app/config/base-config.entity';
import { ClsService } from 'nestjs-cls';
import { LOGGER_SERVICE_PORT } from '@app/logger/logger.module';
import {
  AUTH_SERVICE_PORT,
  AuthServicePort,
} from '@app/auth/ports/auth-service.port';
import { z } from 'zod';

@Injectable()
export class OrganizationRolesGuard extends AuthGuard implements CanActivate {
  constructor(
    @Inject(BASE_CONFIG) protected readonly baseConfig: BaseConfigEntity,
    @Inject(LOGGER_SERVICE_PORT) protected readonly logger: LoggerService,
    protected readonly cls: ClsService,
    protected readonly reflector: Reflector,
    @Inject(AUTH_SERVICE_PORT)
    protected readonly authService: AuthServicePort,
  ) {
    super(baseConfig, logger, cls, reflector, authService);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const allowedRoles = this.reflector.get<string[] | null | undefined>(
      ORGANIZATION_ROLES_KEY,
      context.getHandler(),
    );

    if (!allowedRoles || allowedRoles.length === 0) {
      return true;
    }

    let { user } = context.switchToHttp().getRequest<{
      user: z.input<typeof AuthUserEntitySchema> | null | undefined;
    }>();

    if (!user) {
      await super.canActivate(context);
      user = context.switchToHttp().getRequest<{
        user: z.input<typeof AuthUserEntitySchema>;
      }>().user;
    }

    const userOrgRole = (user as AuthUserEntity).organization?.role;

    if (!userOrgRole) {
      return false;
    }

    return allowedRoles.includes(userOrgRole);
  }
}

export const ORGANIZATION_ROLES_GUARD = Symbol('OrganizationRolesGuard');
