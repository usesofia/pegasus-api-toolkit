import { Global, Module } from '@nestjs/common';
import { ClerkAuthServiceAdapter } from '@app/auth/adapters/clerk-auth-service.adapter';
import { AUTH_SERVICE_PORT } from '@app/auth/ports/auth-service.port';
import { AUTH_GUARD, AuthGuard } from '@app/auth/guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import {
  GCP_SERVICE_ACCOUNT_GUARD,
  GcpServiceAccountGuard,
} from '@app/auth/guards/gcp-service-account.guard';
import { BASE_CONFIG, BaseConfigEntity } from '@app/config/base-config.entity';
import {
  ORGANIZATION_ROLES_GUARD,
  OrganizationRolesGuard,
} from '@app/auth/guards/organization-roles.guard';
import {
  ORGANIZATION_TYPES_GUARD,
  OrganizationTypesGuard,
} from '@app/auth/guards/organization-types.guard';

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: AUTH_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: GCP_SERVICE_ACCOUNT_GUARD,
      useClass: GcpServiceAccountGuard,
    },
    {
      provide: ORGANIZATION_ROLES_GUARD,
      useClass: OrganizationRolesGuard,
    },
    {
      provide: ORGANIZATION_TYPES_GUARD,
      useClass: OrganizationTypesGuard,
    },
    ClerkAuthServiceAdapter,
    {
      provide: AUTH_SERVICE_PORT,
      useClass: ClerkAuthServiceAdapter,
    },
    {
      provide: APP_GUARD,
      useFactory: (baseConfig: BaseConfigEntity, authGuard: AuthGuard) => {
        if (baseConfig.auth.applyAuthGuardToAllRoutes) {
          return authGuard;
        }
        return null;
      },
      inject: [BASE_CONFIG, AUTH_GUARD],
    },
    {
      provide: APP_GUARD,
      useFactory: (organizationRolesGuard: OrganizationRolesGuard) => {
        return organizationRolesGuard;
      },
      inject: [ORGANIZATION_ROLES_GUARD],
    },
    {
      provide: APP_GUARD,
      useFactory: (organizationTypesGuard: OrganizationTypesGuard) => {
        return organizationTypesGuard;
      },
      inject: [ORGANIZATION_TYPES_GUARD],
    },
    {
      provide: APP_GUARD,
      useFactory: (
        baseConfig: BaseConfigEntity,
        gcpServiceAccountGuard: GcpServiceAccountGuard,
      ) => {
        if (baseConfig.auth.applyGcpServiceAccountGuardToAllRoutes) {
          return gcpServiceAccountGuard;
        }
        return null;
      },
      inject: [BASE_CONFIG, GCP_SERVICE_ACCOUNT_GUARD],
    },
  ],
  controllers: [],
  exports: [AUTH_SERVICE_PORT],
})
export class AuthModule {}
