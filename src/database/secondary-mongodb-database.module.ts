import { BASE_CONFIG, BaseConfigEntity } from '@app/config/base-config.entity';
import { Global, Inject, Module, OnApplicationShutdown } from '@nestjs/common';
import mongoose from 'mongoose';

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
        const maxRetries = 7;
        let delay = 2000; // Começa com 2 segundos

        for (let i = 0; i < maxRetries; i++) {
          try {
            const connection = await mongoose.createConnection(secondaryMongoDatabase.uri, {
              // Pool
              maxPoolSize: 50,
              minPoolSize: 5,
              maxIdleTimeMS: 60000,

              // Timeouts (não deixar nada "infinito")
              serverSelectionTimeoutMS: 10000, // Reduzi para o retry falhar mais rápido
              connectTimeoutMS: 10000,
              socketTimeoutMS: 60000,

              // Prefer reading from replica set secondaries when possible
              readPreference: 'secondaryPreferred',

              // Boas práticas p/ prod
              family: 4,         // força IPv4 no driver (pass-through)
            }).asPromise();

            console.log('✅ Secondary MongoDB connected successfully');
            return connection;
          } catch (error) {
            if (i === maxRetries - 1) throw error; // Se for a última tentativa, explode o erro
            
            console.warn(`⚠️ Falha ao conectar ao Mongo secundário (tentativa ${i + 1}/${maxRetries}). Tentando em ${delay}ms...`);
            console.warn('Erro:', error);
            await new Promise((res) => setTimeout(res, delay));
            delay *= 2; // Dobra o tempo de espera para a próxima tentativa
          }
        }
        throw new Error('Failed to connect to secondary MongoDB after all attempts.');
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
