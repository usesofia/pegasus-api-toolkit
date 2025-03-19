import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { AuthServicePort } from '@app/auth/ports/auth-service.port';
import { AuthUserEntity, OrganizationEntity } from '@app/auth/entities/auth-user.entity';
import { BaseConfigEntity, BASE_CONFIG } from '@app/config/base-config.entity';
import { OrganizationRole } from '@app/auth/constants/organization-role.enum';
import { OrganizationType } from '@app/auth/constants/organization-type.enum';
import {
  CACHE_SERVICE_PORT,
  CacheServicePort,
} from '@app/cache/ports/cache-service.port';
import { Duration } from 'luxon';
import { Base } from '@app/base';
import { ClsService } from 'nestjs-cls';
import { LOGGER_SERVICE_PORT } from '@app/logger/logger.module';
import { ClerkClient } from '@usesofia/clerk-backend';
import { Organization, User } from '@clerk/backend';
import { Log } from '@app/utils/log.utils';
import {
  CLERK_CLIENT,
  CLERK_VERIFY_TOKEN,
  ClerkVerifyToken,
} from '@app/clerk/clerk.constants';
import { GoogleAuth } from 'google-auth-library';

@Injectable()
export class AuthServiceAdapter extends Base implements AuthServicePort {
  constructor(
    @Inject(BASE_CONFIG)
    protected readonly baseConfig: BaseConfigEntity,
    @Inject(LOGGER_SERVICE_PORT) protected readonly logger: LoggerService,
    protected readonly cls: ClsService,
    @Inject(CACHE_SERVICE_PORT)
    private readonly cacheService: CacheServicePort,
    @Inject(CLERK_CLIENT)
    private readonly clerkClient: ClerkClient,
    @Inject(CLERK_VERIFY_TOKEN)
    private readonly clerkVerifyToken: ClerkVerifyToken,
    private readonly googleAuth: GoogleAuth,
  ) {
    super(AuthServiceAdapter.name, baseConfig, logger, cls);
  }

  @Log()
  async verifyToken(token: string): Promise<AuthUserEntity> {
    const jwt = await this.clerkVerifyToken(token, {
      jwtKey: this.baseConfig.clerk.jwtKey,
    });

    const user = await this.getUser({
      userId: jwt.sub,
      organizationId: jwt.org_id,
      organizationRole: jwt.org_role,
    });

    return user;
  }

  @Log()
  async getOrganizationEntity({
      organizationId,
      organizationRole,
      ignoreCache = false,
  }: {
    organizationId: string;
    organizationRole: OrganizationRole;
    ignoreCache?: boolean;
  }): Promise<OrganizationEntity> {
    const clerkOrganization = await this.getCachedClerkOrganization({
      organizationId,
      ignoreCache,
    });

    let parentOrganization: Organization | null = null;

    if (clerkOrganization.publicMetadata?.parent) {
      parentOrganization = await this.getCachedClerkOrganization({
        organizationId: clerkOrganization.publicMetadata.parent as string,
        ignoreCache,
      });
    }

    let childrenOrganizations: Organization[] | null = null;

    if (clerkOrganization.publicMetadata?.children) {
      childrenOrganizations = await Promise.all(
        (clerkOrganization.publicMetadata.children as string[]).map((child) =>
          this.getCachedClerkOrganization({
            organizationId: child,
            ignoreCache,
          }),
        ),
      );
    }

    return OrganizationEntity.build({
      id: clerkOrganization.id,
      name: clerkOrganization.name,
      role: organizationRole,
      type: clerkOrganization.publicMetadata?.type as OrganizationType,
      parent: parentOrganization
        ? {
            id: parentOrganization.id,
            name: parentOrganization.name,
            sharedContacts: parentOrganization.publicMetadata
              ?.sharedContacts as boolean,
            sharedSubcategories: parentOrganization.publicMetadata
              ?.sharedSubcategories as boolean,
            sharedTags: parentOrganization.publicMetadata
              ?.sharedTags as boolean,
          }
        : null,
      children: childrenOrganizations
        ? childrenOrganizations.map((child) => ({
            id: child.id,
            name: child.name,
          }))
        : null,
    });
  }

