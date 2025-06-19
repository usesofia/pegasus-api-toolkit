"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createBetterStackTransportWrapper;
const pino_abstract_transport_1 = __importDefault(require("pino-abstract-transport"));
const axios_1 = __importDefault(require("axios"));
const axios_retry_1 = __importStar(require("axios-retry"));
const luxon_1 = require("luxon");
const msgpack = __importStar(require("msgpack-lite"));
function createBetterStackTransportWrapper(options) {
    const { apiToken, apiUrl = 'https://in.logs.betterstack.com', flushInterval = 400, maxBuffer = 10000, maxBufferToTriggerFlush = 200, chunkSize = 200, } = options;
    const buffer = [];
    let timer = null;
    let isFlushing = false;
    const axiosInstance = axios_1.default.create({
        baseURL: apiUrl,
        headers: {
            'Content-Type': 'application/msgpack',
            Authorization: `Bearer ${apiToken}`,
        },
    });
    (0, axios_retry_1.default)(axiosInstance, { retries: 16, retryDelay: axios_retry_1.exponentialDelay });
    async function sendLogsWithRetry(logs) {
        const superChunkSize = 32;
        for (let i = 0; i < logs.length; i += chunkSize * superChunkSize) {
            const superChunk = logs.slice(i, i + chunkSize * superChunkSize);
            await Promise.all(Array.from({ length: Math.ceil(superChunk.length / chunkSize) }, (_, index) => {
                const start = index * chunkSize;
                const chunk = superChunk.slice(start, start + chunkSize);
                const encodedChunk = msgpack.encode(chunk.map((log) => {
                    const { msg, level, ...rest } = log;
                    return {
                        dt: log.dt,
                        message: msg,
                        level: convertLogLevel(level),
                        ...rest,
                    };
                }));
                return axiosInstance.post('/', encodedChunk);
            }));
        }
    }
    function convertLogLevel(level) {
        if (typeof level === 'number') {
            if (level <= 10)
                return 'TRACE';
            if (level <= 20)
                return 'DEBUG';
            if (level <= 30)
                return 'INFO';
            if (level <= 40)
                return 'WARN';
            if (level <= 50)
                return 'ERROR';
            return 'FATAL';
        }
        return typeof level === 'string' ? level.toUpperCase() : 'INFO';
    }
    async function flush(force) {
        if (!force && (isFlushing || buffer.length === 0))
            return;
        isFlushing = true;
        const logs = [...buffer];
        buffer.length = 0;
        try {
            await sendLogsWithRetry(logs);
        }
        catch (error) {
            console.error('Failed to send logs after retries:', error);
            buffer.unshift(...logs);
            if (buffer.length > maxBuffer) {
                buffer.length = maxBuffer;
            }
        }
        finally {
            isFlushing = false;
        }
    }
    return {
        close: async () => {
            if (timer) {
                clearInterval(timer);
                timer = null;
            }
            await flush(true);
        },
        transport: (0, pino_abstract_transport_1.default)(async (source) => {
            timer = setInterval(() => {
                void flush();
            }, flushInterval);
            for await (const obj of source) {
                const dt = luxon_1.DateTime.utc().toISO();
                const logEntry = {
                    ...obj,
                    dt,
                };
                buffer.push(logEntry);
                if (buffer.length >= maxBufferToTriggerFlush) {
                    flush().catch((err) => {
                        console.error('Error flushing buffer:', err);
                    });
                }
            }
        }),
    };
}
//# sourceMappingURL=better-stack-transport.js.map