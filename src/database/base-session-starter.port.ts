import { BaseSessionPort } from '@app/database/base-session.port';

export interface BaseSessionStarterPort {
  startSession(): Promise<BaseSessionPort>;
}
