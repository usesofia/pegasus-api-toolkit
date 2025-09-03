export interface OrganizationsRepositoryPort {
  createOrUpdate({ organizationId, organizationName }: { organizationId: string, organizationName: string }): Promise<void>;
}

export const ORGANIZATIONS_REPOSITORY_PORT = Symbol('OrganizationsRepositoryPort');