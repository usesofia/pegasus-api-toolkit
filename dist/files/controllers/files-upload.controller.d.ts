import { Base } from '@app/base';
import { ConfirmFileUploadRequestBodyDto } from '@app/files/dtos/confirm-file-upload-request-body.dto';
import { CreateFileUploadRequestBodyDto } from '@app/files/dtos/create-file-upload-request-body.dto';
import { type FilesServicePort } from '@app/files/ports/files-service.port';
import { LoggerService } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { BaseConfigEntity } from '@app/config/base-config.entity';
import { AuthUserEntity } from '@app/auth/entities/auth-user.entity';
import { FileEntity } from '@app/files/entities/file.entity';
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
    confirm(requester: AuthUserEntity, body: ConfirmFileUploadRequestBodyDto): Promise<FileEntity>;
}
