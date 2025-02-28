import { Module } from '@nestjs/common';
import { PubSub } from '@google-cloud/pubsub';
import { BASE_CONFIG, BaseConfigEntity } from '@app/config/base-config.entity';

export const GCP_PUB_SUB = Symbol('GcpPubSub');

@Module({
  providers: [
    {
      provide: GCP_PUB_SUB,
      useFactory: (config: BaseConfigEntity) => {
        return new PubSub({
          credentials: config.gcp.credentials,
          projectId: config.gcp.credentials.project_id,
        });
      },
      inject: [BASE_CONFIG],
    },
  ],
  exports: [GCP_PUB_SUB],
})
export class GcpPubSubModule {}
