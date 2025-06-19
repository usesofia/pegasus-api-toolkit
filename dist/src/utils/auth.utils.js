"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildAuthServiceMock = void 0;
const gcp_service_account_guard_1 = require("../auth/guards/gcp-service-account.guard");
const buildAuthServiceMock = ({ clerkClientMock, }) => {
    return {
        generateGcpServiceAccountToken: jest
            .fn()
            .mockResolvedValue(gcp_service_account_guard_1.GCP_SERVICE_ACCOUNT_TOKEN_FOR_TESTS),
        verifyToken: clerkClientMock.verifyToken,
        getUser: ({ userId, organizationId, }) => {
            const clerkUser = Object.values(clerkClientMock._clerkUsers).find((user) => user.id === userId);
            if (!clerkUser) {
                throw new Error(`User ${userId} not found.`);
            }
            const testUserKey = Object.entries(clerkClientMock._clerkUsers).find(([, value]) => value.id === userId)?.[0];
            if (!testUserKey) {
                throw new Error(`User ${userId} not found.`);
            }
            if (organizationId) {
                const clerkOrganization = Object.values(clerkClientMock._clerkOrganizations).find((organization) => organization.id === organizationId);
                if (!clerkOrganization) {
                    throw new Error(`Organization ${organizationId} not found.`);
                }
                const testOrganizationKey = Object.entries(clerkClientMock._clerkOrganizations).find(([, value]) => value.id === organizationId)?.[0];
                if (!testOrganizationKey) {
                    throw new Error(`Organization ${organizationId} not found.`);
                }
                return Promise.resolve(clerkClientMock.getAuthUserEntity({
                    token: `${testUserKey}:${testOrganizationKey}`,
                }));
            }
            else {
                return Promise.resolve(clerkClientMock.getAuthUserEntity({ token: testUserKey }));
            }
        },
    };
};
exports.buildAuthServiceMock = buildAuthServiceMock;
//# sourceMappingURL=auth.utils.js.map