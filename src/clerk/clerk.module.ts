import { createClerkClient, verifyToken } from "@usesofia/clerk-backend";
import { ClerkLoggerServiceAdapter } from "@app/clerk/clerk-logger-service.adapter";
import { CLERK_CLIENT, CLERK_VERIFY_TOKEN } from "@app/clerk/clerk.constants";
import { BASE_CONFIG, BaseConfigEntity } from "@app/config/base-config.entity";
import { Module, Global } from "@nestjs/common";

@Global()
@Module({
  imports: [],
  providers: [
    ClerkLoggerServiceAdapter,
    {
      provide: CLERK_CLIENT,
      useFactory: (
        baseConfig: BaseConfigEntity,
        clerkLoggerServiceAdapter: ClerkLoggerServiceAdapter,
      ) => {
        return createClerkClient(
          {
            secretKey: baseConfig.clerk.secretKey,
          },
          clerkLoggerServiceAdapter,
        );
      },
      inject: [BASE_CONFIG, ClerkLoggerServiceAdapter],
    },
    {
      provide: CLERK_VERIFY_TOKEN,
      useFactory: () => verifyToken,
    },
  ],
  exports: [CLERK_CLIENT, CLERK_VERIFY_TOKEN],
})
export class ClerkModule {}
