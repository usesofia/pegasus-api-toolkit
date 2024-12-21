export interface PubSubServicePort {
    publish(topic: string, payload: Record<string, any>): Promise<void>;
    unsafePublish(topic: string, payload: Record<string, any>): void;
    flushPublishBuffer({ max }: {
        max?: number;
    }): Promise<void>;
    stopAutoFlushPublishBuffer(): Promise<void>;
}
export declare const PUB_SUB_SERVICE_PORT: unique symbol;
