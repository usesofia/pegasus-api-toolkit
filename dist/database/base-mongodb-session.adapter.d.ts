import { ClientSession } from 'mongoose';
import { BaseSessionPort } from './base-session.port';
export declare class BaseMongoDbSessionAdapter implements BaseSessionPort {
    private readonly session;
    constructor(session: ClientSession);
    endSession(): Promise<void>;
    withTransaction<T>(fn: () => Promise<T>): Promise<T>;
    getSession(): ClientSession;
}
