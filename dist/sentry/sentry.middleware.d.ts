import { LoggerService, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Base } from '../base';
import { BaseConfigEntity } from '../config/base-config.entity';
import { ClsService } from 'nestjs-cls';
export declare class SentryMiddleware extends Base implements NestMiddleware {
    protected readonly baseConfig: BaseConfigEntity;
    protected readonly logger: LoggerService;
    protected readonly cls: ClsService;
    constructor(baseConfig: BaseConfigEntity, logger: LoggerService, cls: ClsService);
    use(req: Request, res: Response, next: NextFunction): void;
}
