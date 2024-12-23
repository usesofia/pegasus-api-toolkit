import { LoggerService } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { AuthServicePort } from './ports/auth-service.port';
import { PubSubMessageBodyDto } from '../pub-sub/pub-sub-message.dto';
import { BaseConfigEntity } from '../config/base-config.entity';
import { Base } from '../base';
export declare class AuthController extends Base {
    protected readonly baseConfig: BaseConfigEntity;
    protected readonly logger: LoggerService;
    protected readonly cls: ClsService;
    private readonly authService;
    constructor(baseConfig: BaseConfigEntity, logger: LoggerService, cls: ClsService, authService: AuthServicePort);
    refreshAuthUserOnCache(body: PubSubMessageBodyDto): Promise<void>;
}
