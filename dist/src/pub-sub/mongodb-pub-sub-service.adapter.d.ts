import { LoggerService } from '@nestjs/common';
import { BaseConfigEntity } from '@app/config/base-config.entity';
import { PubSubServicePort } from '@app/pub-sub/pub-sub-service.port';
import { ClsService } from 'nestjs-cls';
import { Base } from '@app/base';
import { Model } from 'mongoose';
import { MongoDbPubSubEventModel } from '@app/pub-sub/mongodb-pub-sub-event.model';
import { WebsocketMessageEntity } from '@app/pub-sub/websocket-message.entity';
export declare class MongoDbPubSubServiceAdapter extends Base implements PubSubServicePort {
    protected readonly baseConfig: BaseConfigEntity;
    protected readonly logger: LoggerService;
    protected readonly cls: ClsService;
    private readonly pubSubEventModel;
    private publishBuffer;
    private publishBufferFlushInterval;
    private flushing;
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
    publishWebsocketMessage({ message, correlationId, }: {
        message: WebsocketMessageEntity;
        correlationId?: string;
    }): Promise<void>;
    unsafePublishWebsocketMessage({ message, }: {
        message: WebsocketMessageEntity;
    }): void;
}
