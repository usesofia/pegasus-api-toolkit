import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
  collection: 'PubSubEvents',
  timestamps: true,
})
export class MongoDbPubSubEventModel {
  @Prop({ type: String })
  topic!: string;

  @Prop({ type: Object })
  payload!: Record<string, any>;
}

export const MongoDbPubSubEventModelSchema = SchemaFactory.createForClass(MongoDbPubSubEventModel);
