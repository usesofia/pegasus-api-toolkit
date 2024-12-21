export interface PubSubServicePort {
  publish(topic: string, payload: Record<string, any>): Promise<void>;
  unsafePublish(topic: string, payload: Record<string, any>): void;
  flushPublishBuffer({ max }: { max?: number }): Promise<void>;
  stopAutoFlushPublishBuffer(): Promise<void>;
}

export const PUB_SUB_SERVICE_PORT = Symbol('PubSubServicePort');
