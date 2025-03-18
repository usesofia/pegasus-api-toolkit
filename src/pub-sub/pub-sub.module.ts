import { Global, Inject, LoggerService, Module, OnApplicationShutdown } from '@nestjs/common';
import { PUB_SUB_SERVICE_PORT, PubSubServicePort } from '@app/pub-sub/pub-sub-service.port';
import { GcpPubSubServiceAdapter } from '@app/pub-sub/gcp-pub-sub-service.adapter';
import { GCP_PUB_SUB, GcpPubSubModule } from '@app/pub-sub/gcp-pub-sub.module';
import { MongoDbPubSubServiceAdapter } from '@app/pub-sub/mongodb-pub-sub-service.adapter';
import {
  isIntegrationTestEnvironment,
  isLocalEnvironment,
} from '@app/utils/environment.utils';
import { MongoDbPubSubEventModule, PUB_SUB_EVENT_MODEL } from '@app/pub-sub/mongodb-pub-sub-event.module';
import { LOGGER_SERVICE_PORT } from '@app/logger/logger.module';
import { BASE_CONFIG, BaseConfigEntity } from '@app/config/base-config.entity';
import { ClsService } from 'nestjs-cls';
import { MongoDbPubSubEventModel } from '@app/pub-sub/mongodb-pub-sub-event.model';
import { Model } from 'mongoose';
import { PubSub } from '@google-cloud/pubsub';

@Global()
@Module({
  imports: [GcpPubSubModule, MongoDbPubSubEventModule],
  providers: [
    {
      provide: PUB_SUB_SERVICE_PORT,
      useFactory: (
        baseConfig: BaseConfigEntity,
        logger: LoggerService,
        cls: ClsService,
        pubSubEventModel: Model<MongoDbPubSubEventModel>,
        pubSub: PubSub,
      ) => {
        if (isLocalEnvironment() || isIntegrationTestEnvironment()) {
          return new MongoDbPubSubServiceAdapter(
            baseConfig,
            logger,
            cls,
            pubSubEventModel,
          );
        }
        return new GcpPubSubServiceAdapter(
          baseConfig,
          logger,
          cls,
          pubSub,
        );
      },
      inject: [
        BASE_CONFIG,
        LOGGER_SERVICE_PORT,
        ClsService,
        PUB_SUB_EVENT_MODEL,
        GCP_PUB_SUB,
      ],
    },
  ],
  exports: [PUB_SUB_SERVICE_PORT],
})
export class PubSubModule implements OnApplicationShutdown {
  constructor(
    @Inject(PUB_SUB_SERVICE_PORT)
    private readonly pubSubService: PubSubServicePort,
  ) {}

  async onApplicationShutdown() {
    await this.pubSubService.stopAutoFlushPublishBuffer();
  }
}
