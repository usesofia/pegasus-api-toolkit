import { LoggerService } from '@nestjs/common';
import { EmailSchema, EmailServicePort } from '@app/email/email-service.port';
import { BaseConfigEntity } from '@app/config/base-config.entity';
import { ClsService } from 'nestjs-cls';
import { Base } from '@app/base';
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
