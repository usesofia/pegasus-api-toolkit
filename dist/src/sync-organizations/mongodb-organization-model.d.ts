import { Document } from 'mongoose';
export declare class MongoDbOrganizationModel extends Document {
    organizationId: string;
    organizationName: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
export declare const MongoDbOrganizationModelSchema: import("mongoose").Schema<MongoDbOrganizationModel, import("mongoose").Model<MongoDbOrganizationModel, any, any, any, Document<unknown, any, MongoDbOrganizationModel, any> & MongoDbOrganizationModel & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, MongoDbOrganizationModel, Document<unknown, {}, import("mongoose").FlatRecord<MongoDbOrganizationModel>, {}> & import("mongoose").FlatRecord<MongoDbOrganizationModel> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
