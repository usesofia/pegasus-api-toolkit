import { BaseConfigEntity } from '@app/config/base-config.entity';
import { OnModuleInit } from '@nestjs/common';
import { Connection } from 'mongoose';
export declare class FilesModule implements OnModuleInit {
    private readonly baseConfig;
    private readonly connection;
    constructor(baseConfig: BaseConfigEntity, connection: Connection);
    onModuleInit(): Promise<void>;
    createIndexes(): Promise<void>;
}
