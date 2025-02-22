import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { AuthServicePort } from '../ports/auth-service.port';
import { AuthUserEntity } from '../entities/auth-user.entity';
import { BaseConfigEntity, BASE_CONFIG } from '../../config/base-config.entity';
import { OrganizationRole } from '../constants/organization-role.enum';
import { OrganizationType } from '../constants/organization-type.enum';
import {
  CACHE_SERVICE_PORT,
  CacheServicePort,
} from '../../cache/ports/cache-service.port';
import { Duration } from 'luxon';
import { Base } from '../../base';
import { ClsService } from 'nestjs-cls';
import { LOGGER_SERVICE_PORT } from '../../logger/logger.module';
import { ClerkClient } from '@usesofia/clerk-backend';
import { Organization, User } from '@clerk/backend';
import { Log } from '../../utils/log.utils';
import {
  CLERK_CLIENT,
  CLERK_VERIFY_TOKEN,
  ClerkVerifyToken,
} from '../constants/clerk.constants';

@Injectable()
export class ClerkAuthServiceAdapter extends Base implements AuthServicePort {
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
  ) {
    super(ClerkAuthServiceAdapter.name, baseConfig, logger, cls);
  }

  @Log()
  async verifyToken(token: string): Promise<AuthUserEntity> {
    const jwt = await this.clerkVerifyToken(token);

    const user = await this.getUser({
      userId: jwt.sub,
      organizationId: jwt.org_id,
      organizationRole: jwt.org_role,
    });

    return user;
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

    let parentOrganization: Organization | null = null;

    if (clerkOrganization) {
      if (clerkOrganization.publicMetadata!.parent) {
        parentOrganization = await this.getCachedClerkOrganization({
          organizationId: clerkOrganization.publicMetadata!.parent as string,
          ignoreCache,
        });
      }

      let childrenOrganizations: Organization[] | null = null;

      if (clerkOrganization.publicMetadata!.children) {
        childrenOrganizations = await Promise.all(
          (clerkOrganization.publicMetadata!.children as string[]).map(
            (child) =>
              this.getCachedClerkOrganization({
                organizationId: child,
                ignoreCache,
              }),
          ),
        );
      }

      return AuthUserEntity.build({
        id: clerkUser.id,
        primaryEmail: clerkUser.emailAddresses[0].emailAddress,
        primaryPhoneNumber: clerkUser.phoneNumbers[0].phoneNumber,
        firstName: clerkUser.firstName!,
        lastName: clerkUser.lastName!,
        organization: {
          id: clerkOrganization.id,
          name: clerkOrganization.name,
          role: organizationRole as OrganizationRole,
          type: clerkOrganization.publicMetadata!.type as OrganizationType,
          parent: parentOrganization
            ? {
                id: parentOrganization.id,
                name: parentOrganization.name,
                sharedContacts: parentOrganization.publicMetadata!
                  .sharedContacts as boolean,
                sharedSubcategories: parentOrganization.publicMetadata!
                  .sharedSubcategories as boolean,
                sharedTags: parentOrganization.publicMetadata!
                  .sharedTags as boolean,
              }
            : null,
          children: childrenOrganizations
            ? childrenOrganizations.map((child) => ({
                id: child.id,
                name: child.name,
              }))
            : null,
        },
      });
    } else {
      return AuthUserEntity.build({
        id: clerkUser.id,
        primaryEmail: clerkUser.emailAddresses[0].emailAddress,
        primaryPhoneNumber: clerkUser.phoneNumbers[0].phoneNumber,
        firstName: clerkUser.firstName!,
        lastName: clerkUser.lastName!,
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
}
