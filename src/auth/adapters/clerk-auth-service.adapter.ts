import { Inject, Injectable } from '@nestjs/common';
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

@Injectable()
export class ClerkAuthServiceAdapter implements AuthServicePort {
  constructor(
    @Inject(BASE_CONFIG)
    private readonly baseConfig: BaseConfigEntity,
    @Inject(CACHE_SERVICE_PORT)
    private readonly cacheService: CacheServicePort,
    @Inject(PUB_SUB_SERVICE_PORT)
    private readonly pubSubService: PubSubServicePort,
  ) {}

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

    return AuthUserEntity.build({
      id: clerkUser.id,
      primaryEmail: clerkUser.emailAddresses[0].emailAddress,
      primaryPhoneNumber: clerkUser.phoneNumbers[0].phoneNumber,
      firstName: clerkUser.firstName!,
      lastName: clerkUser.lastName!,
      organization: clerkOrganization.id,
      organizationRole: organizationRole as OrganizationRole,
      organitzaionType: clerkOrganization.privateMetadata
        .type as OrganizationType,
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
      this.pubSubService.unsafePublish(
        this.baseConfig.pubSub.topics.cacheHitOnGetAuthUser,
        CacheHitOnGetAuthUserPayload.build({
          userId,
          organizationId,
          organizationRole,
        }),
      );
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
        days: 7,
      }).as('seconds'),
    );

    return {
      clerkUser,
      clerkOrganization,
    };
  }
}
