import { ClientSession } from 'mongoose';
import { BaseSessionPort, TransactionOptions } from '@app/database/base-session.port';
import { Base } from '@app/base';
import { BaseConfigEntity } from '@app/config/base-config.entity';
import { HttpException, LoggerService } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';

export class BaseMongoDbSessionAdapter extends Base implements BaseSessionPort {
  private readonly session: ClientSession;

  constructor(
    session: ClientSession,
    protected readonly baseConfig: BaseConfigEntity,
    protected readonly logger: LoggerService,
    protected readonly cls: ClsService,
  ) {
    super(BaseMongoDbSessionAdapter.name, baseConfig, logger, cls);
    this.session = session;
  }

  endSession(): Promise<void> {
    return this.session.endSession();
  }

  async withTransaction<T>(fn: () => Promise<T>, options?: TransactionOptions): Promise<T> {
    const mongoDbConfig = this.baseConfig.databases.find((db) => db.type === 'mongodb');

    if (!mongoDbConfig) {
      throw new Error('MongoDB config not found.');
    }

    let attempt = 1;

    const maxNAttempts = options?.nRetries ?? mongoDbConfig.nTransactionRetries;
    const maxDelayBetweenAttempts = options?.maxDelayBetweenAttempts ?? mongoDbConfig.maxDelayBetweenTransactionAttempts;

    let result: T | undefined;

    while (attempt <= maxNAttempts) {
      try {
        result = await this.session.withTransaction(fn, {
          timeoutMS: options?.timeoutInMiliseconds ?? mongoDbConfig.transactionTimeoutInMiliseconds,
        });
        return result;
      } catch (error) {
        if (error instanceof HttpException) {
          throw error;
        }
        this.logWarn({
          functionName: 'withTransaction',
          suffix: `attemptFailed`,
          data: {
            attempt,
            maxNAttempts,
            error,
          },
        });
        attempt++;
        const delay = Math.min(maxDelayBetweenAttempts, 100 * Math.pow(2, attempt - 1));
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }

    throw new Error('Transaction failed after all attempts.');
  }

  getSession(): ClientSession {
    return this.session;
  }
}
