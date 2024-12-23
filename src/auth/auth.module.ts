import { Global, Module } from '@nestjs/common';
import { ClerkAuthServiceAdapter } from './adapters/clerk-auth-service.adapter';
import { AUTH_SERVICE_PORT } from './ports/auth-service.port';
import { AuthGuard } from './guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { OrgRolesGuard } from './guards/org-roles.guard';
import { OrgTypesGuard } from './guards/org-types.guard';
import { GcpServiceAccountGuard } from './guards/gcp-service-account.guard';
import { BASE_CONFIG, BaseConfigEntity } from '../config/base-config.entity';

@Global()
@Module({
  imports: [],
  providers: [
    AuthGuard,
    {
      provide: AUTH_SERVICE_PORT,
      useClass: ClerkAuthServiceAdapter,
    },
    {
      provide: APP_GUARD,
      useFactory: (baseConfig: BaseConfigEntity) => {
        if (baseConfig.auth.applyAuthGuardToAllRoutes) {
          return AuthGuard;
        }
        return null;
      },
      inject: [BASE_CONFIG],
    },
    {
      provide: APP_GUARD,
      useFactory: () => {
        return OrgRolesGuard;
      },
    },
    {
      provide: APP_GUARD,
      useFactory: () => {
        return OrgTypesGuard;
      },
    },
    {
      provide: APP_GUARD,
      useFactory: (baseConfig: BaseConfigEntity) => {
        if (baseConfig.auth.applyGcpServiceAccountGuardToAllRoutes) {
          return GcpServiceAccountGuard;
        }
        return null;
      },
      inject: [BASE_CONFIG],
    },
  ],
  controllers: [],
  exports: [],
})
export class AuthModule {}
