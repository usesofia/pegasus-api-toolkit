import { Connection } from 'mongoose';
import { PRIMARY_MONGOOSE_CONNECTION } from '../database/primary-mongodb-database.module';
import { MongoDbPubSubEventModelSchema } from './mongodb-pub-sub-event.model';
import { Module } from '@nestjs/common';

export const PUB_SUB_EVENT_MODEL = Symbol('PubSubEventModel');
export const PUB_SUB_CONNECTION_MODEL_NAME = 'PubSubEvents';

@Module({
  providers: [
    {
      provide: PUB_SUB_EVENT_MODEL,
      useFactory: (connection: Connection) => {
        return connection.model(
          PUB_SUB_CONNECTION_MODEL_NAME,
          MongoDbPubSubEventModelSchema,
        );
      },
      inject: [PRIMARY_MONGOOSE_CONNECTION],
    },
  ],
  exports: [PUB_SUB_EVENT_MODEL],
})
export class MongoDbPubSubEventModule {}
