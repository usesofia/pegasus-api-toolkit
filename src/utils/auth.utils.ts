import { AuthUserEntity } from "@app/auth/entities/auth-user.entity";
import { GCP_SERVICE_ACCOUNT_TOKEN_FOR_TESTS } from "@app/auth/guards/gcp-service-account.guard";
import { ClerkClientMockSubset } from "@app/utils/clerk.utils";

export const buildAuthServiceMock = ({
  clerkClientMock,
}: {
  clerkClientMock: ClerkClientMockSubset;
}) => {
  return {
    generateGcpServiceAccountToken: jest.fn().mockResolvedValue(GCP_SERVICE_ACCOUNT_TOKEN_FOR_TESTS),
    verifyToken: clerkClientMock.verifyToken,
    getUser: ({
      userId,
      organizationId,
    }: {
      userId: string;
      organizationId?: string;
      organizationRole?: string;
      ignoreCache?: boolean;
    }): Promise<AuthUserEntity> => {
      const clerkUser = Object.values(clerkClientMock._clerkUsers).find((user) => user.id === userId);

      if (!clerkUser) {
        throw new Error(`User ${userId} not found.`);
      }

      const testUserKey = Object.entries(clerkClientMock._clerkUsers).find(([, value]) => value.id === userId)?.[0];

      if (!testUserKey) {
        throw new Error(`User ${userId} not found.`);
      }

      if(organizationId) {
        const clerkOrganization = Object.values(clerkClientMock._clerkOrganizations).find((organization) => organization.id === organizationId);

        if (!clerkOrganization) {
          throw new Error(`Organization ${organizationId} not found.`);
        }

        const testOrganizationKey = Object.entries(clerkClientMock._clerkOrganizations).find(([, value]) => value.id === organizationId)?.[0];

        if (!testOrganizationKey) {
          throw new Error(`Organization ${organizationId} not found.`);
        }

        return Promise.resolve(clerkClientMock.getAuthUserEntity({ token: `${testUserKey}:${testOrganizationKey}` }));
      } else {
        return Promise.resolve(clerkClientMock.getAuthUserEntity({ token: testUserKey }));
      }
    },
  };
};
