import { AuthUserEntity } from "../auth/entities/auth-user.entity";
import { ClerkClientMockSubset } from "../utils/clerk.utils";
export declare const buildAuthServiceMock: ({ clerkClientMock, }: {
    clerkClientMock: ClerkClientMockSubset;
}) => {
    generateGcpServiceAccountToken: jest.Mock<any, any, any>;
    verifyToken: ({ token }: {
        token: string;
    }) => {
        sub: string;
        org_id: string | undefined;
        org_role: "org:member" | "org:admin" | undefined;
    };
    getUser: ({ userId, organizationId, }: {
        userId: string;
        organizationId?: string;
        organizationRole?: string;
        ignoreCache?: boolean;
    }) => Promise<AuthUserEntity>;
};
