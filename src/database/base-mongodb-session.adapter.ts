import { ClientSession } from 'mongoose';
import { BaseSessionPort } from './base-session.port';

export class BaseMongoDbSessionAdapter implements BaseSessionPort {
  constructor(private readonly session: ClientSession) {}

  endSession(): Promise<void> {
    return this.session.endSession();
  }

  withTransaction<T>(fn: () => Promise<T>): Promise<T> {
    return this.session.withTransaction(fn);
  }

  getSession(): ClientSession {
    return this.session;
  }
}