  @Log()
  async getUser({
    userId,
    organizationId,
    organizationRole,
    ignoreCache,
  }: {
    userId: string;
    organizationId?: string;
    organizationRole?: string;
    ignoreCache?: boolean;
  }): Promise<AuthUserEntity> {
    const { clerkUser, clerkOrganization } =
      await this.getCachedClerkUserAndOrganization({
        userId,
        organizationId,
        ignoreCache,
      });

    if (clerkOrganization) {
      const organizationEntity = await this.getOrganizationEntity({
        organizationId: clerkOrganization.id,
        organizationRole: organizationRole as OrganizationRole,
        ignoreCache,
      });

      return AuthUserEntity.build({
        id: clerkUser.id,
        primaryEmail: clerkUser.emailAddresses[0].emailAddress,
        primaryPhoneNumber: clerkUser.phoneNumbers[0].phoneNumber,
        firstName: clerkUser.firstName ?? '',
        lastName: clerkUser.lastName ?? '',
        organization: organizationEntity,
      });
    } else {
      return AuthUserEntity.build({
        id: clerkUser.id,
        primaryEmail: clerkUser.emailAddresses[0].emailAddress,
        primaryPhoneNumber: clerkUser.phoneNumbers[0].phoneNumber,
        firstName: clerkUser.firstName ?? '',
        lastName: clerkUser.lastName ?? '',
        organization: null,
      });
    }
  }

  @Log()
  private async getClerkUserAndOrganization({
    userId,
    organizationId,
  }: {
    userId: string;
    organizationId?: string;
  }): Promise<{
    clerkUser: User;
    clerkOrganization?: Organization;
  }> {
    const [clerkUser, clerkOrganization] = await Promise.all([
      this.clerkClient.users.getUser(userId),
      organizationId
        ? this.clerkClient.organizations.getOrganization({
            organizationId,
          })
        : undefined,
    ]);

    return {
      clerkUser,
      clerkOrganization,
    };
  }

  @Log()
  private async getClerkOrganization({
    organizationId,
  }: {
    organizationId: string;
  }): Promise<Organization> {
    return await this.clerkClient.organizations.getOrganization({
      organizationId,
    });
  }

  @Log()
  private async getCachedClerkUserAndOrganization({
    userId,
    organizationId,
    ignoreCache = false,
  }: {
    userId: string;
    organizationId?: string;
    ignoreCache?: boolean;
  }): Promise<{
    clerkUser: User;
    clerkOrganization?: Organization;
  }> {
    const cacheKey = `${this.constructor.name}.getCachedClerkUserAndOrganization(${JSON.stringify(
      {
        userId,
        organizationId,
      },
    )})`;

    const cached = await this.cacheService.get(cacheKey);

    if (cached && !ignoreCache) {
      return JSON.parse(cached) as {
        clerkUser: User;
        clerkOrganization?: Organization;
      };
    }

    const { clerkUser, clerkOrganization } =
      await this.getClerkUserAndOrganization({
        userId,
        organizationId,
      });

    await this.cacheService.set(
      cacheKey,
      JSON.stringify({
        clerkUser,
        clerkOrganization,
      }),
      Duration.fromObject({
        hours: 1,
      }).as('seconds'),
    );

    return {
      clerkUser,
      clerkOrganization,
    };
  }

  @Log()
  private async getCachedClerkOrganization({
    organizationId,
    ignoreCache = false,
  }: {
    organizationId: string;
    ignoreCache?: boolean;
  }): Promise<Organization> {
    const cacheKey = `${this.constructor.name}.getCachedClerkOrganization(${JSON.stringify(
      {
        organizationId,
      },
    )})`;

    const cached = await this.cacheService.get(cacheKey);

    if (cached && !ignoreCache) {
      return JSON.parse(cached) as Organization;
    }

    const organization = await this.getClerkOrganization({
      organizationId,
    });

    await this.cacheService.set(
      cacheKey,
      JSON.stringify(organization),
      Duration.fromObject({
        hours: 1,
      }).as('seconds'),
    );

    return organization;
  }

  async generateGcpServiceAccountToken(): Promise<string> {
    const cacheKey = `${this.constructor.name}.generateGcpServiceAccountToken()`;

    const cached = await this.cacheService.get(cacheKey);

    if (cached) {
      return cached;
    }

    const client = await this.googleAuth.getIdTokenClient('*');
    const accessToken = await client.idTokenProvider.fetchIdToken('*');

    await this.cacheService.set(
      cacheKey,
      accessToken,
      Duration.fromObject({
        minutes: 10,
      }).as('seconds'),
    );

    return accessToken;
  }

  @Log()
  async getSystemUserForOrganization(organizationId: string): Promise<AuthUserEntity> {
    const organizationEntity = await this.getOrganizationEntity({
      organizationId,
      organizationRole: OrganizationRole.ADMIN,
      ignoreCache: false,
    });

    return AuthUserEntity.buildSystemUserForOrganization(organizationEntity);
  }
}
