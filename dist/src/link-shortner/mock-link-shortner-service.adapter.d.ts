import { LoggerService } from '@nestjs/common';
import { LinkShortnerServicePort } from '../link-shortner/link-shortner-service.port';
import { Base } from '../base';
import { BaseConfigEntity } from '../config/base-config.entity';
import { ClsService } from 'nestjs-cls';
export declare class MockLinkShortnerServiceAdapter extends Base implements LinkShortnerServicePort {
    protected readonly baseConfig: BaseConfigEntity;
    protected readonly logger: LoggerService;
    protected readonly cls: ClsService;
    constructor(baseConfig: BaseConfigEntity, logger: LoggerService, cls: ClsService);
    createShortLink(url: string): Promise<string>;
}
