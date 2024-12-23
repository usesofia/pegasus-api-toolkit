import { Global, Module } from '@nestjs/common';
import mongoose from 'mongoose';
import { BASE_CONFIG, BaseConfigEntity } from '../config/base-config.entity';

export const PRIMARY_MONGOOSE_CONNECTION = Symbol('PrimaryMongooseConnection');

@Global()
@Module({
  providers: [
    {
      provide: PRIMARY_MONGOOSE_CONNECTION,
      useFactory: (baseConfig: BaseConfigEntity): Promise<typeof mongoose> => {
        const mongoDatabases = baseConfig.databases.filter((db) => db.type === 'mongodb');
        if (mongoDatabases.length === 0) {
          throw new Error('No MongoDB databases found.');
        }
        const primaryMongoDatabase = mongoDatabases[0];
        return mongoose.connect(primaryMongoDatabase.uri);
      },
      inject: [BASE_CONFIG],
    },
  ],
  exports: [PRIMARY_MONGOOSE_CONNECTION],
})
export class PrimaryMongoDbDatabaseModule {}
