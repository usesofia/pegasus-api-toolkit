import { LoggerService } from '@nestjs/common';
import { EmailSchema, EmailServicePort } from '../../email/email-service.port';
import { BaseConfigEntity } from '../../config/base-config.entity';
import { ClsService } from 'nestjs-cls';
import { Base } from '../../base';
import z from 'zod';
export declare class MockEmailServiceAdapter extends Base implements EmailServicePort {
    protected readonly baseConfig: BaseConfigEntity;
    protected readonly logger: LoggerService;
    protected readonly cls: ClsService;
    constructor(baseConfig: BaseConfigEntity, logger: LoggerService, cls: ClsService);
    send({ email, to, }: {
        email: z.output<typeof EmailSchema>;
        to: string;
    }): Promise<void>;
}
