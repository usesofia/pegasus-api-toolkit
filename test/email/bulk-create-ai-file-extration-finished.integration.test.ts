import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { EmailModule } from '../../src/email/email.module';
import { EmailServicePort, EMAIL_SERVICE_PORT, EmailTemplate, EmailSchema } from '../../src/email/email-service.port';
import { buildClerkClientMock } from '../../src/utils/clerk.utils';
import z from 'zod';
import { BASE_CONFIG } from '@app/config/base-config.entity';
import { BaseConfigModule } from '@app/config/base-config.module';
import { LoggerModule } from '@app/logger/logger.module';
import { buildClsModule } from '@app/utils/test.utils';

describe('Email.send.bulk-create-ai-file-extration-finished', () => {
  let app: INestApplication;
  let emailService: EmailServicePort;
  const clerkMock = buildClerkClientMock();

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [EmailModule, BaseConfigModule, LoggerModule, buildClsModule()],
    })
      .overrideProvider(BASE_CONFIG)
      .useValue({
        env: 'integration-test',
        logger: {
          level: 'log',
          consoleLog: false,
          betterStackSourceToken: process.env.BETTER_STACK_SOURCE_TOKEN,
          betterStackEndpoint: 'https://s1353310.us-east-9.betterstackdata.com',
        },
        email: {
          sendgrid: {
            apiKey: process.env.SENDGRID_API_KEY,
          },
        },
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    emailService = app.get<EmailServicePort>(EMAIL_SERVICE_PORT);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should send a bulk create AI file extraction finished email', async () => {
    // Arrange
    const to = 'marco@usesofia.com';
    const email: z.input<typeof EmailSchema> = {
      template: EmailTemplate.BULK_CREATE_AI_FILE_EXTRACTION_FINISHED,
      data: {
        name: 'Marco',
        fileName: 'financials.csv',
        nFinancialRecords: 42,
        continueUrl: 'https://example.com/continue',
      },
    };

    // Act
    await emailService.send({
      to,
      from: 'notificacoes@usesofia.com',
      email: EmailSchema.parse(email),
    });

    // Assert
    // Check the email...
  });
});
