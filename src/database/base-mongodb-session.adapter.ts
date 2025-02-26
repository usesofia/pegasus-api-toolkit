import { ClientSession } from 'mongoose';
import { BaseSessionPort, TransactionOptions } from './base-session.port';
import { Base } from '../base';
import { BaseConfigEntity } from '../config/base-config.entity';
import { LoggerService } from '@nestjs/common';
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

    let result: T | undefined;

    while (attempt <= maxNAttempts) {
      try {
        result = await this.session.withTransaction(fn, {
          timeoutMS: options?.timeoutInMiliseconds ?? mongoDbConfig.transactionTimeoutInMiliseconds,
        });
        break;
      } catch (error) {
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
        const delay = Math.min(2000, 100 * Math.pow(2, attempt - 1));
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }

    if (!result) {
      throw new Error('Transaction failed after all attempts.');
    }

    return result;
  }

  getSession(): ClientSession {
    return this.session;
  }
}
