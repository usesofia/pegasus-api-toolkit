import { OnApplicationShutdown } from '@nestjs/common';
import { GcpPubSubServiceAdapter } from './gcp-pub-sub-service.adapter';
import { MongoDbPubSubServiceAdapter } from './mongodb-pub-sub-service.adapter';
export declare class PubSubModule implements OnApplicationShutdown {
    private readonly gcpPubSubServiceAdapter;
    private readonly mongoDbPubSubServiceAdapter;
    constructor(gcpPubSubServiceAdapter: GcpPubSubServiceAdapter, mongoDbPubSubServiceAdapter: MongoDbPubSubServiceAdapter);
    onApplicationShutdown(): Promise<void>;
}
