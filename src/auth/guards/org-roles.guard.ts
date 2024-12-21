import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthUserEntity } from '../entities/auth-user.entity';
import { ORG_ROLES_KEY } from '../decorators/org-roles.decorator';

@Injectable()
export class OrgRolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const allowedRoles = this.reflector.get<string[]>(
      ORG_ROLES_KEY,
      context.getHandler(),
    );
    if (!allowedRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    const userOrgRole = (user as AuthUserEntity).orgRole;
    if (!userOrgRole) {
      return false;
    }

    return allowedRoles.includes(userOrgRole);
  }
}
