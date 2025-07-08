import { BaseSessionPort } from '@app/database/base-session.port';
import { AuthUserEntity } from '@app/auth/entities/auth-user.entity';
import { BaseSessionStarterPort } from '@app/database/base-session-starter.port';
import type { CreateFileRequestEntity } from '@app/files/entities/create-file-request.entity';
import type { BaseFileEntity } from '@app/files/entities/file.entity';
import type { FindByIdFileRequestEntity } from '@app/files/entities/find-by-id-file-request.entity';
import type { PartialUpdateFileRequestEntity } from '@app/files/entities/partial-update-file-request.entity';
export declare const FILES_REPOSITORY_PORT: unique symbol;
export interface FilesRepositoryPort extends BaseSessionStarterPort {
    create({ requester, request, }: {
        requester: AuthUserEntity;
        request: CreateFileRequestEntity;
        previousSession?: BaseSessionPort;
    }): Promise<BaseFileEntity>;
    findByIdOrThrow({ requester, request, previousSession, }: {
        requester: AuthUserEntity;
        request: FindByIdFileRequestEntity;
        previousSession?: BaseSessionPort;
    }): Promise<BaseFileEntity>;
    partialUpdateOrThrow({ requester, request, }: {
        requester: AuthUserEntity;
        request: PartialUpdateFileRequestEntity;
        previousSession?: BaseSessionPort;
    }): Promise<BaseFileEntity>;
}
