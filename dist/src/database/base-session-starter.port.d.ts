import { BaseSessionPort } from '../database/base-session.port';
export interface BaseSessionStarterPort {
    startSession(): Promise<BaseSessionPort>;
}
