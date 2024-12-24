import { BaseSessionPort } from "./base-session.port";

export interface BaseSessionStarterPort {
  startSession(): Promise<BaseSessionPort>;
}
