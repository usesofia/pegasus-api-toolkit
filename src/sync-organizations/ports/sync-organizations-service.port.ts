export interface SyncOrganizationsServicePort {
  sync(): Promise<void>;
}

export const SYNC_ORGANIZATIONS_SERVICE_PORT = Symbol('SyncOrganizationsServicePort');