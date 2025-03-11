import { User, Organization, OrganizationInvitation, OrganizationMembershipRole, OrganizationMembership } from '@clerk/backend';
import { PaginatedResourceResponse } from '@clerk/backend/dist/api/resources/Deserializer';
import { faker } from '@faker-js/faker';
import { DateTime } from 'luxon';
import { v4 } from 'uuid';
import { cnpj } from 'cpf-cnpj-validator';

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
  PEDRO = 'PEDRO',
  MANOEL = 'MANOEL',
  PELE = 'PELE',
}

const memberUsers = [TestUser.JOANA];

const processToken = (
  token: string,
): [TestUser, TestOrganization | undefined] => {
  const splitedToken = token.split(':');

  if (splitedToken.length === 1) {
    const user = TestUser[splitedToken[0] as keyof typeof TestUser];
    return [user, undefined];
  } else if (splitedToken.length === 2) {
    const user = TestUser[splitedToken[0] as keyof typeof TestUser];
    const organization =
      TestOrganization[splitedToken[1] as keyof typeof TestOrganization];

    switch (organization) {
      case TestOrganization.AMBEV:
        if (
          user !== TestUser.JOAO &&
          user !== TestUser.JOANA &&
          user !== TestUser.JULIANA
        ) {
          throw new Error(
            `Invalid user ${user} for organization ${organization}.`,
          );
        }
        break;

      case TestOrganization.EMBRAER:
        if (user !== TestUser.MARIA && user !== TestUser.JULIANA && user !== TestUser.PELE) {
          throw new Error(
            `Invalid user ${user} for organization ${organization}.`,
          );
        }
        break;

      case TestOrganization.VETTOR_BPO:
        if (user !== TestUser.LUCAS && user !== TestUser.RONALDO) {
          throw new Error(
            `Invalid user ${user} for organization ${organization}.`,
          );
        }
        break;

      case TestOrganization.RESERVA_STORE_42:
        if (user !== TestUser.RONY) {
          throw new Error(
            `Invalid user ${user} for organization ${organization}.`,
          );
        }
        break;

      case TestOrganization.CHILLIBEANS_STORE_312:
        if (user !== TestUser.CAITO) {
          throw new Error(
            `Invalid user ${user} for organization ${organization}.`,
          );
        }
        break;

      case TestOrganization.NAGUMO_SUPERMERCADOS:
        if (user !== TestUser.DANIEL && user !== TestUser.RONALDO && user !== TestUser.MANOEL) {
          throw new Error(
            `Invalid user ${user} for organization ${organization}.`,
          );
        }
        break;

      case TestOrganization.NAGUMO_STORE_123:
        if (user !== TestUser.RENATA && user !== TestUser.MANOEL) {
          throw new Error(
            `Invalid user ${user} for organization ${organization}.`,
          );
        }
        break;

      case TestOrganization.NAGUMO_STORE_321:
        if (user !== TestUser.FERNANDA && user !== TestUser.MANOEL) {
          throw new Error(
            `Invalid user ${user} for organization ${organization}.`,
          );
        }
        break;
      default:
        throw new Error(`Invalid organization ${String(organization)}.`);
    }

    return [user, organization];
  } else {
    throw new Error(`Invalid token ${token}.`);
  }
};

const buildClerkUser = ({ user }: { user: TestUser }) => {
  const userId = v4();

  const emailAddresses = [
    {
      id: v4(),
      emailAddress: `${user.toString().toLowerCase()}-${userId}@example.com`,
      linkedTo: [],
      verification: null,
    },
  ];

  const phoneNumbers = [
    {
      id: v4(),
      phoneNumber: faker.phone.number(),
      linkedTo: [],
      verification: null,
      reservedForSecondFactor: false,
      defaultSecondFactor: false,
    },
  ];

  const firstName =
    user.toString().charAt(0).toUpperCase() + user.toString().slice(1);
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
    primaryWeb3Wallet: null,
  };

  return clerkUser;
};

const buildClerkOrganization = ({
  organization,
}: {
  organization: TestOrganization;
}) => {
  const organizationId = v4();

  const clerkOrganization: Organization = {
    id: organizationId,
    name:
      organization.toString().charAt(0).toUpperCase() +
      organization.toString().slice(1),
    slug: organization.toString().toLowerCase().replaceAll(/[^a-z0-9]/g, '-') + '-' + organizationId,
    imageUrl: 'https://example.com/image.png',
    hasImage: true,
    createdAt: DateTime.now().toMillis(),
    updatedAt: DateTime.now().toMillis(),
    publicMetadata: {
      document: cnpj.generate().replaceAll(/[^\d]/g, ''),
    },
    privateMetadata: {},
    maxAllowedMemberships: 100,
    adminDeleteEnabled: true,
  };

  return clerkOrganization;
};

