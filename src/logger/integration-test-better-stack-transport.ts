import * as build from 'pino-abstract-transport';
import axios from 'axios';
import axiosRetry, {exponentialDelay} from 'axios-retry';

interface BetterStackTransportOptions {
  apiToken: string;
  apiUrl?: string;
  flushInterval?: number; // How often to flush logs in ms (default: 400)
  maxBufferToTriggerFlush?: number; // Maximum number of logs to buffer before flushing (default: 200)
  maxBuffer?: number; // Maximum number of logs to buffer (default: 10000)
  chunkSize?: number; // Maximum number of logs to send in a single request (default: 200)
}

interface LogEntry {
  msg?: string;
  level?: string;
  dt?: string;
  [key: string]: unknown;
}

export default function createBetterStackTransportWrapper(options: BetterStackTransportOptions) {
  const {
    apiToken,
    apiUrl = 'https://in.logs.betterstack.com',
    flushInterval = 400,
    maxBuffer = 10000,
    maxBufferToTriggerFlush = 200,
    chunkSize = 200,
  } = options;

  const buffer: LogEntry[] = [];
  let timer: NodeJS.Timeout | null = null;
  let isFlushing = false;

  const axiosInstance = axios.create({
    baseURL: apiUrl,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiToken}`
    }
  });

  axiosRetry(axiosInstance, { retries: 16, retryDelay: exponentialDelay });

  // Function to send logs with retry mechanism
  async function sendLogsWithRetry(logs: LogEntry[]): Promise<void> {
    // Split logs into chunks according to chunkSize
    for (let i = 0; i < logs.length; i += chunkSize) {
      const chunk = logs.slice(i, i + chunkSize);
      await axiosInstance.post('/', JSON.stringify(chunk.map(log => {
        const { msg, ...rest } = log;
        return {
          dt: log.dt,
          level: convertLogLevel(log.level),
          message: msg,
          ...rest
        }
      })));
    }
  }

  // Function to convert Pino numerical log levels to string representations
  function convertLogLevel(level: unknown): string {
    if (typeof level === 'number') {
      if (level <= 10) return 'TRACE';
      if (level <= 20) return 'DEBUG';
      if (level <= 30) return 'INFO';
      if (level <= 40) return 'WARN';
      if (level <= 50) return 'ERROR';
      return 'FATAL';
    }
    
    // If level is already a string or undefined, return as is or default to INFO
    return typeof level === 'string' ? level.toUpperCase() : 'INFO';
  }

  // Function to flush the buffer
  async function flush(force?: boolean): Promise<void> {
    if (!force && (isFlushing || buffer.length === 0)) return;
    
    isFlushing = true;
    const logs = [...buffer];
    buffer.length = 0; // Clear the buffer
    
    try {
      await sendLogsWithRetry(logs);
    } catch (error) {
      // If sending fails after all retries, put logs back in buffer
      console.error('Failed to send logs after retries:', error);
      // Prioritize these logs by putting them at the beginning of the buffer
      buffer.unshift(...logs);
      if (buffer.length > maxBuffer) {
        buffer.length = maxBuffer; // Trim to max buffer size
      }
    } finally {
      isFlushing = false;
    }
  }

  // Build and return the transport wrapper
  return {
    // Close function to flush remaining logs and clear timer
    close: async () => {
        if (timer) {
          clearInterval(timer);
          timer = null;
        }
        
        // Attempt to send any remaining logs
        await flush(true);
    },
    transport: build(async (source) => {
        // Start the flush timer
        timer = setInterval(() => {
          void flush();
        }, flushInterval);
    
        // Process each log
        for await (const obj of source) {
          // Format the date in UTC as required by Better Stack
          const dt = new Date().toISOString().replace('T', ' ').replace(/\.\d+Z$/, ' UTC');
          
          // Add timestamp to the log object
          const logEntry = {
            ...obj,
            dt,
          } as LogEntry;
          
          // Add to buffer
          buffer.push(logEntry);
          
          // If buffer has reached the max buffer to trigger flush, flush immediately
          if (buffer.length >= maxBufferToTriggerFlush) {
            flush().catch(err => {
              console.error('Error flushing buffer:', err);
            });
          }
        }
      })
  };
}
