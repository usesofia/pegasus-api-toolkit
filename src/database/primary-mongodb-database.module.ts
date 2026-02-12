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
        const maxRetries = 7;
        let delay = 2000; // Começa com 2 segundos

        for (let i = 0; i < maxRetries; i++) {
          try {
            const connection = await mongoose.createConnection(primaryMongoDatabase.uri, {
              maxPoolSize: 50,
              minPoolSize: 5,
              maxIdleTimeMS: 60000,
              serverSelectionTimeoutMS: 10000, // Reduzi para o retry falhar mais rápido
              connectTimeoutMS: 10000,
              socketTimeoutMS: 60000,
              family: 4,
            }).asPromise();

            console.log('✅ MongoDB connected successfully');
            return connection;
          } catch (error) {
            if (i === maxRetries - 1) throw error; // Se for a última tentativa, explode o erro
            
            console.warn(`⚠️ Falha ao conectar ao Mongo (tentativa ${i + 1}/${maxRetries}). Tentando em ${delay}ms...`);
            console.warn('Erro:', error);
            await new Promise((res) => setTimeout(res, delay));
            delay *= 2; // Dobra o tempo de espera para a próxima tentativa
          }
        }
        throw new Error('Failed to connect to MongoDB after all attempts.');
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
