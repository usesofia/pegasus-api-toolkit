import { Global, Module, OnApplicationShutdown } from '@nestjs/common';
import { PUB_SUB_SERVICE_PORT } from './pub-sub-service.port';
import { GcpPubSubServiceAdapter } from './gcp-pub-sub-service.adapter';
import { GcpPubSubModule } from './gcp-pub-sub.module';
import { MongoDbPubSubServiceAdapter } from './mongodb-pub-sub-service.adapter';
import { isIntegrationTestEnvironment, isLocalEnvironment } from '../utils/environment.utils';
import { MongoDbPubSubEventModule } from './mongodb-pub-sub-event.module';

@Global()
@Module({
  imports: [GcpPubSubModule, MongoDbPubSubEventModule],
  providers: [
    GcpPubSubServiceAdapter,
    MongoDbPubSubServiceAdapter,
    {
      provide: PUB_SUB_SERVICE_PORT,
      useFactory: (gcpPubSubServiceAdapter: GcpPubSubServiceAdapter, mongoDbPubSubServiceAdapter: MongoDbPubSubServiceAdapter) => {
        if (isLocalEnvironment() || isIntegrationTestEnvironment()) {
          return mongoDbPubSubServiceAdapter;
        }
        return gcpPubSubServiceAdapter;
      },
      inject: [GcpPubSubServiceAdapter, MongoDbPubSubServiceAdapter],
    },
  ],
  exports: [PUB_SUB_SERVICE_PORT],
})
export class PubSubModule implements OnApplicationShutdown {
  constructor(
    private readonly gcpPubSubServiceAdapter: GcpPubSubServiceAdapter,
    private readonly mongoDbPubSubServiceAdapter: MongoDbPubSubServiceAdapter,
  ) {}

  async onApplicationShutdown() {
    await this.gcpPubSubServiceAdapter.stopAutoFlushPublishBuffer();
    await this.mongoDbPubSubServiceAdapter.stopAutoFlushPublishBuffer();
  }
}
