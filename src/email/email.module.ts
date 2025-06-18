import { Module } from '@nestjs/common';
import { EMAIL_SERVICE_PORT } from '@app/email/email-service.port';
import { SendgridEmailServiceAdapter } from '@app/email/adapters/sendgrid-email-service.adapter';
import * as sgMail from '@sendgrid/mail';
import { BASE_CONFIG, BaseConfigEntity } from '@app/config/base-config.entity';

export const SENDGRID_CLIENT = Symbol('SendgridClient');

@Module({
  providers: [
    {
      provide: EMAIL_SERVICE_PORT,
      useClass: SendgridEmailServiceAdapter,
    },
    {
      provide: SENDGRID_CLIENT,
      useFactory: (baseConfig: BaseConfigEntity) => {
        sgMail.setApiKey(baseConfig.email.sendgrid.apiKey);
        return sgMail;
      },
      inject: [BASE_CONFIG],
    },
  ],
  exports: [EMAIL_SERVICE_PORT],
})
export class EmailModule {}