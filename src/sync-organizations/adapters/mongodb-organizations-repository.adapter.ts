import { Base } from '@app/base';
import { BASE_CONFIG, BaseConfigEntity } from '@app/config/base-config.entity';
import { LOGGER_SERVICE_PORT } from '@app/logger/logger.module';
import { MongoDbOrganizationModel } from '@app/sync-organizations/mongodb-organization-model';
import { OrganizationsRepositoryPort } from '@app/sync-organizations/ports/organizations-repository.port';
import { ORGANIZATION_MODEL, OrganizationSubscriptionStatus, OrganizationSubtype } from '@app/sync-organizations/sync-organizations.constants';
import { Inject, LoggerService } from '@nestjs/common';
import { Model } from 'mongoose';
import { ClsService } from 'nestjs-cls';

export class MongoDbOrganizationsRepositoryAdapter
  extends Base
  implements OrganizationsRepositoryPort
{
  constructor(
    @Inject(BASE_CONFIG) protected readonly baseConfig: BaseConfigEntity,
    @Inject(LOGGER_SERVICE_PORT) protected readonly logger: LoggerService,
    protected readonly cls: ClsService,
    @Inject(ORGANIZATION_MODEL)
    public readonly model: Model<MongoDbOrganizationModel>,
  ) {
    super(MongoDbOrganizationsRepositoryAdapter.name, baseConfig, logger, cls);
  }

  async createOrUpdate({
    organizationId,
    organizationName,
    organizationCreatedAt,
    organizationSubscriptionStatus,
    organizationSubtype,
    bpoOfficeOrganizationId,
    bpoOfficeName,
  }: {
    organizationId: string;
    organizationName: string;
    organizationCreatedAt: Date;
    organizationSubscriptionStatus: OrganizationSubscriptionStatus;
    organizationSubtype: OrganizationSubtype;
    bpoOfficeOrganizationId: string | null;
    bpoOfficeName: string | null;
  }): Promise<void> {
    await this.model.updateOne(
      { organizationId },
      {
        organizationName,
        organizationCreatedAt,
        organizationSubscriptionStatus,
        organizationSubtype,
        bpoOfficeOrganizationId,
        bpoOfficeName,
      },
      { upsert: true },
    );
  }
}
