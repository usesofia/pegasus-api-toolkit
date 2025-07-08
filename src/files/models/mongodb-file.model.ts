/* istanbul ignore file */
import { FileStatus, FileType } from '@app/files/entities/file.entity';
import { FILES_COLLECTION_NAME } from '@app/files/files.constants';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: FILES_COLLECTION_NAME, timestamps: true })
export class MongoDbFileModel extends Document {
  @Prop({ type: String, required: true })
  ownerOrganization!: string;

  @Prop({ type: String, required: true })
  originalFileName!: string;

  @Prop({ type: String, required: true })
  mimeType!: string;

  @Prop({ type: Number, required: true })
  size!: number;

  @Prop({ type: String, enum: Object.values(FileType), required: true })
  fileType!: FileType;

  @Prop({ type: String, required: true, unique: true })
  objectName!: string;

  @Prop({ type: String, enum: Object.values(FileStatus), required: true })
  status!: FileStatus;

  @Prop({ type: String, required: false, default: null })
  caption!: string | null;

  @Prop({ type: Date, required: false })
  createdAt!: Date;

  @Prop({ type: Date, required: false })
  updatedAt!: Date;

  @Prop({ type: Date, nullable: true, default: null, required: false })
  deletedAt!: Date | null;
}

export const MongoDbFileModelSchema = SchemaFactory.createForClass(MongoDbFileModel);

// Indexes
MongoDbFileModelSchema.index({ ownerOrganization: 1 });
MongoDbFileModelSchema.index({ status: 1 });
MongoDbFileModelSchema.index({ deletedAt: 1 });
