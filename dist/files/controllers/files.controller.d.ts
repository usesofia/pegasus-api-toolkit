import { RemoveFileRequestBodyDto } from '../../files/dtos/remove-file-request-body.dto';
import { type FilesServicePort } from '../../files/ports/files-service.port';
import { LoggerService } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { Base } from '../../base';
import { BaseConfigEntity } from '../../config/base-config.entity';
import { AuthUserEntity } from '../../auth/entities/auth-user.entity';
export declare class FilesController extends Base {
    protected readonly baseConfig: BaseConfigEntity;
    protected readonly logger: LoggerService;
    protected readonly cls: ClsService;
    private readonly filesService;
    constructor(baseConfig: BaseConfigEntity, logger: LoggerService, cls: ClsService, filesService: FilesServicePort);
    delete(requester: AuthUserEntity, id: string, body: RemoveFileRequestBodyDto): Promise<void>;
}
