import { Base } from "@app/base";
import { CLERK_CLIENT } from "@app/clerk/clerk.constants";
import { BASE_CONFIG, BaseConfigEntity } from "@app/config/base-config.entity";
import { LOGGER_SERVICE_PORT } from "@app/logger/logger.module";
import { ORGANIZATIONS_REPOSITORY_PORT, OrganizationsRepositoryPort } from "@app/sync-organizations/ports/organizations-repository.port";
import { SyncOrganizationsServicePort } from "@app/sync-organizations/ports/sync-organizations-service.port";
import { Organization } from "@clerk/backend";
import { Inject, LoggerService } from "@nestjs/common";
import { ClerkClient } from "@usesofia/clerk-backend";
import { ClsService } from "nestjs-cls";

export class ClerkSyncOrganizationsServiceAdapter extends Base implements SyncOrganizationsServicePort {
  constructor(
    @Inject(BASE_CONFIG) protected readonly baseConfig: BaseConfigEntity,
    @Inject(LOGGER_SERVICE_PORT) protected readonly logger: LoggerService,
    protected readonly cls: ClsService,
    @Inject(ORGANIZATIONS_REPOSITORY_PORT) protected readonly organizationsRepository: OrganizationsRepositoryPort,
    @Inject(CLERK_CLIENT) protected readonly clerkClient: ClerkClient,
  ) {
    super(ClerkSyncOrganizationsServiceAdapter.name, baseConfig, logger, cls);
  }

  async sync(): Promise<void> {
    const limit = 100;
    let offset = 0;
    let hasMore = true;
    const allOrganizations: Organization[] = [];

    while (hasMore) {
      const organizationsPage = await this.clerkClient.organizations.getOrganizationList({
        limit,
        offset,
      });

      for (const organization of organizationsPage.data) {
        allOrganizations.push(organization);
      }

      offset += limit;
      hasMore = organizationsPage.data.length === limit;
    }

    this.log({
      functionName: this.sync.name,
      suffix: 'syncingOrganizations',
      data: { totalOrganizations: allOrganizations.length },
    })

    for (const organization of allOrganizations) {
      try {
        await this.organizationsRepository.createOrUpdate({
          organizationId: organization.id,
          organizationName: organization.name,
        });
      } catch (error) {
        this.logWarn({
          functionName: this.sync.name,
          suffix: 'failedToSyncOrganization',
          data: { organizationId: organization.id, organizationName: organization.name, error },
        });
      }
    }
  }
}
