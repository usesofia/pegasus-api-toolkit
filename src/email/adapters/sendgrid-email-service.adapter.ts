import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { EmailSchema, EmailServicePort } from '@app/email/email-service.port';
import { BaseConfigEntity, BASE_CONFIG } from '@app/config/base-config.entity';
import { LOGGER_SERVICE_PORT } from '@app/logger/logger.module';
import { ClsService } from 'nestjs-cls';
import { Base } from '@app/base';
import sgMail from '@sendgrid/mail';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as handlebars from 'handlebars';
import { Log } from '@app/utils/log.utils';
import z from 'zod';
import { SENDGRID_CLIENT } from '@app/email/email.constants';

@Injectable()
export class SendgridEmailServiceAdapter extends Base implements EmailServicePort {
  constructor(
    @Inject(BASE_CONFIG)
    protected readonly baseConfig: BaseConfigEntity,
    @Inject(LOGGER_SERVICE_PORT) protected readonly logger: LoggerService,
    protected readonly cls: ClsService,
    @Inject(SENDGRID_CLIENT)
    protected readonly sgMail: sgMail.MailService,
  ) {
    super(SendgridEmailServiceAdapter.name, baseConfig, logger, cls);
  }

  @Log()
  async send({
    email,
    to,
    from = 'notificacoes@usesofia.com',
  }: {
    email: z.output<typeof EmailSchema>,
    to: string;
    from?: 'notificacoes@usesofia.com' | 'sofia@usesofia.com' | 'noreply@usesofia.com';
  }): Promise<void> {
    const templatePath = path.join(
      __dirname,
      '..',
      'templates',
      `${email.template}.hbs`,
    );
    const templateSource = await fs.readFile(templatePath, 'utf-8');
    const compiledTemplate = handlebars.compile(templateSource);
    const html = compiledTemplate(email.data);


    const msg: sgMail.MailDataRequired = {
      to,
      from: {
        name: 'Sofia',
        email: from,
      },
      subject: email.getSubject(),
      html,
    };

    await this.sgMail.send(msg);
  }
}
