import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { BaseConfigEntity, BASE_CONFIG } from '../config/base-config.entity';
import { PubSubServicePort } from './pub-sub-service.port';
import { LOGGER_SERVICE_PORT } from '../logger/logger.module';
import { ClsService } from 'nestjs-cls';
import { v4 as uuidv4 } from 'uuid';
import { Base } from '../base';
import { Model } from 'mongoose';
import { MongoDbPubSubEventModel } from './mongodb-pub-sub-event.model';
import { PUB_SUB_EVENT_MODEL } from './mongodb-pub-sub-event.module';

const MAX_PUBLISH_BUFFER_SIZE = 4096;

interface PublishBufferItem {
  id: string;
  topic: string;
  payload: Record<string, any>;
}

@Injectable()
export class MongoDbPubSubServiceAdapter extends Base implements PubSubServicePort {
  private publishBuffer: PublishBufferItem[] = [];
  private publishBufferFlushInterval: NodeJS.Timeout;

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
    this.publishBufferFlushInterval = setInterval(
      () => this.flushPublishBuffer({ max: 256 }),
      1000,
    );
  }

  async publish(topic: string, payload: Record<string, any>): Promise<void> {
    const event = new this.pubSubEventModel({
      topic,
      payload,
    });

    await event.save();

    this.log({
      functionName: 'publish',
      suffix: 'success',
      data: {
        messageId: event._id,
        topic,
        payload,
      },
    });
  }

  unsafePublish(topic: string, payload: Record<string, any>): void {
    if (this.publishBuffer.length >= MAX_PUBLISH_BUFFER_SIZE) {
      throw new Error(
        `Publish buffer is full. It has ${this.publishBuffer.length} items.`,
      );
    }
    this.publishBuffer.push({
      id: uuidv4(),
      topic,
      payload,
    });
  }

  async flushPublishBuffer({ max }: { max?: number }): Promise<void> {
    if (this.publishBuffer.length === 0) {
      return;
    }

    const calculatedMax = max ?? this.publishBuffer.length;

    const itemsToBePublished = this.publishBuffer.slice(0, calculatedMax);
    const successItemIdsPublished: string[] = [];

    await Promise.all(
      itemsToBePublished.map(async (item) => {
        try {
          await this.publish(item.topic, item.payload);
          successItemIdsPublished.push(item.id);
        } catch (error) {
          this.logWarn({
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
  }

  async stopAutoFlushPublishBuffer(): Promise<void> {
    clearInterval(this.publishBufferFlushInterval);
    await this.flushPublishBuffer({});
  }
}