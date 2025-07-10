import { Module } from '@nestjs/common';
import { LINK_SHORTNER_SERVICE_PORT } from '@app/link-shortner/link-shortner-service.port';
import { ShortioLinkShortnerServiceAdapter } from '@app/link-shortner/shortio-link-shortner-service.adapter';
import { isIntegrationTestEnvironment } from '@app/utils/environment.utils';
import { MockLinkShortnerServiceAdapter } from '@app/link-shortner/mock-link-shortner-service.adapter';

@Module({
  providers: [
    {
      provide: LINK_SHORTNER_SERVICE_PORT,
      useClass: isIntegrationTestEnvironment()
        ? MockLinkShortnerServiceAdapter
        : ShortioLinkShortnerServiceAdapter,
    },
  ],
  exports: [LINK_SHORTNER_SERVICE_PORT],
})
export class LinkShortnerModule {}
