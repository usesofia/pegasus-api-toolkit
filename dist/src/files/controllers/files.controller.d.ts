import { RemoveFileRequestBodyDto } from '@app/files/dtos/remove-file-request-body.dto';
import { type FilesServicePort } from '@app/files/ports/files-service.port';
import { LoggerService } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { Base } from '@app/base';
import { BaseConfigEntity } from '@app/config/base-config.entity';
import { AuthUserEntity } from '@app/auth/entities/auth-user.entity';
import { SignedUrlEntity } from '@app/files/entities/signed-url.entity';
import { FileEntity } from '@app/files/entities/file.entity';
import { AuthServicePort } from '@app/auth/ports/auth-service.port';
export declare class FilesController extends Base {
    protected readonly baseConfig: BaseConfigEntity;
    protected readonly logger: LoggerService;
    protected readonly cls: ClsService;
    private readonly filesService;
    private readonly authService;
    constructor(baseConfig: BaseConfigEntity, logger: LoggerService, cls: ClsService, filesService: FilesServicePort, authService: AuthServicePort);
    delete(requester: AuthUserEntity, id: string, body: RemoveFileRequestBodyDto): Promise<void>;
    findById(requester: AuthUserEntity, id: string): Promise<FileEntity>;
    systemFindById(fileId: string, organizationId: string): Promise<FileEntity>;
    getSignedUrlFromUrl(requester: AuthUserEntity, url: string): Promise<SignedUrlEntity>;
}
