export interface TransactionOptions {
  timeoutInMiliseconds?: number;
  nRetries?: number;
  maxDelayBetweenAttempts?: number;
  readConcern?: {
    level: 'local' | 'majority' | 'linearizable' | 'snapshot';
  };
}

export interface BaseSessionPort {
  endSession(): Promise<void>;
  withTransaction<T>(fn: () => Promise<T>, options?: TransactionOptions): Promise<T>;
  getSession(): unknown;
}
