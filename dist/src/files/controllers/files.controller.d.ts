import { RemoveFileRequestBodyDto } from '../../files/dtos/remove-file-request-body.dto';
import { type FilesServicePort } from '../../files/ports/files-service.port';
import { LoggerService } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { Base } from '../../base';
import { BaseConfigEntity } from '../../config/base-config.entity';
import { AuthUserEntity } from '../../auth/entities/auth-user.entity';
import { SignedUrlEntity } from '../../files/entities/signed-url.entity';
import { FileEntity } from '../../files/entities/file.entity';
import { AuthServicePort } from '../../auth/ports/auth-service.port';
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
