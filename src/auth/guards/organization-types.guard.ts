import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  LoggerService,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthUserEntity } from '../entities/auth-user.entity';
import { ORGANIZATION_TYPES_KEY } from '../decorators/organization-types.decorator';
import { AuthGuard } from './auth.guard';
import { BASE_CONFIG, BaseConfigEntity } from '../../config/base-config.entity';
import { ClsService } from 'nestjs-cls';
import { LOGGER_SERVICE_PORT } from '../../logger/logger.module';
import { AUTH_SERVICE_PORT, AuthServicePort } from '../ports/auth-service.port';

@Injectable()
export class OrganizationTypesGuard extends AuthGuard implements CanActivate {
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
    const allowedTypes = this.reflector.get<string[]>(
      ORGANIZATION_TYPES_KEY,
      context.getHandler(),
    );

    if (!allowedTypes) {
      return true;
    }

    let { user } = context.switchToHttp().getRequest();

    if (!user) {
      await super.canActivate(context);
      user = context.switchToHttp().getRequest().user;
    }

    const userOrgType = (user as AuthUserEntity).organization!.type;

    if (!userOrgType) {
      return false;
    }

    return allowedTypes.includes(userOrgType);
  }
}

export const ORGANIZATION_TYPES_GUARD = Symbol('OrganizationTypesGuard');
