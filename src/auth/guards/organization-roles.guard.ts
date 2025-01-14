import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthUserEntity } from '../entities/auth-user.entity';
import { ORGANIZATION_ROLES_KEY } from '../decorators/organization-roles.decorator';

@Injectable()
export class OrganizationRolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const allowedRoles = this.reflector.get<string[]>(
      ORGANIZATION_ROLES_KEY,
      context.getHandler(),
    );
    if (!allowedRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();

    const userOrgRole = (user as AuthUserEntity).organization!.role;
    
    if (!userOrgRole) {
      return false;
    }

    return allowedRoles.includes(userOrgRole);
  }
}

export const ORGANIZATION_ROLES_GUARD = Symbol('OrganizationRolesGuard');