const buildClerkOrganizationMembership = ({
  clerkUser,
  clerkOrganization,
  role,
}: {
  clerkUser: User;
  clerkOrganization: Organization;
  role: OrganizationMembershipRole;
}) => {
  const organizationMembership: OrganizationMembership = {
    id: v4(),
    role,
    permissions: [],
    publicMetadata: {},
    privateMetadata: {},
    createdAt: DateTime.now().toMillis(),
    updatedAt: DateTime.now().toMillis(),
    organization: clerkOrganization,
    publicUserData: {
      identifier: clerkUser.primaryEmailAddress?.emailAddress ?? '',
      firstName: clerkUser.firstName,
      lastName: clerkUser.lastName,
      imageUrl: clerkUser.imageUrl,
      hasImage: clerkUser.hasImage,
      userId: clerkUser.id,
    },
  };

  return organizationMembership;
};

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
    [TestUser.PEDRO]: buildClerkUser({ user: TestUser.PEDRO }),
    [TestUser.MANOEL]: buildClerkUser({ user: TestUser.MANOEL }),
    [TestUser.PELE]: buildClerkUser({ user: TestUser.PELE }),
  };

  const plainClerkOrganizations: Record<TestOrganization, Organization> = {
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

  const clerkOrganizations: Record<TestOrganization, Organization> = {
    [TestOrganization.AMBEV]: {
      ...plainClerkOrganizations[TestOrganization.AMBEV],
      publicMetadata: {
        ...plainClerkOrganizations[TestOrganization.AMBEV].publicMetadata,
        type: 'LEAF',
      },
    },
    [TestOrganization.EMBRAER]: {
      ...plainClerkOrganizations[TestOrganization.EMBRAER],
      publicMetadata: {
        ...plainClerkOrganizations[TestOrganization.EMBRAER].publicMetadata,
        type: 'LEAF',
      },
    },
    [TestOrganization.VETTOR_BPO]: {
      ...plainClerkOrganizations[TestOrganization.VETTOR_BPO],
      publicMetadata: {
        ...plainClerkOrganizations[TestOrganization.VETTOR_BPO].publicMetadata,
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
        ...plainClerkOrganizations[TestOrganization.RESERVA_STORE_42].publicMetadata,
        type: 'LEAF',
        parent: plainClerkOrganizations[TestOrganization.VETTOR_BPO].id,
      },
    },
    [TestOrganization.CHILLIBEANS_STORE_312]: {
      ...plainClerkOrganizations[TestOrganization.CHILLIBEANS_STORE_312],
      publicMetadata: {
        ...plainClerkOrganizations[TestOrganization.CHILLIBEANS_STORE_312].publicMetadata,
        type: 'LEAF',
        parent: plainClerkOrganizations[TestOrganization.VETTOR_BPO].id,
      },
    },
    [TestOrganization.NAGUMO_SUPERMERCADOS]: {
      ...plainClerkOrganizations[TestOrganization.NAGUMO_SUPERMERCADOS],
      publicMetadata: {
        ...plainClerkOrganizations[TestOrganization.NAGUMO_SUPERMERCADOS].publicMetadata,
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
        ...plainClerkOrganizations[TestOrganization.NAGUMO_STORE_123].publicMetadata,
        type: 'LEAF',
        parent:
          plainClerkOrganizations[TestOrganization.NAGUMO_SUPERMERCADOS].id,
      },
    },
    [TestOrganization.NAGUMO_STORE_321]: {
      ...plainClerkOrganizations[TestOrganization.NAGUMO_STORE_321],
      publicMetadata: {
        ...plainClerkOrganizations[TestOrganization.NAGUMO_STORE_321].publicMetadata,
        type: 'LEAF',
        parent:
          plainClerkOrganizations[TestOrganization.NAGUMO_SUPERMERCADOS].id,
      },
    },
  };

  const clerkMemberships: OrganizationMembership[] = [
    buildClerkOrganizationMembership({
      clerkUser: clerkUsers[TestUser.JOAO],
      clerkOrganization: clerkOrganizations[TestOrganization.AMBEV],
      role: 'org:admin',
    }),
    buildClerkOrganizationMembership({
      clerkUser: clerkUsers[TestUser.JOANA],
      clerkOrganization: clerkOrganizations[TestOrganization.AMBEV],
      role: 'org:member',
    }),
    buildClerkOrganizationMembership({
      clerkUser: clerkUsers[TestUser.JULIANA],
      clerkOrganization: clerkOrganizations[TestOrganization.AMBEV],
      role: 'org:admin',
    }),
    buildClerkOrganizationMembership({
      clerkUser: clerkUsers[TestUser.MARIA],
      clerkOrganization: clerkOrganizations[TestOrganization.EMBRAER],
      role: 'org:admin',
    }),
    buildClerkOrganizationMembership({
      clerkUser: clerkUsers[TestUser.JULIANA],
      clerkOrganization: clerkOrganizations[TestOrganization.EMBRAER],
      role: 'org:admin',
    }),
    buildClerkOrganizationMembership({
      clerkUser: clerkUsers[TestUser.LUCAS],
      clerkOrganization: clerkOrganizations[TestOrganization.VETTOR_BPO],
      role: 'org:admin',
    }),
    buildClerkOrganizationMembership({
      clerkUser: clerkUsers[TestUser.RONALDO],
      clerkOrganization: clerkOrganizations[TestOrganization.VETTOR_BPO],
      role: 'org:admin',
    }),
    buildClerkOrganizationMembership({
      clerkUser: clerkUsers[TestUser.RONY],
      clerkOrganization: clerkOrganizations[TestOrganization.RESERVA_STORE_42],
      role: 'org:admin',
    }),
    buildClerkOrganizationMembership({
      clerkUser: clerkUsers[TestUser.CAITO],
      clerkOrganization: clerkOrganizations[TestOrganization.CHILLIBEANS_STORE_312],
      role: 'org:admin',
    }),
    buildClerkOrganizationMembership({
      clerkUser: clerkUsers[TestUser.DANIEL],
      clerkOrganization: clerkOrganizations[TestOrganization.NAGUMO_SUPERMERCADOS],
      role: 'org:admin',
    }),
    buildClerkOrganizationMembership({
      clerkUser: clerkUsers[TestUser.RONALDO],
      clerkOrganization: clerkOrganizations[TestOrganization.NAGUMO_SUPERMERCADOS],
      role: 'org:admin',
    }),
    buildClerkOrganizationMembership({
      clerkUser: clerkUsers[TestUser.RENATA],
      clerkOrganization: clerkOrganizations[TestOrganization.NAGUMO_STORE_123],
      role: 'org:admin',
    }),
    buildClerkOrganizationMembership({
      clerkUser: clerkUsers[TestUser.FERNANDA],
      clerkOrganization: clerkOrganizations[TestOrganization.NAGUMO_STORE_321],
      role: 'org:admin',
    }),
    buildClerkOrganizationMembership({
      clerkUser: clerkUsers[TestUser.MANOEL],
      clerkOrganization: clerkOrganizations[TestOrganization.NAGUMO_SUPERMERCADOS],
      role: 'org:admin',
    }),
    buildClerkOrganizationMembership({
      clerkUser: clerkUsers[TestUser.MANOEL],
      clerkOrganization: clerkOrganizations[TestOrganization.NAGUMO_STORE_123],
      role: 'org:admin',
    }),
    buildClerkOrganizationMembership({
      clerkUser: clerkUsers[TestUser.MANOEL],
      clerkOrganization: clerkOrganizations[TestOrganization.NAGUMO_STORE_321],
      role: 'org:admin',
    }),
    buildClerkOrganizationMembership({
      clerkUser: clerkUsers[TestUser.PELE],
      clerkOrganization: clerkOrganizations[TestOrganization.EMBRAER],
      role: 'org:admin',
    }),
  ];

  const clerkInvitesByOrganization: Record<string, OrganizationInvitation[]> = {};

  const newClerkOrganizations: Organization[] = [];

  return {
    _clerkUsers: clerkUsers,
    _clerkOrganizations: clerkOrganizations,
    _clerkMemberships: clerkMemberships,
    _clerkInvitesByOrganization: clerkInvitesByOrganization,
    _newClerkOrganizations: newClerkOrganizations,
    verifyToken: jest.fn().mockImplementation(
      (
        token: string,
      ): {
        sub: string;
        org_id: string | undefined;
        org_role: 'org:member' | 'org:admin' | undefined;
      } => {
        const [user, organization] = processToken(token);

        if (organization) {
          const clerkUser = clerkUsers[user];
          const clerkOrganization = clerkOrganizations[organization];

          return {
            sub: clerkUser.id,
            org_id: clerkOrganization.id,
            org_role: memberUsers.includes(user) ? 'org:member' : 'org:admin',
          };
        } else {
          const clerkUser = clerkUsers[user];

          return {
            sub: clerkUser.id,
            org_id: undefined,
            org_role: undefined,
          };
        }
      },
    ),
    users: {
      getUser: jest.fn().mockImplementation((userId: string) => {
        return Object.values(clerkUsers).find((user) => user.id === userId);
      }),
      getOrganizationMembershipList: jest.fn().mockImplementation(({
        userId,
        limit = 100,
        offset = 0,
      }: {
        userId: string;
        limit?: number;
        offset?: number;
      }): PaginatedResourceResponse<OrganizationMembership[]> => {
        const memberships = clerkMemberships.filter((membership) => membership.publicUserData?.userId === userId);

        const paginatedMemberships = memberships.slice(offset, offset + limit);

        return {
          data: paginatedMemberships,
          totalCount: memberships.length,
        };
      }),
    },
    organizations: {
      createOrganizationInvitation: jest.fn().mockImplementation(({
          organizationId,
          emailAddress,
          role,
          publicMetadata,
        }: {
          organizationId: string;
          emailAddress: string;
          role: OrganizationMembershipRole;
          publicMetadata?: OrganizationInvitationPublicMetadata;
        }): OrganizationInvitation => {
          const invite = {
            id: v4(),
            emailAddress,
            role,
            organizationId,
            createdAt: DateTime.now().toMillis(),
            updatedAt: DateTime.now().toMillis(),
            status: 'pending',
            publicMetadata: publicMetadata ?? {},
            privateMetadata: {},
          } as OrganizationInvitation;

          if (!(organizationId in clerkInvitesByOrganization)) {
            clerkInvitesByOrganization[organizationId] = [];
          }

          if(clerkInvitesByOrganization[organizationId].find((invite) => invite.emailAddress === emailAddress)) {
            throw new Error(`Already invited ${emailAddress} to ${organizationId}.`);
          }

          clerkInvitesByOrganization[organizationId].push(invite);

          return invite;
      }),
      getOrganizationMembershipList: jest.fn().mockImplementation(({
        organizationId,
        limit = 100,
        offset = 0,
      }: {
        organizationId: string;
        limit?: number;
        offset?: number;
      }): PaginatedResourceResponse<OrganizationMembership[]> => {
        const memberships = clerkMemberships.filter(
          (membership) => membership.organization.id === organizationId
        );
        
        const paginatedMemberships = memberships.slice(offset, offset + limit);
        
        return {
          data: paginatedMemberships,
          totalCount: memberships.length,
        };
      }),
      getOrganizationInvitationList: jest.fn().mockImplementation(({
        organizationId,
        limit = 100,
        offset = 0,
      }: {
        organizationId: string;
        limit?: number;
        offset?: number;
      }): PaginatedResourceResponse<OrganizationInvitation[]> => {
        const invitations = clerkInvitesByOrganization[organizationId] ?? [];

        const paginatedInvitations = invitations.slice(offset, offset + limit);

        return {
          data: paginatedInvitations,
          totalCount: invitations.length,
        };
      }),
      updateOrganizationMembership: jest.fn().mockImplementation(({
        organizationId,
        userId,
        role,
      }: {
        organizationId: string;
        userId: string;
        role: OrganizationMembershipRole;
      }): OrganizationMembership => {
        const membership = clerkMemberships.find((membership) => membership.organization.id === organizationId && membership.publicUserData?.userId === userId);

        if (!membership) {
          throw new Error(`Membership not found for ${userId} in ${organizationId}.`);
        }

        const newMembership = {
          ...membership,
          role,
        };

        const index = clerkMemberships.indexOf(membership);

        clerkMemberships[index] = newMembership;

        return newMembership;
      }),
      deleteOrganizationMembership: jest.fn().mockImplementation(({
        organizationId,
        userId,
      }: {
        organizationId: string;
        userId: string;
      }): void => {
        const membership = clerkMemberships.find((membership) => membership.organization.id === organizationId && membership.publicUserData?.userId === userId);

        if (!membership) {
          throw new Error(`Membership not found for ${userId} in ${organizationId}.`);
        }

        const index = clerkMemberships.indexOf(membership);

        clerkMemberships.splice(index, 1);
      }),
      revokeOrganizationInvitation: jest.fn().mockImplementation(({
        organizationId,
        invitationId,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        requestingUserId,
      }: {
        organizationId: string;
        invitationId: string;
        requestingUserId: string;
      }): OrganizationInvitation => {
        const invite = clerkInvitesByOrganization[organizationId].find((invite) => invite.id === invitationId);

        if (!invite) {
          throw new Error(`Invitation not found for ${invitationId} in ${organizationId}.`);
        }

        if(invite.status !== 'pending') {
          throw new Error(`Invitation is not pending for ${invitationId} in ${organizationId}.`);
        }

        const newInvite = {
          ...invite,
          status: 'revoked',
        } as OrganizationInvitation;

        const organizationInvitations = clerkInvitesByOrganization[organizationId] ?? [];

        const index = organizationInvitations.indexOf(invite);

        organizationInvitations[index] = newInvite;

        clerkInvitesByOrganization[organizationId] = organizationInvitations;

        return newInvite;
      }),
      createOrganization: jest.fn().mockImplementation(({
        name,
        createdBy,
        slug,
        publicMetadata,
      }: {
        name: string;
        createdBy: string;
        slug: string;
        publicMetadata?: OrganizationPublicMetadata;
      }): Organization => {
        const organization = {
          id: v4(),
          name,
          slug,
          createdBy,
          imageUrl: 'https://example.com/image.png',
          createdAt: DateTime.now().toMillis(),
          updatedAt: DateTime.now().toMillis(),
          publicMetadata: publicMetadata ?? {},
          privateMetadata: {},
          maxAllowedMemberships: 100,
          adminDeleteEnabled: false,
        } as Organization;

        const organizationCandidateWithSameSlug = [...newClerkOrganizations, ...Object.values(clerkOrganizations)].find((organization) => organization.slug === slug);

        if (organizationCandidateWithSameSlug) {
          throw new Error(`Organization with slug ${slug} already exists.`);
        }

        newClerkOrganizations.push(organization);

        return organization;
      }),
      getOrganization: jest.fn().mockImplementation(({
        organizationId,
      }: {
        organizationId: string;
      }): Organization => {
        const organization = [...newClerkOrganizations, ...Object.values(clerkOrganizations)].find((organization) => organization.id === organizationId);

        if (!organization) {
          throw new Error(`Organization not found for ${organizationId}.`);
        }

        return organization;
      }),
      updateOrganization: jest.fn().mockImplementation((
        organizationId: string,
        {
          name,
          slug,
          publicMetadata,
          privateMetadata,
        }: {
          name?: string;
          slug?: string;
          publicMetadata?: OrganizationPublicMetadata;
          privateMetadata?: OrganizationPrivateMetadata;
        }
      ) => {
        const organization = [...newClerkOrganizations, ...Object.values(clerkOrganizations)].find((organization) => organization.id === organizationId);

        const isNewOrganization = !!newClerkOrganizations.find((organization) => organization.id === organizationId);

        if (!organization) {
          throw new Error(`Organization not found for ${organizationId}.`);
        }

        const newOrganization = {
          ...organization,
          name: name ?? organization.name,
          slug: slug ?? organization.slug,
          publicMetadata: publicMetadata ?? organization.publicMetadata,
          privateMetadata: privateMetadata ?? organization.privateMetadata,
        } as Organization;

        if (isNewOrganization) {  
          const index = newClerkOrganizations.indexOf(organization);
          newClerkOrganizations[index] = newOrganization;
        } else {
          const testOrganizationKey = Object.keys(TestOrganization).find((testOrganizationKey) => clerkOrganizations[testOrganizationKey as TestOrganization].id === organizationId);

          if (!testOrganizationKey) {
            throw new Error(`Organization not found for ${organizationId}.`);
          }

          clerkOrganizations[testOrganizationKey as TestOrganization] = newOrganization;
        }

        return newOrganization;
      }),
      updateOrganizationLogo: jest.fn().mockImplementation((
        organizationId: string, {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        file,
      }: {
        file: File;
      }): Organization => {
        const organization = [...newClerkOrganizations, ...Object.values(clerkOrganizations)].find((organization) => organization.id === organizationId);

        if (!organization) {
          throw new Error(`Organization not found for ${organizationId}.`);
        }

        const newOrganization = {
          ...organization,
          imageUrl: `https://example.com/image.png`,
        } as Organization;

        return newOrganization;
      }),
      deleteOrganization: jest.fn(),
      getOrganizationList: jest.fn().mockImplementation(({
        query,
        limit = 100,
        offset = 0,
      }: {
        query?: string;
        limit?: number;
        offset?: number;
      }): PaginatedResourceResponse<Organization[]> => {
        const organizations = [...newClerkOrganizations, ...Object.values(clerkOrganizations)];

        let filteredOrganizations = organizations;

        if (query) {
          filteredOrganizations = organizations.filter((organization) => organization.slug?.toLowerCase().includes(query.toLowerCase()));
        }

        const paginatedOrganizations = filteredOrganizations.slice(offset, offset + limit);

        return {
          data: paginatedOrganizations,
          totalCount: filteredOrganizations.length,
        };
      }),
      deleteOrganizationLogo: jest.fn(),
    },
  };
};
