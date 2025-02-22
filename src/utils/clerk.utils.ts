import { User, Organization } from '@clerk/backend';
import { faker } from '@faker-js/faker';
import { v4 } from 'uuid';

export enum TestOrganization {
    AMBEV = 'AMBEV',
    EMBRAER = 'EMBRAER',
    VETTOR_BPO = 'VETTOR_BPO',
    RESERVA_STORE_42 = 'RESERVA_STORE_42',
    CHILLIBEANS_STORE_312 = 'CHILLIBEANS_STORE_312',
    NAGUMO_SUPERMERCADOS = 'NAGUMO_SUPERMERCADOS',
    NAGUMO_STORE_123 = 'NAGUMO_STORE_123',
    NAGUMO_STORE_321 = 'NAGUMO_STORE_321',
}

export enum TestUser {
    JOAO = 'JOAO',
    JOANA = 'JOANA',
    JULIANA = 'JULIANA',
    MARIA = 'MARIA',
    LUCAS = 'LUCAS',
    RONALDO = 'RONALDO',
    RONY = 'RONY',
    CAITO = 'CAITO',
    DANIEL = 'DANIEL',
    RENATA = 'RENATA',
    FERNANDA = 'FERNANDA',
}

const memberUsers = [
    TestUser.JOANA,
];

