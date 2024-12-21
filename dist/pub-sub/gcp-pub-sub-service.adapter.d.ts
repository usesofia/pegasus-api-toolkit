import { LoggerService } from '@nestjs/common';
import { BaseConfigEntity } from '../config/base-config.entity';
import { PubSubServicePort } from './pub-sub-service.port';
import { PubSub } from '@google-cloud/pubsub';
import { ClsService } from 'nestjs-cls';
import { Base } from '../base';
export declare class GcpPubSubServiceAdapter extends Base implements PubSubServicePort {
    protected readonly baseConfig: BaseConfigEntity;
    protected readonly logger: LoggerService;
    protected readonly cls: ClsService;
    private readonly pubSub;
    private publishBuffer;
    private publishBufferFlushInterval;
    constructor(baseConfig: BaseConfigEntity, logger: LoggerService, cls: ClsService, pubSub: PubSub);
    publish(topic: string, payload: Record<string, any>): Promise<void>;
    unsafePublish(topic: string, payload: Record<string, any>): void;
    flushPublishBuffer({ max }: {
        max?: number;
    }): Promise<void>;
    stopAutoFlushPublishBuffer(): Promise<void>;
}
