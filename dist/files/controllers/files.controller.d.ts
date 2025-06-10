import { RemoveFileRequestBodyDto } from '@app/files/dtos/remove-file-request-body.dto';
import { type FilesServicePort } from '@app/files/ports/files-service.port';
import { LoggerService } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { Base } from '@app/base';
import { BaseConfigEntity } from '@app/config/base-config.entity';
import { AuthUserEntity } from '@app/auth/entities/auth-user.entity';
export declare class FilesController extends Base {
    protected readonly baseConfig: BaseConfigEntity;
    protected readonly logger: LoggerService;
    protected readonly cls: ClsService;
    private readonly filesService;
    constructor(baseConfig: BaseConfigEntity, logger: LoggerService, cls: ClsService, filesService: FilesServicePort);
    delete(requester: AuthUserEntity, id: string, body: RemoveFileRequestBodyDto): Promise<void>;
}
