import build from 'pino-abstract-transport';
interface BetterStackTransportOptions {
    apiToken: string;
    apiUrl?: string;
    flushInterval?: number;
    maxBufferToTriggerFlush?: number;
    maxBuffer?: number;
    chunkSize?: number;
}
export default function createBetterStackTransportWrapper(options: BetterStackTransportOptions): {
    close: () => Promise<void>;
    transport: import("stream").Transform & build.OnUnknown;
};
export {};
