import { LoggerService } from '@nestjs/common';
import { BaseConfigEntity } from '../config/base-config.entity';
import { PubSubServicePort } from '../pub-sub/pub-sub-service.port';
import { ClsService } from 'nestjs-cls';
import { Base } from '../base';
import { Model } from 'mongoose';
import { MongoDbPubSubEventModel } from '../pub-sub/mongodb-pub-sub-event.model';
export declare class MongoDbPubSubServiceAdapter extends Base implements PubSubServicePort {
    protected readonly baseConfig: BaseConfigEntity;
    protected readonly logger: LoggerService;
    protected readonly cls: ClsService;
    private readonly pubSubEventModel;
    private publishBuffer;
    private publishBufferFlushInterval;
    private flushing;
    private isOn;
    constructor(baseConfig: BaseConfigEntity, logger: LoggerService, cls: ClsService, pubSubEventModel: Model<MongoDbPubSubEventModel>);
    publish({ topic, payload, correlationId, }: {
        topic: string;
        payload: Record<string, unknown>;
        correlationId?: string;
    }): Promise<void>;
    unsafePublish({ topic, payload, }: {
        topic: string;
        payload: Record<string, unknown>;
    }): void;
    flushPublishBuffer({ max }: {
        max?: number;
    }): Promise<void>;
    stopAutoFlushPublishBuffer(): Promise<void>;
}
