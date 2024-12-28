import { LoggerService } from '@nestjs/common';
import { BaseConfigEntity } from '../config/base-config.entity';
import { PubSubServicePort } from './pub-sub-service.port';
import { ClsService } from 'nestjs-cls';
import { Base } from '../base';
import { Model } from 'mongoose';
import { MongoDbPubSubEventModel } from './mongodb-pub-sub-event.model';
export declare class MongoDbPubSubServiceAdapter extends Base implements PubSubServicePort {
    protected readonly baseConfig: BaseConfigEntity;
    protected readonly logger: LoggerService;
    protected readonly cls: ClsService;
    private readonly pubSubEventModel;
    private publishBuffer;
    private publishBufferFlushInterval;
    constructor(baseConfig: BaseConfigEntity, logger: LoggerService, cls: ClsService, pubSubEventModel: Model<MongoDbPubSubEventModel>);
    publish(topic: string, payload: Record<string, any>): Promise<void>;
    unsafePublish(topic: string, payload: Record<string, any>): void;
    flushPublishBuffer({ max }: {
        max?: number;
    }): Promise<void>;
    stopAutoFlushPublishBuffer(): Promise<void>;
}
