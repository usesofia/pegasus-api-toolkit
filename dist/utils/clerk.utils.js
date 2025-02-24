"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildClerkClientMock = exports.TestUser = exports.TestOrganization = void 0;
const faker_1 = require("@faker-js/faker");
const uuid_1 = require("uuid");
var TestOrganization;
(function (TestOrganization) {
    TestOrganization["AMBEV"] = "AMBEV";
    TestOrganization["EMBRAER"] = "EMBRAER";
    TestOrganization["VETTOR_BPO"] = "VETTOR_BPO";
    TestOrganization["RESERVA_STORE_42"] = "RESERVA_STORE_42";
    TestOrganization["CHILLIBEANS_STORE_312"] = "CHILLIBEANS_STORE_312";
    TestOrganization["NAGUMO_SUPERMERCADOS"] = "NAGUMO_SUPERMERCADOS";
    TestOrganization["NAGUMO_STORE_123"] = "NAGUMO_STORE_123";
    TestOrganization["NAGUMO_STORE_321"] = "NAGUMO_STORE_321";
})(TestOrganization || (exports.TestOrganization = TestOrganization = {}));
var TestUser;
(function (TestUser) {
    TestUser["JOAO"] = "JOAO";
    TestUser["JOANA"] = "JOANA";
    TestUser["JULIANA"] = "JULIANA";
    TestUser["MARIA"] = "MARIA";
    TestUser["LUCAS"] = "LUCAS";
    TestUser["RONALDO"] = "RONALDO";
    TestUser["RONY"] = "RONY";
    TestUser["CAITO"] = "CAITO";
    TestUser["DANIEL"] = "DANIEL";
    TestUser["RENATA"] = "RENATA";
    TestUser["FERNANDA"] = "FERNANDA";
})(TestUser || (exports.TestUser = TestUser = {}));
const memberUsers = [TestUser.JOANA];
const processToken = (token) => {
    const splitedToken = token.split(':');
    if (splitedToken.length === 1) {
        const user = TestUser[splitedToken[0]];
        return [user, undefined];
    }
    else if (splitedToken.length === 2) {
        const user = TestUser[splitedToken[0]];
        const organization = TestOrganization[splitedToken[1]];
        switch (organization) {
            case TestOrganization.AMBEV:
                if (user !== TestUser.JOAO &&
                    user !== TestUser.JOANA &&
                    user !== TestUser.JULIANA) {
                    throw new Error(`Invalid user ${user} for organization ${organization}.`);
                }
                break;
            case TestOrganization.EMBRAER:
                if (user !== TestUser.MARIA && user !== TestUser.JULIANA) {
                    throw new Error(`Invalid user ${user} for organization ${organization}.`);
                }
                break;
            case TestOrganization.VETTOR_BPO:
                if (user !== TestUser.LUCAS && user !== TestUser.RONALDO) {
                    throw new Error(`Invalid user ${user} for organization ${organization}.`);
                }
                break;
            case TestOrganization.RESERVA_STORE_42:
                if (user !== TestUser.RONY) {
                    throw new Error(`Invalid user ${user} for organization ${organization}.`);
                }
                break;
            case TestOrganization.CHILLIBEANS_STORE_312:
                if (user !== TestUser.CAITO) {
                    throw new Error(`Invalid user ${user} for organization ${organization}.`);
                }
                break;
            case TestOrganization.NAGUMO_SUPERMERCADOS:
                if (user !== TestUser.DANIEL && user !== TestUser.RONALDO) {
                    throw new Error(`Invalid user ${user} for organization ${organization}.`);
                }
                break;
            case TestOrganization.NAGUMO_STORE_123:
                if (user !== TestUser.RENATA) {
                    throw new Error(`Invalid user ${user} for organization ${organization}.`);
                }
                break;
            case TestOrganization.NAGUMO_STORE_321:
                if (user !== TestUser.FERNANDA) {
                    throw new Error(`Invalid user ${user} for organization ${organization}.`);
                }
                break;
            default:
                throw new Error(`Invalid organization ${String(organization)}.`);
        }
        return [user, organization];
    }
    else {
        throw new Error(`Invalid token ${token}.`);
    }
};
const buildClerkUser = ({ user }) => {
    const userId = (0, uuid_1.v4)();
    const emailAddresses = [
        {
            id: (0, uuid_1.v4)(),
            emailAddress: `${user.toString().toLowerCase()}-${userId}@example.com`,
            linkedTo: [],
            verification: null,
        },
    ];
    const phoneNumbers = [
        {
            id: (0, uuid_1.v4)(),
            phoneNumber: faker_1.faker.phone.number(),
            linkedTo: [],
            verification: null,
            reservedForSecondFactor: false,
            defaultSecondFactor: false,
        },
    ];
    const firstName = user.toString().charAt(0).toUpperCase() + user.toString().slice(1);
    const lastName = faker_1.faker.person.lastName();
    const clerkUser = {
        id: userId,
        passwordEnabled: true,
        totpEnabled: true,
        backupCodeEnabled: true,
        twoFactorEnabled: true,
        banned: false,
        locked: false,
        createdAt: 1713542400,
        updatedAt: 1713542400,
        imageUrl: 'https://example.com/image.png',
        hasImage: true,
        primaryEmailAddressId: emailAddresses[0].id,
        primaryPhoneNumberId: phoneNumbers[0].id,
        primaryWeb3WalletId: (0, uuid_1.v4)(),
        lastSignInAt: 1713542400,
        externalId: (0, uuid_1.v4)(),
        username: `${user.toString().toLowerCase()}-${userId}`,
        firstName,
        lastName,
        fullName: `${firstName} ${lastName}`,
        emailAddresses,
        phoneNumbers,
        web3Wallets: [],
        publicMetadata: {},
        privateMetadata: {},
        unsafeMetadata: {},
        externalAccounts: [],
        samlAccounts: [],
        lastActiveAt: 1713542400,
        createOrganizationEnabled: true,
        createOrganizationsLimit: null,
        deleteSelfEnabled: true,
        legalAcceptedAt: 1713542400,
        primaryEmailAddress: emailAddresses[0],
        primaryPhoneNumber: phoneNumbers[0],
        primaryWeb3Wallet: null,
    };
    return clerkUser;
};
const buildClerkOrganization = ({ organization, }) => {
    const organizationId = (0, uuid_1.v4)();
    const clerkOrganization = {
        id: organizationId,
        name: organization.toString().charAt(0).toUpperCase() +
            organization.toString().slice(1),
        slug: organization.toString().toLowerCase() + '-' + organizationId,
        imageUrl: 'https://example.com/image.png',
        hasImage: true,
        createdAt: 1713542400,
        updatedAt: 1713542400,
        publicMetadata: {},
        privateMetadata: {},
        maxAllowedMemberships: 100,
        adminDeleteEnabled: true,
    };
    return clerkOrganization;
};
const buildClerkClientMock = () => {
    const clerkUsers = {
        [TestUser.JOAO]: buildClerkUser({ user: TestUser.JOAO }),
        [TestUser.JOANA]: buildClerkUser({ user: TestUser.JOANA }),
        [TestUser.JULIANA]: buildClerkUser({ user: TestUser.JULIANA }),
        [TestUser.MARIA]: buildClerkUser({ user: TestUser.MARIA }),
        [TestUser.LUCAS]: buildClerkUser({ user: TestUser.LUCAS }),
        [TestUser.RONALDO]: buildClerkUser({ user: TestUser.RONALDO }),
        [TestUser.RONY]: buildClerkUser({ user: TestUser.RONY }),
        [TestUser.CAITO]: buildClerkUser({ user: TestUser.CAITO }),
        [TestUser.DANIEL]: buildClerkUser({ user: TestUser.DANIEL }),
        [TestUser.RENATA]: buildClerkUser({ user: TestUser.RENATA }),
        [TestUser.FERNANDA]: buildClerkUser({ user: TestUser.FERNANDA }),
    };
    const plainClerkOrganizations = {
        [TestOrganization.AMBEV]: buildClerkOrganization({
            organization: TestOrganization.AMBEV,
        }),
        [TestOrganization.EMBRAER]: buildClerkOrganization({
            organization: TestOrganization.EMBRAER,
        }),
        [TestOrganization.VETTOR_BPO]: buildClerkOrganization({
            organization: TestOrganization.VETTOR_BPO,
        }),
        [TestOrganization.RESERVA_STORE_42]: buildClerkOrganization({
            organization: TestOrganization.RESERVA_STORE_42,
        }),
        [TestOrganization.CHILLIBEANS_STORE_312]: buildClerkOrganization({
            organization: TestOrganization.CHILLIBEANS_STORE_312,
        }),
        [TestOrganization.NAGUMO_SUPERMERCADOS]: buildClerkOrganization({
            organization: TestOrganization.NAGUMO_SUPERMERCADOS,
        }),
        [TestOrganization.NAGUMO_STORE_123]: buildClerkOrganization({
            organization: TestOrganization.NAGUMO_STORE_123,
        }),
        [TestOrganization.NAGUMO_STORE_321]: buildClerkOrganization({
            organization: TestOrganization.NAGUMO_STORE_321,
        }),
    };
    const clerkOrganizations = {
        [TestOrganization.AMBEV]: {
            ...plainClerkOrganizations[TestOrganization.AMBEV],
            publicMetadata: {
                type: 'LEAF',
            },
        },
        [TestOrganization.EMBRAER]: {
            ...plainClerkOrganizations[TestOrganization.EMBRAER],
            publicMetadata: {
                type: 'LEAF',
            },
        },
        [TestOrganization.VETTOR_BPO]: {
            ...plainClerkOrganizations[TestOrganization.VETTOR_BPO],
            publicMetadata: {
                type: 'GROUP',
                children: [
                    plainClerkOrganizations[TestOrganization.RESERVA_STORE_42].id,
                    plainClerkOrganizations[TestOrganization.CHILLIBEANS_STORE_312].id,
                ],
                sharedContacts: false,
                sharedSubcategories: false,
                sharedTags: false,
            },
        },
        [TestOrganization.RESERVA_STORE_42]: {
            ...plainClerkOrganizations[TestOrganization.RESERVA_STORE_42],
            publicMetadata: {
                type: 'LEAF',
                parent: plainClerkOrganizations[TestOrganization.VETTOR_BPO].id,
            },
        },
        [TestOrganization.CHILLIBEANS_STORE_312]: {
            ...plainClerkOrganizations[TestOrganization.CHILLIBEANS_STORE_312],
            publicMetadata: {
                type: 'LEAF',
                parent: plainClerkOrganizations[TestOrganization.VETTOR_BPO].id,
            },
        },
        [TestOrganization.NAGUMO_SUPERMERCADOS]: {
            ...plainClerkOrganizations[TestOrganization.NAGUMO_SUPERMERCADOS],
            publicMetadata: {
                type: 'GROUP',
                children: [
                    plainClerkOrganizations[TestOrganization.NAGUMO_STORE_123].id,
                    plainClerkOrganizations[TestOrganization.NAGUMO_STORE_321].id,
                ],
                sharedContacts: true,
                sharedSubcategories: true,
                sharedTags: true,
            },
        },
        [TestOrganization.NAGUMO_STORE_123]: {
            ...plainClerkOrganizations[TestOrganization.NAGUMO_STORE_123],
            publicMetadata: {
                type: 'LEAF',
                parent: plainClerkOrganizations[TestOrganization.NAGUMO_SUPERMERCADOS].id,
            },
        },
        [TestOrganization.NAGUMO_STORE_321]: {
            ...plainClerkOrganizations[TestOrganization.NAGUMO_STORE_321],
            publicMetadata: {
                type: 'LEAF',
                parent: plainClerkOrganizations[TestOrganization.NAGUMO_SUPERMERCADOS].id,
            },
        },
    };
    return {
        verifyToken: jest.fn().mockImplementation((token) => {
            const [user, organization] = processToken(token);
            if (organization) {
                const clerkUser = clerkUsers[user];
                const clerkOrganization = clerkOrganizations[organization];
                return {
                    sub: clerkUser.id,
                    org_id: clerkOrganization.id,
                    org_role: memberUsers.includes(user) ? 'org:member' : 'org:admin',
                };
            }
            else {
                const clerkUser = clerkUsers[user];
                return {
                    sub: clerkUser.id,
                    org_id: undefined,
                    org_role: undefined,
                };
            }
        }),
        users: {
            getUser: jest.fn().mockImplementation((userId) => {
                return Object.values(clerkUsers).find((user) => user.id === userId);
            }),
        },
        organizations: {
            getOrganization: jest
                .fn()
                .mockImplementation(({ organizationId }) => {
                return Object.values(clerkOrganizations).find((organization) => organization.id === organizationId);
            }),
        },
    };
};
exports.buildClerkClientMock = buildClerkClientMock;
//# sourceMappingURL=clerk.utils.js.map