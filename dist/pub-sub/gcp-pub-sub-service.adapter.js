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
var GcpPubSubServiceAdapter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GcpPubSubServiceAdapter = void 0;
const base_1 = require("../base");
const base_config_entity_1 = require("../config/base-config.entity");
const correlation_constants_1 = require("../correlation/correlation.constants");
const logger_module_1 = require("../logger/logger.module");
const gcp_pub_sub_module_1 = require("./gcp-pub-sub.module");
const websocket_message_entity_1 = require("./websocket-message.entity");
const json_utils_1 = require("../utils/json.utils");
const log_utils_1 = require("../utils/log.utils");
const pubsub_1 = require("@google-cloud/pubsub");
const common_1 = require("@nestjs/common");
const nestjs_cls_1 = require("nestjs-cls");
const uuid_1 = require("uuid");
const MAX_PUBLISH_BUFFER_SIZE = 4096;
let GcpPubSubServiceAdapter = GcpPubSubServiceAdapter_1 = class GcpPubSubServiceAdapter extends base_1.Base {
    constructor(baseConfig, logger, cls, pubSub) {
        super(GcpPubSubServiceAdapter_1.name, baseConfig, logger, cls);
        this.baseConfig = baseConfig;
        this.logger = logger;
        this.cls = cls;
        this.pubSub = pubSub;
        this.publishBuffer = [];
        this.flushing = false;
        this.publishBufferFlushInterval = setInterval(() => void this.flushPublishBuffer({ max: 512 }), 400);
    }
    async publish({ topic, payload, correlationId, }) {
        const messageId = await this.pubSub.topic(topic).publishMessage({
            json: JSON.parse(JSON.stringify(payload, (0, json_utils_1.getJsonStringifyReplacer)()), (0, json_utils_1.getJsonParseReviver)()),
            attributes: {
                [correlation_constants_1.correlationIdHeaderKey]: correlationId ?? this.cls.getId(),
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
    unsafePublish({ topic, payload, }) {
        if (this.publishBuffer.length >= MAX_PUBLISH_BUFFER_SIZE) {
            throw new Error(`Publish buffer is full. It has ${this.publishBuffer.length.toString()} items.`);
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
        if (this.flushing) {
            return;
        }
        this.flushing = true;
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
                    correlationId: item.correlationId,
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
        this.flushing = false;
    }
    async stopAutoFlushPublishBuffer() {
        try {
            clearInterval(this.publishBufferFlushInterval);
            let attempts = 0;
            while (this.flushing && attempts < 100) {
                await new Promise((resolve) => setTimeout(resolve, 100));
                attempts++;
            }
            await this.flushPublishBuffer({});
        }
        catch {
        }
    }
    async publishWebsocketMessage({ message, correlationId, }) {
        await this.publish({
            topic: websocket_message_entity_1.sendWebsocketMessageTopicName,
            payload: {
                userId: message.userId,
                organizationId: message.organizationId,
                event: message.event,
                data: message.data,
            },
            correlationId,
        });
    }
    unsafePublishWebsocketMessage({ message, }) {
        this.unsafePublish({
            topic: websocket_message_entity_1.sendWebsocketMessageTopicName,
            payload: {
                userId: message.userId,
                organizationId: message.organizationId,
                event: message.event,
                data: message.data,
            },
        });
    }
};
exports.GcpPubSubServiceAdapter = GcpPubSubServiceAdapter;
__decorate([
    (0, log_utils_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GcpPubSubServiceAdapter.prototype, "publish", null);
__decorate([
    (0, log_utils_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GcpPubSubServiceAdapter.prototype, "unsafePublish", null);
__decorate([
    (0, log_utils_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GcpPubSubServiceAdapter.prototype, "stopAutoFlushPublishBuffer", null);
__decorate([
    (0, log_utils_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GcpPubSubServiceAdapter.prototype, "publishWebsocketMessage", null);
__decorate([
    (0, log_utils_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GcpPubSubServiceAdapter.prototype, "unsafePublishWebsocketMessage", null);
exports.GcpPubSubServiceAdapter = GcpPubSubServiceAdapter = GcpPubSubServiceAdapter_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(base_config_entity_1.BASE_CONFIG)),
    __param(1, (0, common_1.Inject)(logger_module_1.LOGGER_SERVICE_PORT)),
    __param(3, (0, common_1.Inject)(gcp_pub_sub_module_1.GCP_PUB_SUB)),
    __metadata("design:paramtypes", [base_config_entity_1.BaseConfigEntity, Object, nestjs_cls_1.ClsService,
        pubsub_1.PubSub])
], GcpPubSubServiceAdapter);
//# sourceMappingURL=gcp-pub-sub-service.adapter.js.map