import { Base } from "../../base";
import { BaseConfigEntity } from "../../config/base-config.entity";
import { MongoDbOrganizationModel } from "../../sync-organizations/mongodb-organization-model";
import { OrganizationsRepositoryPort } from "../../sync-organizations/ports/organizations-repository.port";
import { LoggerService } from "@nestjs/common";
import { Model } from "mongoose";
import { ClsService } from "nestjs-cls";
export declare class MongoDbOrganizationsRepositoryAdapter extends Base implements OrganizationsRepositoryPort {
    protected readonly baseConfig: BaseConfigEntity;
    protected readonly logger: LoggerService;
    protected readonly cls: ClsService;
    readonly model: Model<MongoDbOrganizationModel>;
    constructor(baseConfig: BaseConfigEntity, logger: LoggerService, cls: ClsService, model: Model<MongoDbOrganizationModel>);
    createOrUpdate({ organizationId, organizationName }: {
        organizationId: string;
        organizationName: string;
    }): Promise<void>;
}
