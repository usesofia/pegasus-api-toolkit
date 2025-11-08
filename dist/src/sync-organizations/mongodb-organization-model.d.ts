import { OrganizationSubscriptionStatus, OrganizationSubtype } from '@app/sync-organizations/sync-organizations.constants';
import { Document } from 'mongoose';
export declare class MongoDbOrganizationModel extends Document {
    organizationId: string;
    organizationName: string;
    organizationCreatedAt: Date;
    organizationSubscriptionStatus: OrganizationSubscriptionStatus;
    organizationSubtype: OrganizationSubtype;
    bpoOfficeOrganizationId?: string | null;
    bpoOfficeName?: string | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
export declare const MongoDbOrganizationModelSchema: import("mongoose").Schema<MongoDbOrganizationModel, import("mongoose").Model<MongoDbOrganizationModel, any, any, any, Document<unknown, any, MongoDbOrganizationModel, any, {}> & MongoDbOrganizationModel & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, MongoDbOrganizationModel, Document<unknown, {}, import("mongoose").FlatRecord<MongoDbOrganizationModel>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<MongoDbOrganizationModel> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
