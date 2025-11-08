import { Base } from '@app/base';
import { ConfirmFileUploadRequestBodyDto } from '@app/files/dtos/confirm-file-upload-request-body.dto';
import { CreateFileUploadRequestBodyDto } from '@app/files/dtos/create-file-upload-request-body.dto';
import { type FilesServicePort } from '@app/files/ports/files-service.port';
import { LoggerService } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { BaseConfigEntity } from '@app/config/base-config.entity';
import { AuthUserEntity } from '@app/auth/entities/auth-user.entity';
import { FileEntity } from '@app/files/entities/file.entity';
import { AuthServicePort } from '@app/auth/ports/auth-service.port';
export declare class FilesUploadController extends Base {
    protected readonly baseConfig: BaseConfigEntity;
    protected readonly logger: LoggerService;
    protected readonly cls: ClsService;
    private readonly filesService;
    private readonly authService;
    constructor(baseConfig: BaseConfigEntity, logger: LoggerService, cls: ClsService, filesService: FilesServicePort, authService: AuthServicePort);
    create(requester: AuthUserEntity, body: CreateFileUploadRequestBodyDto): Promise<{
        fileId: string;
        uploadUrl: string;
    }>;
    systemCreate(body: CreateFileUploadRequestBodyDto, organizationId: string): Promise<{
        fileId: string;
        uploadUrl: string;
    }>;
    confirm(requester: AuthUserEntity, body: ConfirmFileUploadRequestBodyDto): Promise<FileEntity>;
    systemConfirm(body: ConfirmFileUploadRequestBodyDto, organizationId: string): Promise<FileEntity>;
}
