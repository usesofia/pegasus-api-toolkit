import { FileStatus, FileType } from '@app/files/entities/file.entity';
import { Document } from 'mongoose';
export declare class MongoDbFileModel extends Document {
    ownerOrganization: string;
    originalFileName: string;
    mimeType: string;
    size: number;
    fileType: FileType;
    objectName: string;
    status: FileStatus;
    caption: string | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
export declare const MongoDbFileModelSchema: import("mongoose").Schema<MongoDbFileModel, import("mongoose").Model<MongoDbFileModel, any, any, any, Document<unknown, any, MongoDbFileModel, any> & MongoDbFileModel & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, MongoDbFileModel, Document<unknown, {}, import("mongoose").FlatRecord<MongoDbFileModel>, {}> & import("mongoose").FlatRecord<MongoDbFileModel> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
