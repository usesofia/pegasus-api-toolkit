"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var MongoDbPubSubServiceAdapter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDbPubSubServiceAdapter = void 0;
const common_1 = require("@nestjs/common");
const base_config_entity_1 = require("../config/base-config.entity");
const logger_module_1 = require("../logger/logger.module");
const nestjs_cls_1 = require("nestjs-cls");
const uuid_1 = require("uuid");
const base_1 = require("../base");
const mongoose_1 = require("mongoose");
const mongodb_pub_sub_event_module_1 = require("./mongodb-pub-sub-event.module");
const MAX_PUBLISH_BUFFER_SIZE = 4096;
let MongoDbPubSubServiceAdapter = MongoDbPubSubServiceAdapter_1 = class MongoDbPubSubServiceAdapter extends base_1.Base {
    constructor(baseConfig, logger, cls, pubSubEventModel) {
        super(MongoDbPubSubServiceAdapter_1.name, baseConfig, logger, cls);
        this.baseConfig = baseConfig;
        this.logger = logger;
        this.cls = cls;
        this.pubSubEventModel = pubSubEventModel;
        this.publishBuffer = [];
        this.publishBufferFlushInterval = setInterval(() => this.flushPublishBuffer({ max: 256 }), 1000);
    }
    async publish({ topic, payload, correlationId, }) {
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
    unsafePublish({ topic, payload, }) {
        if (this.publishBuffer.length >= MAX_PUBLISH_BUFFER_SIZE) {
            throw new Error(`Publish buffer is full. It has ${this.publishBuffer.length} items.`);
        }
        this.publishBuffer.push({
            correlationId: this.cls.getId(),
            id: (0, uuid_1.v4)(),
            topic,
            payload,
        });
    }
    async flushPublishBuffer({ max }) {
        if (this.publishBuffer.length === 0) {
            return;
        }
        const calculatedMax = max ?? this.publishBuffer.length;
        const itemsToBePublished = this.publishBuffer.slice(0, calculatedMax);
        const successItemIdsPublished = [];
        await Promise.all(itemsToBePublished.map(async (item) => {
            try {
                await this.publish({
                    topic: item.topic,
                    payload: item.payload,
                    correlationId: item.correlationId,
                });
                successItemIdsPublished.push(item.id);
            }
            catch (error) {
                this.logWarn({
                    functionName: 'flushPublishBuffer',
                    suffix: 'itemFailedToBePublished',
                    data: {
                        error,
                        item,
                    },
                });
            }
        }));
        this.publishBuffer = this.publishBuffer.filter((item) => !successItemIdsPublished.includes(item.id));
    }
    async stopAutoFlushPublishBuffer() {
        clearInterval(this.publishBufferFlushInterval);
        await this.flushPublishBuffer({});
    }
};
exports.MongoDbPubSubServiceAdapter = MongoDbPubSubServiceAdapter;
exports.MongoDbPubSubServiceAdapter = MongoDbPubSubServiceAdapter = MongoDbPubSubServiceAdapter_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(base_config_entity_1.BASE_CONFIG)),
    __param(1, (0, common_1.Inject)(logger_module_1.LOGGER_SERVICE_PORT)),
    __param(3, (0, common_1.Inject)(mongodb_pub_sub_event_module_1.PUB_SUB_EVENT_MODEL)),
    __metadata("design:paramtypes", [base_config_entity_1.BaseConfigEntity, Object, nestjs_cls_1.ClsService,
        mongoose_1.Model])
], MongoDbPubSubServiceAdapter);
//# sourceMappingURL=mongodb-pub-sub-service.adapter.js.map