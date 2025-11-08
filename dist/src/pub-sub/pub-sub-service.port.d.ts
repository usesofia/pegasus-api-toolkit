import { WebsocketMessageEntity } from "@app/pub-sub/websocket-message.entity";
export interface PubSubServicePort {
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
export declare const PUB_SUB_SERVICE_PORT: unique symbol;
