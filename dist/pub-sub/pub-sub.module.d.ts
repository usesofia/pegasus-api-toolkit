import { OnApplicationShutdown } from '@nestjs/common';
import { PubSubServicePort } from '@app/pub-sub/pub-sub-service.port';
export declare class PubSubModule implements OnApplicationShutdown {
    private readonly pubSubService;
    constructor(pubSubService: PubSubServicePort);
    onApplicationShutdown(): Promise<void>;
}
