import { Module } from '@nestjs/common';
import { EMAIL_SERVICE_PORT } from '@app/email/email-service.port';
import { SendgridEmailServiceAdapter } from '@app/email/adapters/sendgrid-email-service.adapter';
import sgMail from '@sendgrid/mail';
import { BASE_CONFIG, BaseConfigEntity } from '@app/config/base-config.entity';
import { SENDGRID_CLIENT } from '@app/email/email.constants';
import { isIntegrationTestEnvironment } from '@app/utils/environment.utils';
import { MockEmailServiceAdapter } from '@app/email/adapters/mock-email-service.adapter';

@Module({
  providers: [
    {
      provide: SENDGRID_CLIENT,
      useFactory: (baseConfig: BaseConfigEntity) => {
        if (!baseConfig.email) {
          throw new Error('Email configuration is not set.');
        }
        sgMail.setApiKey(baseConfig.email.sendgrid.apiKey);
        return sgMail;
      },
      inject: [BASE_CONFIG],
    },
    {
      provide: EMAIL_SERVICE_PORT,
      useClass: isIntegrationTestEnvironment() && process.env.USE_SENDGRID !== 'true' ? MockEmailServiceAdapter : SendgridEmailServiceAdapter,
    },
  ],
  exports: [EMAIL_SERVICE_PORT],
})
export class EmailModule {}
