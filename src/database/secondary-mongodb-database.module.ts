import { Global, Inject, Module, OnApplicationShutdown } from '@nestjs/common';
import mongoose from 'mongoose';
import { BASE_CONFIG, BaseConfigEntity } from '@app/config/base-config.entity';

export const SECONDARY_MONGOOSE_CONNECTION = Symbol('SecondaryMongooseConnection');

@Global()
@Module({
  providers: [
    {
      provide: SECONDARY_MONGOOSE_CONNECTION,
      useFactory: async (
        baseConfig: BaseConfigEntity,
      ): Promise<mongoose.Connection> => {
        const mongoDatabases = baseConfig.databases.filter(
          (db) => db.type === 'mongodb',
        );
        if (mongoDatabases.length < 2) {
          throw new Error('No secondary MongoDB database found.');
        }
        const secondaryMongoDatabase = mongoDatabases[1];
        return await mongoose.createConnection(secondaryMongoDatabase.uri, {
          maxPoolSize: 150,
          serverSelectionTimeoutMS: 60000,
          socketTimeoutMS: 60000,
        }).asPromise();
      },
      inject: [BASE_CONFIG],
    },
  ],
  exports: [SECONDARY_MONGOOSE_CONNECTION],
})
export class SecondaryMongoDbDatabaseModule implements OnApplicationShutdown {
  constructor(
    @Inject(SECONDARY_MONGOOSE_CONNECTION)
    private readonly connection: mongoose.Connection,
  ) {}

  async onApplicationShutdown() {
    await this.connection.close();
  }
}
