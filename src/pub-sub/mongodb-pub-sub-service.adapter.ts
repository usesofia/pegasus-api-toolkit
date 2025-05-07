import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { BaseConfigEntity, BASE_CONFIG } from '@app/config/base-config.entity';
import { PubSubServicePort } from '@app/pub-sub/pub-sub-service.port';
import { LOGGER_SERVICE_PORT } from '@app/logger/logger.module';
import { ClsService } from 'nestjs-cls';
import { v4 as uuidv4 } from 'uuid';
import { Base } from '@app/base';
import { Model } from 'mongoose';
import { MongoDbPubSubEventModel } from '@app/pub-sub/mongodb-pub-sub-event.model';
import { PUB_SUB_EVENT_MODEL } from '@app/pub-sub/mongodb-pub-sub-event.module';
import { sendWebsocketMessageTopicName, WebsocketMessageEntity } from '@app/pub-sub/websocket-message.entity';

const MAX_PUBLISH_BUFFER_SIZE = 4096;

interface PublishBufferItem {
  correlationId: string;
  id: string;
  topic: string;
  payload: Record<string, unknown>;
}

@Injectable()
export class MongoDbPubSubServiceAdapter
  extends Base
  implements PubSubServicePort
{
  private publishBuffer: PublishBufferItem[] = [];
  private publishBufferFlushInterval: NodeJS.Timeout;
  private flushing: boolean;

  constructor(
    @Inject(BASE_CONFIG)
    protected readonly baseConfig: BaseConfigEntity,
    @Inject(LOGGER_SERVICE_PORT)
    protected readonly logger: LoggerService,
    protected readonly cls: ClsService,
    @Inject(PUB_SUB_EVENT_MODEL)
    private readonly pubSubEventModel: Model<MongoDbPubSubEventModel>,
  ) {
    super(MongoDbPubSubServiceAdapter.name, baseConfig, logger, cls);
    this.flushing = false;
    this.publishBufferFlushInterval = setInterval(() => {
      void this.flushPublishBuffer({ max: 512 });
    }, 400);
  }

  async publish({
    topic,
    payload,
    correlationId,
  }: {
    topic: string;
    payload: Record<string, unknown>;
    correlationId?: string;
  }): Promise<void> {
    const event = new this.pubSubEventModel({
      topic,
      payload,
    });

    await event.save();

    this.log({
      correlationId,
      functionName: 'publish',
      suffix: 'success',
      data: {
        messageId: event._id,
        topic,
        payload,
      },
    });
  }

  unsafePublish({
    topic,
    payload,
  }: {
    topic: string;
    payload: Record<string, unknown>;
  }): void {
    if (this.publishBuffer.length >= MAX_PUBLISH_BUFFER_SIZE) {
      throw new Error(
        `Publish buffer is full. It has ${this.publishBuffer.length.toString()} items.`,
      );
    }
    this.publishBuffer.push({
      correlationId: this.cls.getId(),
      id: uuidv4(),
      topic,
      payload,
    });
  }

  async flushPublishBuffer({ max }: { max?: number }): Promise<void> {
    if (this.publishBuffer.length === 0) {
      return;
    }

    if (this.flushing) {
      return;
    }

    this.flushing = true;

    const calculatedMax = max ?? this.publishBuffer.length;

    const itemsToBePublished = this.publishBuffer.slice(0, calculatedMax);
    const successItemIdsPublished: string[] = [];

    await Promise.all(
      itemsToBePublished.map(async (item) => {
        try {
          await this.publish({
            topic: item.topic,
            payload: item.payload,
            correlationId: item.correlationId,
          });
          successItemIdsPublished.push(item.id);
        } catch (error) {
          this.logWarn({
            functionName: 'flushPublishBuffer',
            suffix: 'itemFailedToBePublished',
            data: {
              error,
              item,
            },
            correlationId: item.correlationId,
          });
        }
      }),
    );

    this.publishBuffer = this.publishBuffer.filter(
      (item) => !successItemIdsPublished.includes(item.id),
    );

    this.flushing = false;
  }

  async stopAutoFlushPublishBuffer(): Promise<void> {
    clearInterval(this.publishBufferFlushInterval);
    // Wait until is flushing is false for 10 seconds at max
    let attempts = 0;
    while (this.flushing && attempts < 100) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      attempts++;
    }
    await this.flushPublishBuffer({});
  }

  async publishWebsocketMessage({
    message,
    correlationId,
  }: {
    message: WebsocketMessageEntity;
    correlationId?: string;
  }): Promise<void> {
    await this.publish({
      topic: sendWebsocketMessageTopicName,
      payload: {
        userId: message.userId,
        organizationId: message.organizationId,
        event: message.event,
        data: message.data,
      },
      correlationId,
    });
  }

  unsafePublishWebsocketMessage({
    message,
  }: {
    message: WebsocketMessageEntity;
  }): void {
    this.unsafePublish({
      topic: sendWebsocketMessageTopicName,
      payload: {
        userId: message.userId,
        organizationId: message.organizationId,
        event: message.event,
        data: message.data,
      },
    });
  }
}
