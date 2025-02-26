"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createBetterStackTransportWrapper;
const build = require("pino-abstract-transport");
const axios_1 = require("axios");
const axios_retry_1 = require("axios-retry");
const json_utils_1 = require("../utils/json.utils");
function createBetterStackTransportWrapper(options) {
    const { apiToken, apiUrl = 'https://in.logs.betterstack.com', flushInterval = 400, maxBuffer = 10000, maxBufferToTriggerFlush = 200, chunkSize = 200, } = options;
    const buffer = [];
    let timer = null;
    let isFlushing = false;
    const axiosInstance = axios_1.default.create({
        baseURL: apiUrl,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiToken}`
        }
    });
    (0, axios_retry_1.default)(axiosInstance, { retries: 16, retryDelay: axios_retry_1.exponentialDelay });
    async function sendLogsWithRetry(logs) {
        for (let i = 0; i < logs.length; i += chunkSize) {
            const chunk = logs.slice(i, i + chunkSize);
            await axiosInstance.post('/', JSON.stringify(chunk.map(log => {
                const { msg, level, ...rest } = log;
                return {
                    dt: log.dt,
                    message: msg,
                    level: convertLogLevel(level),
                    ...rest,
                };
            }), (0, json_utils_1.getStringfyReplacer)()));
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
        transport: build(async (source) => {
            timer = setInterval(() => {
                void flush();
            }, flushInterval);
            for await (const obj of source) {
                const dt = new Date().toISOString().replace('T', ' ').replace(/\.\d+Z$/, ' UTC');
                const logEntry = {
                    ...obj,
                    dt,
                };
                buffer.push(logEntry);
                if (buffer.length >= maxBufferToTriggerFlush) {
                    flush().catch(err => {
                        console.error('Error flushing buffer:', err);
                    });
                }
            }
        })
    };
}
//# sourceMappingURL=integration-test-better-stack-transport.js.map