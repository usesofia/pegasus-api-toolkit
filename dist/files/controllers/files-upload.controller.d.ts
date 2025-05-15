import { Base } from '../../base';
import { ConfirmFileUploadRequestBodyDto } from '../../files/dtos/confirm-file-upload-request-body.dto';
import { CreateFileUploadRequestBodyDto } from '../../files/dtos/create-file-upload-request-body.dto';
import { type FilesServicePort } from '../../files/ports/files-service.port';
import { LoggerService } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { BaseConfigEntity } from '../../config/base-config.entity';
import { AuthUserEntity } from '../../auth/entities/auth-user.entity';
export declare class FilesUploadController extends Base {
    protected readonly baseConfig: BaseConfigEntity;
    protected readonly logger: LoggerService;
    protected readonly cls: ClsService;
    private readonly filesService;
    constructor(baseConfig: BaseConfigEntity, logger: LoggerService, cls: ClsService, filesService: FilesServicePort);
    create(requester: AuthUserEntity, body: CreateFileUploadRequestBodyDto): Promise<{
        fileId: string;
        uploadUrl: string;
    }>;
    confirm(requester: AuthUserEntity, body: ConfirmFileUploadRequestBodyDto): Promise<void>;
}
