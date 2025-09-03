import { ClerkModule } from '@app/clerk/clerk.module';
import { BASE_CONFIG, BaseConfigEntity } from '@app/config/base-config.entity';
import { PRIMARY_MONGOOSE_CONNECTION } from '@app/database/primary-mongodb-database.module';
import { ClerkSyncOrganizationsServiceAdapter } from '@app/sync-organizations/adapters/clerk-sync-organizations-service.adapter';
import { MongoDbOrganizationsRepositoryAdapter } from '@app/sync-organizations/adapters/mongodb-organizations-repository.adapter';
import { MongoDbOrganizationModelSchema } from '@app/sync-organizations/mongodb-organization-model';
import { ORGANIZATIONS_REPOSITORY_PORT } from '@app/sync-organizations/ports/organizations-repository.port';
import { SYNC_ORGANIZATIONS_SERVICE_PORT } from '@app/sync-organizations/ports/sync-organizations-service.port';
import { ORGANIZATION_COLLECTION_NAME, ORGANIZATION_MODEL } from '@app/sync-organizations/sync-organizations.constants';
import { SyncOrganizationsController } from '@app/sync-organizations/sync-organizations.controller';
import { Environment } from '@app/utils/environment.utils';
import { Inject, Module, OnModuleInit, forwardRef } from '@nestjs/common';

import { Connection } from 'mongoose';

@Module({
  imports: [
    forwardRef(() => ClerkModule),
  ],
  controllers: [SyncOrganizationsController],
  providers: [
    {
      provide: ORGANIZATIONS_REPOSITORY_PORT,
      useClass: MongoDbOrganizationsRepositoryAdapter,
    },
    {
      provide: ORGANIZATION_MODEL,
      useFactory: (connection: Connection) => {
        return connection.model(ORGANIZATION_COLLECTION_NAME, MongoDbOrganizationModelSchema);
      },
      inject: [PRIMARY_MONGOOSE_CONNECTION],
    },
    {
      provide: SYNC_ORGANIZATIONS_SERVICE_PORT,
      useClass: ClerkSyncOrganizationsServiceAdapter,
    },
  ],
})
export class SyncOrganizationsModule implements OnModuleInit {
  constructor(
    @Inject(BASE_CONFIG)
    private readonly baseConfig: BaseConfigEntity,
    @Inject(PRIMARY_MONGOOSE_CONNECTION)
    private readonly connection: Connection,
  ) {}

  async onModuleInit() {
    /* istanbul ignore next */
    if (this.baseConfig.env !== Environment.INTEGRATION_TEST) {
      await this.createIndexes();
    }
  }

  /* istanbul ignore next */
  async createIndexes() {
    const model = this.connection.model(ORGANIZATION_COLLECTION_NAME);

    await model.createIndexes();
  }
}
