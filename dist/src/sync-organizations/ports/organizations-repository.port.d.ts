import { OrganizationSubscriptionStatus, OrganizationSubtype } from '../../sync-organizations/sync-organizations.constants';
export interface OrganizationsRepositoryPort {
    createOrUpdate({ organizationId, organizationName, organizationCreatedAt, organizationSubscriptionStatus, organizationSubtype, bpoOfficeOrganizationId, bpoOfficeName, }: {
        organizationId: string;
        organizationName: string;
        organizationCreatedAt: Date;
        organizationSubscriptionStatus: OrganizationSubscriptionStatus;
        organizationSubtype: OrganizationSubtype;
        bpoOfficeOrganizationId: string | null;
        bpoOfficeName: string | null;
    }): Promise<void>;
}
export declare const ORGANIZATIONS_REPOSITORY_PORT: unique symbol;
