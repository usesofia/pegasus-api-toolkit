import { Global, Module } from '@nestjs/common';
import { ClerkAuthServiceAdapter } from './adapters/clerk-auth-service.adapter';
import { AUTH_SERVICE_PORT } from './ports/auth-service.port';
import { AUTH_GUARD, AuthGuard } from './guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { ORG_ROLES_GUARD, OrgRolesGuard } from './guards/org-roles.guard';
import { ORG_TYPES_GUARD, OrgTypesGuard } from './guards/org-types.guard';
import {
  GCP_SERVICE_ACCOUNT_GUARD,
  GcpServiceAccountGuard,
} from './guards/gcp-service-account.guard';
import { BASE_CONFIG, BaseConfigEntity } from '../config/base-config.entity';

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
      provide: ORG_ROLES_GUARD,
      useClass: OrgRolesGuard,
    },
    {
      provide: ORG_TYPES_GUARD,
      useClass: OrgTypesGuard,
    },
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
      useFactory: (orgRolesGuard: OrgRolesGuard) => {
        return orgRolesGuard;
      },
      inject: [ORG_ROLES_GUARD],
    },
    {
      provide: APP_GUARD,
      useFactory: (orgTypesGuard: OrgTypesGuard) => {
        return orgTypesGuard;
      },
      inject: [ORG_TYPES_GUARD],
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
  exports: [],
})
export class AuthModule {}
