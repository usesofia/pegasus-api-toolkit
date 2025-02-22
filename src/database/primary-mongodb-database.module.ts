import {
  Global,
  Inject,
  LoggerService,
  Module,
  OnApplicationShutdown,
} from '@nestjs/common';
import mongoose from 'mongoose';
import { BASE_CONFIG, BaseConfigEntity } from '../config/base-config.entity';
import { LOGGER_SERVICE_PORT } from '../logger/logger.module';

export const PRIMARY_MONGOOSE_CONNECTION = Symbol('PrimaryMongooseConnection');

@Global()
@Module({
  providers: [
    {
      provide: PRIMARY_MONGOOSE_CONNECTION,
      useFactory: async (
        baseConfig: BaseConfigEntity,
      ): Promise<mongoose.Mongoose> => {
        const mongoDatabases = baseConfig.databases.filter(
          (db) => db.type === 'mongodb',
        );
        if (mongoDatabases.length === 0) {
          throw new Error('No MongoDB databases found.');
        }
        const primaryMongoDatabase = mongoDatabases[0];
        return await mongoose.connect(primaryMongoDatabase.uri);
      },
      inject: [BASE_CONFIG],
    },
  ],
  exports: [PRIMARY_MONGOOSE_CONNECTION],
})
export class PrimaryMongoDbDatabaseModule implements OnApplicationShutdown {
  constructor(
    @Inject(PRIMARY_MONGOOSE_CONNECTION)
    private readonly connection: mongoose.Mongoose,
  ) {}

  async onApplicationShutdown() {
    await this.connection.disconnect();
  }
}
