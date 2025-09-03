export interface OrganizationsRepositoryPort {
    createOrUpdate({ organizationId, organizationName }: {
        organizationId: string;
        organizationName: string;
    }): Promise<void>;
}
export declare const ORGANIZATIONS_REPOSITORY_PORT: unique symbol;
