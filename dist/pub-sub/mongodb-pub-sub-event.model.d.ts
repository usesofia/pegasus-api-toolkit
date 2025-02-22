export declare class MongoDbPubSubEventModel {
    topic: string;
    payload: Record<string, unknown>;
}
export declare const MongoDbPubSubEventModelSchema: import("mongoose").Schema<MongoDbPubSubEventModel, import("mongoose").Model<MongoDbPubSubEventModel, any, any, any, import("mongoose").Document<unknown, any, MongoDbPubSubEventModel> & MongoDbPubSubEventModel & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, MongoDbPubSubEventModel, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<MongoDbPubSubEventModel>> & import("mongoose").FlatRecord<MongoDbPubSubEventModel> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
