import { User, Organization } from '@clerk/backend';
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
    FERNANDA = "FERNANDA"
}
export declare const buildClerkClientMock: () => {
    _clerkUsers: Record<TestUser, User>;
    _clerkOrganizations: Record<TestOrganization, Organization>;
    verifyToken: jest.Mock<any, any, any>;
    users: {
        getUser: jest.Mock<any, any, any>;
    };
    organizations: {
        getOrganization: jest.Mock<any, any, any>;
    };
};
