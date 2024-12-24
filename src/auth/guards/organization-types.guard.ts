import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthUserEntity } from '../entities/auth-user.entity';
import { ORGANIZATION_TYPES_KEY } from '../decorators/organization-types.decorator';

@Injectable()
export class OrganizationTypesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const allowedTypes = this.reflector.get<string[]>(
      ORGANIZATION_TYPES_KEY,
      context.getHandler(),
    );
    if (!allowedTypes) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();

    const userOrgType = (user as AuthUserEntity).organitzaionType;
    if (!userOrgType) {
      return false;
    }

    return allowedTypes.includes(userOrgType);
  }
}

export const ORGANIZATION_TYPES_GUARD = Symbol('OrganizationTypesGuard');
