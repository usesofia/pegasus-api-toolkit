import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthUserEntity } from '../entities/auth-user.entity';
import { ORG_TYPES_KEY } from '../decorators/org-types.decorator';

@Injectable()
export class OrgTypesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const allowedTypes = this.reflector.get<string[]>(
      ORG_TYPES_KEY,
      context.getHandler(),
    );
    if (!allowedTypes) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();

    const userOrgType = (user as AuthUserEntity).orgType;
    if (!userOrgType) {
      return false;
    }

    return allowedTypes.includes(userOrgType);
  }
}

export const ORG_TYPES_GUARD = Symbol('OrgTypesGuard');
