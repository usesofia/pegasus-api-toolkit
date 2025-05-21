import { OnApplicationShutdown } from '@nestjs/common';
import mongoose from 'mongoose';
export declare const PRIMARY_MONGOOSE_CONNECTION: unique symbol;
export declare class PrimaryMongoDbDatabaseModule implements OnApplicationShutdown {
    private readonly connection;
    constructor(connection: mongoose.Connection);
    onApplicationShutdown(): Promise<void>;
}
