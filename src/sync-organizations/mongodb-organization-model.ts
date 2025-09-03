/* istanbul ignore file */
import { ORGANIZATION_COLLECTION_NAME } from '@app/sync-organizations/sync-organizations.constants';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: ORGANIZATION_COLLECTION_NAME,
  timestamps: true,
})
export class MongoDbOrganizationModel extends Document {
  @Prop({ type: String, required: true })
  organizationId!: string;

  @Prop({ type: String, required: true })
  organizationName!: string;

  @Prop({ type: Date, required: false })
  createdAt!: Date;

  @Prop({ type: Date, required: false })
  updatedAt!: Date;

  @Prop({ type: Date, nullable: true, default: null, required: false })
  deletedAt!: Date | null;
}

export const MongoDbOrganizationModelSchema = SchemaFactory.createForClass(MongoDbOrganizationModel);

// Simple indexes
MongoDbOrganizationModelSchema.index({ organizationId: 1 });
MongoDbOrganizationModelSchema.index({ createdAt: -1 });
