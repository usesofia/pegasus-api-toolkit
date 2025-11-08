import { Base } from "@app/base";
import { BaseConfigEntity } from "@app/config/base-config.entity";
import { OrganizationsRepositoryPort } from "@app/sync-organizations/ports/organizations-repository.port";
import { SyncOrganizationsServicePort } from "@app/sync-organizations/ports/sync-organizations-service.port";
import { LoggerService } from "@nestjs/common";
import { ClerkClient } from "@usesofia/clerk-backend";
import { ClsService } from "nestjs-cls";
export declare class ClerkSyncOrganizationsServiceAdapter extends Base implements SyncOrganizationsServicePort {
    protected readonly baseConfig: BaseConfigEntity;
    protected readonly logger: LoggerService;
    protected readonly cls: ClsService;
    protected readonly organizationsRepository: OrganizationsRepositoryPort;
    protected readonly clerkClient: ClerkClient;
    constructor(baseConfig: BaseConfigEntity, logger: LoggerService, cls: ClsService, organizationsRepository: OrganizationsRepositoryPort, clerkClient: ClerkClient);
    sync(): Promise<void>;
}
