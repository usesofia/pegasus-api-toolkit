import { Base } from '@app/base';
import { BaseConfigEntity } from '@app/config/base-config.entity';
import { SyncOrganizationsServicePort } from '@app/sync-organizations/ports/sync-organizations-service.port';
import { LoggerService } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
export declare class SyncOrganizationsController extends Base {
    protected readonly baseConfig: BaseConfigEntity;
    protected readonly logger: LoggerService;
    protected readonly cls: ClsService;
    private readonly syncOrganizationsService;
    constructor(baseConfig: BaseConfigEntity, logger: LoggerService, cls: ClsService, syncOrganizationsService: SyncOrganizationsServicePort);
    syncOrganizations(): Promise<void>;
}
