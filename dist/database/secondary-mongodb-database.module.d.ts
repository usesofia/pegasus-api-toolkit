import { OnApplicationShutdown } from '@nestjs/common';
import mongoose from 'mongoose';
export declare const SECONDARY_MONGOOSE_CONNECTION: unique symbol;
export declare class SecondaryMongoDbDatabaseModule implements OnApplicationShutdown {
    private readonly connection;
    constructor(connection: mongoose.Mongoose);
    onApplicationShutdown(): Promise<void>;
}
