import { LoggerService } from '@nestjs/common';
import { Base } from '../base';
import { ClsService } from 'nestjs-cls';
import { AuthServicePort } from './ports/auth-service.port';
import { PubSubMessageBodyDto } from '../pub-sub/pub-sub-message.dto';
import { BaseConfigEntity } from '../config/base-config.entity';
export declare class AuthController extends Base {
    protected readonly baseConfig: BaseConfigEntity;
    protected readonly logger: LoggerService;
    protected readonly cls: ClsService;
    private readonly authService;
    constructor(baseConfig: BaseConfigEntity, logger: LoggerService, cls: ClsService, authService: AuthServicePort);
    refreshAuthUserOnCache(body: PubSubMessageBodyDto): Promise<void>;
}
