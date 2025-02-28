import { LoggerService } from '@nestjs/common';
import { BaseConfigEntity } from '@app/config/base-config.entity';
import { PubSubServicePort } from '@app/pub-sub/pub-sub-service.port';
import { PubSub } from '@google-cloud/pubsub';
import { ClsService } from 'nestjs-cls';
import { Base } from '@app/base';
export declare class GcpPubSubServiceAdapter extends Base implements PubSubServicePort {
    protected readonly baseConfig: BaseConfigEntity;
    protected readonly logger: LoggerService;
    protected readonly cls: ClsService;
    private readonly pubSub;
    private publishBuffer;
    private publishBufferFlushInterval;
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
}
