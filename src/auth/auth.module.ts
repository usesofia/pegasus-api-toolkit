import { Global, Module } from '@nestjs/common';
import { ClerkAuthServiceAdapter } from './adapters/clerk-auth-service.adapter';
import { AUTH_SERVICE_PORT } from './ports/auth-service.port';
import { AUTH_GUARD, AuthGuard } from './guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import {
  GCP_SERVICE_ACCOUNT_GUARD,
  GcpServiceAccountGuard,
} from './guards/gcp-service-account.guard';
import { BASE_CONFIG, BaseConfigEntity } from '../config/base-config.entity';
import {
  ORGANIZATION_ROLES_GUARD,
  OrganizationRolesGuard,
} from './guards/organization-roles.guard';
import {
  ORGANIZATION_TYPES_GUARD,
  OrganizationTypesGuard,
} from './guards/organization-types.guard';
import { createClerkClient, verifyToken } from '@usesofia/clerk-backend';
import { CLERK_CLIENT, CLERK_VERIFY_TOKEN } from './constants/clerk.constants';
import { ClerkLoggerServiceAdapter } from './adapters/clerk-logger-service.adapter';

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
    ClerkLoggerServiceAdapter,
    {
      provide: CLERK_CLIENT,
      useFactory: (baseConfig: BaseConfigEntity, clerkLoggerServiceAdapter: ClerkLoggerServiceAdapter) => {
        return createClerkClient({
          secretKey: baseConfig.clerk.secretKey,
        }, clerkLoggerServiceAdapter);
      },
      inject: [BASE_CONFIG, ClerkLoggerServiceAdapter],
    },
    {
      provide: CLERK_VERIFY_TOKEN,
      useFactory: () => verifyToken,
    },
  ],
  controllers: [],
  exports: [
    AUTH_SERVICE_PORT,
  ],
})
export class AuthModule {}
