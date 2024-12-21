import { Inject, Injectable } from '@nestjs/common';
import {
  clerkClient,
  Organization,
  User,
  verifyToken,
} from '@clerk/clerk-sdk-node';
import { AuthServicePort } from '../ports/auth-service.port';
import { AuthUserEntity } from '../entities/auth-user.entity';
import { BaseConfigEntity, BASE_CONFIG } from '../../config/base-config.entity';
import { OrgRole } from '../constants/org-role.enum';
import { OrgType } from '../constants/org-type.enum';
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
      orgId: jwt.org_id!,
      orgRole: jwt.org_role!,
    });

    return user;
  }

  async getUser({
    userId,
    orgId,
    orgRole,
    ignoreCache,
  }: {
    userId: string;
    orgId: string;
    orgRole: string;
    ignoreCache?: boolean;
  }): Promise<AuthUserEntity> {
    const { clerkUser, clerkOrganization } =
      await this.getCachedClerkUserAndOrganization({
        userId,
        orgId,
        orgRole,
        ignoreCache,
      });

    return AuthUserEntity.build({
      id: clerkUser.id,
      primaryEmail: clerkUser.emailAddresses[0].emailAddress,
      primaryPhoneNumber: clerkUser.phoneNumbers[0].phoneNumber,
      firstName: clerkUser.firstName!,
      lastName: clerkUser.lastName!,
      org: clerkOrganization.id,
      orgRole: orgRole as OrgRole,
      orgType: clerkOrganization.privateMetadata.type as OrgType,
    });
  }

  private async getClerkUserAndOrganization({
    userId,
    orgId,
  }: {
    userId: string;
    orgId: string;
  }): Promise<{
    clerkUser: User;
    clerkOrganization: Organization;
  }> {
    const [clerkUser, clerkOrganization] = await Promise.all([
      clerkClient.users.getUser(userId),
      clerkClient.organizations.getOrganization({
        organizationId: orgId,
      }),
    ]);

    return {
      clerkUser,
      clerkOrganization,
    };
  }

  private async getCachedClerkUserAndOrganization({
    userId,
    orgId,
    orgRole,
    ignoreCache = false,
  }: {
    userId: string;
    orgId: string;
    orgRole: string;
    ignoreCache?: boolean;
  }): Promise<{
    clerkUser: User;
    clerkOrganization: Organization;
  }> {
    const cacheKey = `${this.constructor.name}.getCachedClerkUserAndOrganization(${JSON.stringify(
      {
        userId,
        orgId,
      },
    )})`;

    const cached = await this.cacheService.get(cacheKey);

    if (cached && !ignoreCache) {
      this.pubSubService.unsafePublish(
        this.baseConfig.pubSub.topics.cacheHitOnGetAuthUser,
        CacheHitOnGetAuthUserPayload.build({
          userId,
          orgId,
          orgRole,
        }),
      );
      return JSON.parse(cached);
    }

    const { clerkUser, clerkOrganization } =
      await this.getClerkUserAndOrganization({
        userId,
        orgId,
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
