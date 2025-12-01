import { Base } from '@app/base';
import { BaseConfigEntity } from '@app/config/base-config.entity';
import { PubSubServicePort } from '@app/pub-sub/pub-sub-service.port';
import { WebsocketMessageEntity } from '@app/pub-sub/websocket-message.entity';
import { PubSub } from '@google-cloud/pubsub';
import { LoggerService } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
export declare class GcpPubSubServiceAdapter extends Base implements PubSubServicePort {
    protected readonly baseConfig: BaseConfigEntity;
    protected readonly logger: LoggerService;
    protected readonly cls: ClsService;
    private readonly pubSub;
    private publishBuffer;
    private publishBufferFlushInterval;
    private flushing;
    constructor(baseConfig: BaseConfigEntity, logger: LoggerService, cls: ClsService, pubSub: PubSub);
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
