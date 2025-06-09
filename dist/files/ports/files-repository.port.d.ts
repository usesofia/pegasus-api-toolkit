import { BaseSessionPort } from '../../database/base-session.port';
import { AuthUserEntity } from '../../auth/entities/auth-user.entity';
import { BaseSessionStarterPort } from '../../database/base-session-starter.port';
import type { CreateFileRequestEntity } from '../../files/entities/create-file-request.entity';
import type { FileEntity } from '../../files/entities/file.entity';
import type { FindByIdFileRequestEntity } from '../../files/entities/find-by-id-file-request.entity';
import type { PartialUpdateFileRequestEntity } from '../../files/entities/partial-update-file-request.entity';
export declare const FILES_REPOSITORY_PORT: unique symbol;
export interface FilesRepositoryPort extends BaseSessionStarterPort {
    create({ requester, request, }: {
        requester: AuthUserEntity;
        request: CreateFileRequestEntity;
        previousSession?: BaseSessionPort;
    }): Promise<FileEntity>;
    findByIdOrThrow({ requester, request, previousSession, }: {
        requester: AuthUserEntity;
        request: FindByIdFileRequestEntity;
        previousSession?: BaseSessionPort;
    }): Promise<FileEntity>;
    partialUpdateOrThrow({ requester, request, }: {
        requester: AuthUserEntity;
        request: PartialUpdateFileRequestEntity;
        previousSession?: BaseSessionPort;
    }): Promise<FileEntity>;
}
