import { LoggerService } from '@nestjs/common';
import { EmailSchema, EmailServicePort } from '../../email/email-service.port';
import { BaseConfigEntity } from '../../config/base-config.entity';
import { ClsService } from 'nestjs-cls';
import { Base } from '../../base';
import sgMail from '@sendgrid/mail';
import z from 'zod';
export declare class SendgridEmailServiceAdapter extends Base implements EmailServicePort {
    protected readonly baseConfig: BaseConfigEntity;
    protected readonly logger: LoggerService;
    protected readonly cls: ClsService;
    protected readonly sgMail: sgMail.MailService;
    constructor(baseConfig: BaseConfigEntity, logger: LoggerService, cls: ClsService, sgMail: sgMail.MailService);
    send({ email, to, from, }: {
        email: z.output<typeof EmailSchema>;
        to: string;
        from?: 'notificacoes@usesofia.com' | 'sofia@usesofia.com' | 'noreply@usesofia.com';
    }): Promise<void>;
}
