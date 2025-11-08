import { Base } from '../../base';
import { BaseConfigEntity } from '../../config/base-config.entity';
import { MongoDbOrganizationModel } from '../../sync-organizations/mongodb-organization-model';
import { OrganizationsRepositoryPort } from '../../sync-organizations/ports/organizations-repository.port';
import { OrganizationSubscriptionStatus, OrganizationSubtype } from '../../sync-organizations/sync-organizations.constants';
import { LoggerService } from '@nestjs/common';
import { Model } from 'mongoose';
import { ClsService } from 'nestjs-cls';
export declare class MongoDbOrganizationsRepositoryAdapter extends Base implements OrganizationsRepositoryPort {
    protected readonly baseConfig: BaseConfigEntity;
    protected readonly logger: LoggerService;
    protected readonly cls: ClsService;
    readonly model: Model<MongoDbOrganizationModel>;
    constructor(baseConfig: BaseConfigEntity, logger: LoggerService, cls: ClsService, model: Model<MongoDbOrganizationModel>);
    createOrUpdate({ organizationId, organizationName, organizationCreatedAt, organizationSubscriptionStatus, organizationSubtype, bpoOfficeOrganizationId, bpoOfficeName, }: {
        organizationId: string;
        organizationName: string;
        organizationCreatedAt: Date;
        organizationSubscriptionStatus: OrganizationSubscriptionStatus;
        organizationSubtype: OrganizationSubtype;
        bpoOfficeOrganizationId: string | null;
        bpoOfficeName: string | null;
    }): Promise<void>;
}
