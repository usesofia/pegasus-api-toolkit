import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export const PUB_SUB_EVENTS_COLLECTION_NAME = '_PubSubEvents';

@Schema({
  collection: PUB_SUB_EVENTS_COLLECTION_NAME,
  timestamps: true,
})
export class MongoDbPubSubEventModel {
  @Prop({ type: String })
  topic!: string;

  @Prop({ type: Object })
  payload!: Record<string, unknown>;
}

export const MongoDbPubSubEventModelSchema = SchemaFactory.createForClass(
  MongoDbPubSubEventModel,
);
