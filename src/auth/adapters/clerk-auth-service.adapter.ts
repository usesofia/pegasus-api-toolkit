import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { clerkClient, Organization, User, verifyToken } from '@clerk/express';
import { AuthServicePort } from '../ports/auth-service.port';
import { AuthUserEntity } from '../entities/auth-user.entity';
import { BaseConfigEntity, BASE_CONFIG } from '../../config/base-config.entity';
import { OrganizationRole } from '../constants/organization-role.enum';
import { OrganizationType } from '../constants/organization-type.enum';
import {
  PubSubServicePort,
  PUB_SUB_SERVICE_PORT,
} from '../../pub-sub/pub-sub-service.port';
import { CacheHitOnGetAuthUserPayload } from '../payloads/cache-hit-on-get-auth-user.payload';
import {
  CACHE_SERVICE_PORT,
  CacheServicePort,
} from '../../cache/ports/cache-service.port';
import { Duration } from 'luxon';
import * as retry from 'retry';
import { Base } from '../../base';
import { ClsService } from 'nestjs-cls';
import { LOGGER_SERVICE_PORT } from '../../logger/logger.module';

const retryOptions = {
  retries: 32,
  factor: 2,
  minTimeout: 1000,
  maxTimeout: 5000,
};

@Injectable()
export class ClerkAuthServiceAdapter extends Base implements AuthServicePort {
  constructor(
    @Inject(BASE_CONFIG)
    protected readonly baseConfig: BaseConfigEntity,
    @Inject(LOGGER_SERVICE_PORT) protected readonly logger: LoggerService,
    protected readonly cls: ClsService,
    @Inject(CACHE_SERVICE_PORT)
    private readonly cacheService: CacheServicePort,
    @Inject(PUB_SUB_SERVICE_PORT)
    private readonly pubSubService: PubSubServicePort,
  ) {
    super(ClerkAuthServiceAdapter.name, baseConfig, logger, cls);
  }

  async verifyToken(token: string): Promise<AuthUserEntity> {
    const jwt = await verifyToken(token, {
      jwtKey: this.baseConfig.clerk.jwtKey,
    });

    const user = await this.getUser({
      userId: jwt.sub,
      organizationId: jwt.org_id!,
      organizationRole: jwt.org_role!,
    });

    return user;
  }

  async getUser({
    userId,
    organizationId,
    organizationRole,
    ignoreCache,
  }: {
    userId: string;
    organizationId: string;
    organizationRole: string;
    ignoreCache?: boolean;
  }): Promise<AuthUserEntity> {
    const { clerkUser, clerkOrganization } =
      await this.getCachedClerkUserAndOrganization({
        userId,
        organizationId,
        organizationRole,
        ignoreCache,
      });

    let parentOrganization: Organization | null = null;

    if (clerkOrganization.publicMetadata!.parent) {
      parentOrganization = await this.getCachedClerkOrganization({
        organizationId: clerkOrganization.publicMetadata!.parent as string,
        ignoreCache,
      });
    }

    let childrenOrganizations: Organization[] | null = null;

    if (clerkOrganization.publicMetadata!.children) {
      childrenOrganizations = await Promise.all(
        (clerkOrganization.publicMetadata!.children as string[]).map((child) =>
          this.getCachedClerkOrganization({
            organizationId: child as string,
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
        type: clerkOrganization.publicMetadata!
          .type as OrganizationType,
        parent: parentOrganization
          ? {
              id: parentOrganization.id,
              name: parentOrganization.name,
              sharedContacts: parentOrganization.publicMetadata!.sharedContacts as boolean,
              sharedSubcategories: parentOrganization.publicMetadata!.sharedSubcategories as boolean,
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
  }

  private async getClerkUserAndOrganization({
    userId,
    organizationId,
  }: {
    userId: string;
    organizationId: string;
  }): Promise<{
    clerkUser: User;
    clerkOrganization: Organization;
  }> {
    const operation = retry.operation(retryOptions);

    return new Promise((resolve, reject) => {
      operation.attempt(async (currentAttempt) => {
        try {
          const result = await this._getClerkUserAndOrganization({
            userId,
            organizationId,
          });
          resolve(result);
        } catch (error) {
          if (operation.retry(error as Error)) {
            this.logWarn({
              functionName: this.getClerkUserAndOrganization.name,
              suffix: 'retry',
              data: {
                userId,
                organizationId,
                currentAttempt,
              },
            });
            return;
          }
          reject(operation.mainError());
        }
      });
    });
  }

  private async _getClerkUserAndOrganization({
    userId,
    organizationId,
  }: {
    userId: string;
    organizationId: string;
  }): Promise<{
    clerkUser: User;
    clerkOrganization: Organization;
  }> {
    const [clerkUser, clerkOrganization] = await Promise.all([
      clerkClient.users.getUser(userId),
      clerkClient.organizations.getOrganization({
        organizationId,
      }),
    ]);

    return {
      clerkUser,
      clerkOrganization,
    };
  }

  private async getClerkOrganization({
    organizationId,
  }: {
    organizationId: string;
  }): Promise<Organization> {
    const operation = retry.operation(retryOptions);

    return new Promise((resolve, reject) => {
      operation.attempt(async (currentAttempt) => {
        try {
          const clerkOrganization = await this._getClerkOrganization({
            organizationId,
          });
          resolve(clerkOrganization);
        } catch (error) {
          if (operation.retry(error as Error)) {
            this.logWarn({
              functionName: this.getClerkUserAndOrganization.name,
              suffix: 'retry',
              data: {
                organizationId,
                currentAttempt,
              },
            });
            return;
          }
          reject(operation.mainError());
        }
      });
    });
  }

  private async _getClerkOrganization({
    organizationId,
  }: {
    organizationId: string;
  }): Promise<Organization> {
    return await clerkClient.organizations.getOrganization({
      organizationId,
    });
  }

  private async getCachedClerkUserAndOrganization({
    userId,
    organizationId,
    organizationRole,
    ignoreCache = false,
  }: {
    userId: string;
    organizationId: string;
    organizationRole: string;
    ignoreCache?: boolean;
  }): Promise<{
    clerkUser: User;
    clerkOrganization: Organization;
  }> {
    const cacheKey = `${this.constructor.name}.getCachedClerkUserAndOrganization(${JSON.stringify(
      {
        userId,
        organizationId,
      },
    )})`;

    const cached = await this.cacheService.get(cacheKey);

    if (cached && !ignoreCache) {
      this.pubSubService.unsafePublish({
        topic: this.baseConfig.pubSub.topics.cacheHitOnGetAuthUser,
        payload: CacheHitOnGetAuthUserPayload.build({
          userId,
          organizationId,
          organizationRole,
        }),
      });
      return JSON.parse(cached);
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
      return JSON.parse(cached);
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
