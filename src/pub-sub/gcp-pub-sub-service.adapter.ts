import { Base } from '@app/base';
import { BASE_CONFIG, BaseConfigEntity } from '@app/config/base-config.entity';
import { correlationIdHeaderKey } from '@app/correlation/correlation.constants';
import { LOGGER_SERVICE_PORT } from '@app/logger/logger.module';
import { GCP_PUB_SUB } from '@app/pub-sub/gcp-pub-sub.module';
import { PubSubServicePort } from '@app/pub-sub/pub-sub-service.port';
import { sendWebsocketMessageTopicName, WebsocketMessageEntity } from '@app/pub-sub/websocket-message.entity';
import {
  getJsonParseReviver,
  getJsonStringifyReplacer,
} from '@app/utils/json.utils';
import { Log } from '@app/utils/log.utils';
import { PubSub } from '@google-cloud/pubsub';
import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { v4 as uuidv4 } from 'uuid';

const MAX_PUBLISH_BUFFER_SIZE = 4096;

interface PublishBufferItem {
  correlationId: string;
  id: string;
  topic: string;
  payload: Record<string, unknown>;
}

@Injectable()
export class GcpPubSubServiceAdapter extends Base implements PubSubServicePort {
  private publishBuffer: PublishBufferItem[] = [];
  private publishBufferFlushInterval: NodeJS.Timeout;
  private flushing: boolean;

  constructor(
    @Inject(BASE_CONFIG)
    protected readonly baseConfig: BaseConfigEntity,
    @Inject(LOGGER_SERVICE_PORT)
    protected readonly logger: LoggerService,
    protected readonly cls: ClsService,
    @Inject(GCP_PUB_SUB)
    private readonly pubSub: PubSub,
  ) {
    super(GcpPubSubServiceAdapter.name, baseConfig, logger, cls);
    this.flushing = false;
    this.publishBufferFlushInterval = setInterval(
      () => void this.flushPublishBuffer({ max: 512 }),
      400,
    );
  }

  @Log()
  async publish({
    topic,
    payload,
    correlationId,
  }: {
    topic: string;
    payload: Record<string, unknown>;
    correlationId?: string;
  }): Promise<void> {
    const messageId = await this.pubSub.topic(topic).publishMessage({
      json: JSON.parse(
        JSON.stringify(payload, getJsonStringifyReplacer()),
        getJsonParseReviver(),
      ),
      attributes: {
        [correlationIdHeaderKey]: correlationId ?? this.cls.getId(),
        'Content-Type': 'application/json',
      },
    });
    this.log({
      correlationId,
      functionName: 'publish',
      suffix: 'success',
      data: {
        messageId,
        topic,
        payload,
      },
    });
  }

  @Log()
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
            correlationId: item.correlationId,
            functionName: 'flushPublishBuffer',
            suffix: 'itemFailedToBePublished',
            data: {
              error,
              item,
            },
          });
        }
      }),
    );

    this.publishBuffer = this.publishBuffer.filter(
      (item) => !successItemIdsPublished.includes(item.id),
    );

    this.flushing = false;
  }

  @Log()
  async stopAutoFlushPublishBuffer(): Promise<void> {
    try {
      clearInterval(this.publishBufferFlushInterval);
      // Wait until is flushing is false for 10 seconds at max
      let attempts = 0;
      while (this.flushing && attempts < 100) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        attempts++;
      }
      await this.flushPublishBuffer({});
    } catch {
      // Just ignore the error
    }
  }

  @Log()
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

  @Log()
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
