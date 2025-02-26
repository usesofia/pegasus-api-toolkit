export interface TransactionOptions {
  timeoutInMiliseconds?: number;
  nRetries?: number;
}

export interface BaseSessionPort {
  endSession(): Promise<void>;
  withTransaction<T>(fn: () => Promise<T>, options?: TransactionOptions): Promise<T>;
  getSession(): unknown;
}
