export interface BaseSessionPort {
  endSession(): Promise<void>;
  withTransaction<T>(fn: () => Promise<T>): Promise<T>;
  getSession(): any;
}
