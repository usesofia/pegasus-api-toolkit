import { ClientSession } from 'mongoose';
import { BaseSessionPort, TransactionOptions } from '@app/database/base-session.port';
import { Base } from '@app/base';
import { BaseConfigEntity } from '@app/config/base-config.entity';
import { LoggerService } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
export declare class BaseMongoDbSessionAdapter extends Base implements BaseSessionPort {
    protected readonly baseConfig: BaseConfigEntity;
    protected readonly logger: LoggerService;
    protected readonly cls: ClsService;
    private readonly session;
    constructor(session: ClientSession, baseConfig: BaseConfigEntity, logger: LoggerService, cls: ClsService);
    endSession(): Promise<void>;
    withTransaction<T>(fn: () => Promise<T>, options?: TransactionOptions): Promise<T>;
    getSession(): ClientSession;
}