const processToken = (token: string): [TestUser, TestOrganization | undefined] => {
    const splitedToken = token.split(':');

    if (splitedToken.length === 1) {
        const user = TestUser[splitedToken[0] as keyof typeof TestUser];
        return [user, undefined];
    } else if (splitedToken.length === 2) {
        const user = TestUser[splitedToken[0] as keyof typeof TestUser];
        const organization = TestOrganization[splitedToken[1] as keyof typeof TestOrganization];

        switch (organization) {
            case TestOrganization.AMBEV:
                if (user !== TestUser.JOAO && user !== TestUser.JOANA && user !== TestUser.JULIANA) {
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
                throw new Error(`Invalid organization ${organization}.`);
        }

        return [user, organization];
    } else {
        throw new Error(`Invalid token ${token}.`);
    }

}

const buildClerkUser = ({
    user,
}: {
    user: TestUser;
}) => {
    const userId = v4();

    const emailAddresses = [
        {
            id: v4(),
            emailAddress: `${user.toString().toLowerCase()}-${userId}@example.com`,
            linkedTo: [],
            verification: null
        }
    ]

    const phoneNumbers = [
        {
            id: v4(),
            phoneNumber: faker.phone.number(),
            linkedTo: [],
            verification: null,
            reservedForSecondFactor: false,
            defaultSecondFactor: false
        }
    ]


    const firstName = user.toString().charAt(0).toUpperCase() + user.toString().slice(1);
    const lastName = faker.person.lastName();

    const clerkUser: User = {
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
        primaryWeb3WalletId: v4(),
        lastSignInAt: 1713542400,
        externalId: v4(),
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
        primaryWeb3Wallet: null
    }

    return clerkUser;
}

const buildClerkOrganization = ({
    organization,
}: {
    organization: TestOrganization;
}) => {
    const organizationId = v4();

    const clerkOrganization: Organization = {
        id: organizationId,
        name: organization.toString().charAt(0).toUpperCase() + organization.toString().slice(1),
        slug: organization.toString().toLowerCase() + '-' + organizationId,
        imageUrl: 'https://example.com/image.png',
        hasImage: true,
        createdAt: 1713542400,
        updatedAt: 1713542400,
        publicMetadata: {},
        privateMetadata: {},
        maxAllowedMemberships: 100,
        adminDeleteEnabled: true
    }

    return clerkOrganization;
}

export const buildClerkClientMock = () => {
    const clerkUsers: Record<TestUser, User> = {
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
    }

    const plainClerkOrganizations: Record<TestOrganization, Organization> = {
        [TestOrganization.AMBEV]: buildClerkOrganization({ organization: TestOrganization.AMBEV }),
        [TestOrganization.EMBRAER]: buildClerkOrganization({ organization: TestOrganization.EMBRAER }),
        [TestOrganization.VETTOR_BPO]: buildClerkOrganization({ organization: TestOrganization.VETTOR_BPO }),
        [TestOrganization.RESERVA_STORE_42]: buildClerkOrganization({ organization: TestOrganization.RESERVA_STORE_42 }),
        [TestOrganization.CHILLIBEANS_STORE_312]: buildClerkOrganization({ organization: TestOrganization.CHILLIBEANS_STORE_312 }),
        [TestOrganization.NAGUMO_SUPERMERCADOS]: buildClerkOrganization({ organization: TestOrganization.NAGUMO_SUPERMERCADOS }),
        [TestOrganization.NAGUMO_STORE_123]: buildClerkOrganization({ organization: TestOrganization.NAGUMO_STORE_123 }),
        [TestOrganization.NAGUMO_STORE_321]: buildClerkOrganization({ organization: TestOrganization.NAGUMO_STORE_321 }),
    }

    const clerkOrganizations: Record<TestOrganization, Organization> = {
        [TestOrganization.AMBEV]: {
            ...plainClerkOrganizations[TestOrganization.AMBEV],
            publicMetadata: {
                type: 'LEAF'
            }
        },
        [TestOrganization.EMBRAER]: {
            ...plainClerkOrganizations[TestOrganization.EMBRAER],
            publicMetadata: {
                type: 'LEAF'
            }
        },
        [TestOrganization.VETTOR_BPO]: {
            ...plainClerkOrganizations[TestOrganization.VETTOR_BPO],
            publicMetadata: {
                type: 'GROUP',
                children: [
                    plainClerkOrganizations[TestOrganization.RESERVA_STORE_42].id,
                    plainClerkOrganizations[TestOrganization.CHILLIBEANS_STORE_312].id,
                ]
            }
        },
        [TestOrganization.RESERVA_STORE_42]: {
            ...plainClerkOrganizations[TestOrganization.RESERVA_STORE_42],
            publicMetadata: {
                type: 'LEAF',
                parent: plainClerkOrganizations[TestOrganization.VETTOR_BPO].id,
            }
        },
        [TestOrganization.CHILLIBEANS_STORE_312]: {
            ...plainClerkOrganizations[TestOrganization.CHILLIBEANS_STORE_312],
            publicMetadata: {
                type: 'LEAF',
                parent: plainClerkOrganizations[TestOrganization.VETTOR_BPO].id,
            }
        },
        [TestOrganization.NAGUMO_SUPERMERCADOS]: {
            ...plainClerkOrganizations[TestOrganization.NAGUMO_SUPERMERCADOS],
            publicMetadata: {
                type: 'GROUP',
                children: [
                    plainClerkOrganizations[TestOrganization.NAGUMO_STORE_123].id,
                    plainClerkOrganizations[TestOrganization.NAGUMO_STORE_321].id,
                ]
            }
        },
        [TestOrganization.NAGUMO_STORE_123]: {
            ...plainClerkOrganizations[TestOrganization.NAGUMO_STORE_123],
            publicMetadata: {
                type: 'LEAF',
                parent: plainClerkOrganizations[TestOrganization.NAGUMO_SUPERMERCADOS].id,
            }
        },
        [TestOrganization.NAGUMO_STORE_321]: {
            ...plainClerkOrganizations[TestOrganization.NAGUMO_STORE_321],
            publicMetadata: {
                type: 'LEAF',
                parent: plainClerkOrganizations[TestOrganization.NAGUMO_SUPERMERCADOS].id,
            }
        }
    };

    return {
        verifyToken: jest.fn().mockImplementation((token: string) => {
            const [user, organization] = processToken(token);

            if (organization) {
                const clerkUser = clerkUsers[user];
                const clerkOrganization = clerkOrganizations[organization];

                return {
                    sub: clerkUser.id,
                    org_id: clerkOrganization.id,
                    org_role: memberUsers.includes(user) ? 'org:member' : 'org:admin',
                }
            } else {
                const clerkUser = clerkUsers[user];

                return {
                    sub: clerkUser.id,
                    org_id: undefined,
                    org_role: undefined,
                }
            }
        }),
        users: {
            getUser: jest.fn().mockImplementation((userId: string) => {
                return Object.values(clerkUsers).find((user) => user.id === userId);
            }),
        },
        organizations: {
            getOrganization: jest.fn().mockImplementation(({ organizationId }: { organizationId: string }) => {
                return Object.values(clerkOrganizations).find((organization) => organization.id === organizationId);
            }),
        },
    }
}
