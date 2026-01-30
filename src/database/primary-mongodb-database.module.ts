import { Global, Inject, Module, OnApplicationShutdown } from '@nestjs/common';
import mongoose from 'mongoose';
import { BASE_CONFIG, BaseConfigEntity } from '@app/config/base-config.entity';

export const PRIMARY_MONGOOSE_CONNECTION = Symbol('PrimaryMongooseConnection');

@Global()
@Module({
  providers: [
    {
      provide: PRIMARY_MONGOOSE_CONNECTION,
      useFactory: async (
        baseConfig: BaseConfigEntity,
      ): Promise<mongoose.Connection> => {
        const mongoDatabases = baseConfig.databases.filter(
          (db) => db.type === 'mongodb',
        );
        if (mongoDatabases.length === 0) {
          throw new Error('No MongoDB database found.');
        }
        const primaryMongoDatabase = mongoDatabases[0];
        
        const connectionOptions: mongoose.ConnectOptions = {
          // Pool
          maxPoolSize: 50,
          minPoolSize: 5,
          maxIdleTimeMS: 60000,

          // Timeouts (não deixar nada "infinito")
          serverSelectionTimeoutMS: 30000,
          connectTimeoutMS: 30000,
          socketTimeoutMS: 60000,

          // Boas práticas p/ prod
          family: 4,         // força IPv4 no driver (pass-through)
        };

        // Configure proxy if provided
        if (baseConfig.httpProxy) {
          try {
            const proxyUrl = new URL(baseConfig.httpProxy);
            connectionOptions.proxyHost = proxyUrl.hostname;
            connectionOptions.proxyPort = parseInt(proxyUrl.port, 10);
            if (proxyUrl.username) {
              connectionOptions.proxyUsername = decodeURIComponent(proxyUrl.username);
            }
            if (proxyUrl.password) {
              connectionOptions.proxyPassword = decodeURIComponent(proxyUrl.password);
            }
          } catch {
            throw new Error(`Invalid httpProxy URL: ${baseConfig.httpProxy}`);
          }
        }

        return await mongoose.createConnection(primaryMongoDatabase.uri, connectionOptions).asPromise();
      },
      inject: [BASE_CONFIG],
    },
  ],
  exports: [PRIMARY_MONGOOSE_CONNECTION],
})
export class PrimaryMongoDbDatabaseModule implements OnApplicationShutdown {
  constructor(
    @Inject(PRIMARY_MONGOOSE_CONNECTION)
    private readonly connection: mongoose.Connection,
  ) {}

  async onApplicationShutdown() {
    await this.connection.close();
  }
}
