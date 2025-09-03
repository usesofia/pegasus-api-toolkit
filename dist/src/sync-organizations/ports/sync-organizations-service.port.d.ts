export interface SyncOrganizationsServicePort {
    sync(): Promise<void>;
}
export declare const SYNC_ORGANIZATIONS_SERVICE_PORT: unique symbol;
