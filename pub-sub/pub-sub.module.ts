import { Global, Module } from '@nestjs/common';
import { PUB_SUB_SERVICE_PORT } from './pub-sub-service.port';
import { GcpPubSubServiceAdapter } from './gcp-pub-sub-service.adapter';
import { GcpPubSubModule } from './gcp-pub-sub.module';

@Global()
@Module({
  imports: [GcpPubSubModule],
  providers: [
    { provide: PUB_SUB_SERVICE_PORT, useClass: GcpPubSubServiceAdapter },
  ],
  exports: [PUB_SUB_SERVICE_PORT],
})
export class PubSubModule {}
