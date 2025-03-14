import { User, Organization, OrganizationInvitation, OrganizationMembership } from '@clerk/backend';
import { AuthUserEntity } from '../auth/entities/auth-user.entity';
export declare enum TestOrganization {
    AMBEV = "AMBEV",
    EMBRAER = "EMBRAER",
    VETTOR_BPO = "VETTOR_BPO",
    RESERVA_STORE_42 = "RESERVA_STORE_42",
    CHILLIBEANS_STORE_312 = "CHILLIBEANS_STORE_312",
    NAGUMO_SUPERMERCADOS = "NAGUMO_SUPERMERCADOS",
    NAGUMO_STORE_123 = "NAGUMO_STORE_123",
    NAGUMO_STORE_321 = "NAGUMO_STORE_321"
}
export declare enum TestUser {
    JOAO = "JOAO",
    JOANA = "JOANA",
    JULIANA = "JULIANA",
    MARIA = "MARIA",
    LUCAS = "LUCAS",
    RONALDO = "RONALDO",
    RONY = "RONY",
    CAITO = "CAITO",
    DANIEL = "DANIEL",
    RENATA = "RENATA",
    FERNANDA = "FERNANDA",
    PEDRO = "PEDRO",
    MANOEL = "MANOEL",
    PELE = "PELE"
}
export interface ClerkClientMockSubset {
    _clerkUsers: Record<TestUser, User>;
    _clerkOrganizations: Record<TestOrganization, Organization>;
    getAuthUserEntity: ({ token }: {
        token: string;
    }) => AuthUserEntity;
    verifyToken: ({ token }: {
        token: string;
    }) => {
        sub: string;
        org_id: string | undefined;
        org_role: 'org:member' | 'org:admin' | undefined;
    };
}
export declare const buildClerkClientMock: () => {
    _clerkUsers: Record<TestUser, User>;
    _clerkOrganizations: Record<TestOrganization, Organization>;
    _clerkMemberships: OrganizationMembership[];
    _clerkInvitesByOrganization: Record<string, OrganizationInvitation[]>;
    _newClerkOrganizations: Organization[];
    getAuthUserEntity: ({ token, }: {
        token: string;
    }) => AuthUserEntity;
    verifyToken: jest.Mock<any, any, any>;
    users: {
        getUser: jest.Mock<any, any, any>;
        getOrganizationMembershipList: jest.Mock<any, any, any>;
    };
    organizations: {
        createOrganizationInvitation: jest.Mock<any, any, any>;
        getOrganizationMembershipList: jest.Mock<any, any, any>;
        getOrganizationInvitationList: jest.Mock<any, any, any>;
        updateOrganizationMembership: jest.Mock<any, any, any>;
        deleteOrganizationMembership: jest.Mock<any, any, any>;
        revokeOrganizationInvitation: jest.Mock<any, any, any>;
        createOrganization: jest.Mock<any, any, any>;
        getOrganization: jest.Mock<any, any, any>;
        updateOrganization: jest.Mock<any, any, any>;
        updateOrganizationLogo: jest.Mock<any, any, any>;
        deleteOrganization: jest.Mock<any, any, any>;
        getOrganizationList: jest.Mock<any, any, any>;
        deleteOrganizationLogo: jest.Mock<any, any, any>;
    };
};
