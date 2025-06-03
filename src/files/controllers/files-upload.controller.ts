import { ExceptionResponseEntity } from '@app/app-exceptions.filter';
import { Base } from '@app/base';
import { ConfirmFileUploadRequestBodyDto } from '@app/files/dtos/confirm-file-upload-request-body.dto';
import { CreateFileUploadRequestBodyDto } from '@app/files/dtos/create-file-upload-request-body.dto';
import { ConfirmFileUploadRequestEntity } from '@app/files/entities/confirm-file-upload-request.entity';
import { CreateFileUploadRequestEntity } from '@app/files/entities/create-file-upload-request.entity';
import { FILES_SERVICE_PORT, type FilesServicePort } from '@app/files/ports/files-service.port';
import { LOGGER_SERVICE_PORT } from '@app/logger/logger.module';
import { Body, Controller, Inject, LoggerService, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ClsService } from 'nestjs-cls';
import { BASE_CONFIG, BaseConfigEntity } from '@app/config/base-config.entity';
import { OrganizationTypes } from '@app/auth/decorators/organization-types.decorator';
import { OrganizationType } from '@app/auth/constants/organization-type.enum';
import { AuthUser } from '@app/auth/decorators/auth-user.decorator';
import { AuthUserEntity } from '@app/auth/entities/auth-user.entity';
import { FileEntity } from '@app/files/entities/file.entity';

@ApiTags('FilesUpload')
@ApiResponse({
  type: ExceptionResponseEntity,
})
@Controller()
export class FilesUploadController extends Base {
  constructor(
    @Inject(BASE_CONFIG) protected readonly baseConfig: BaseConfigEntity,
    @Inject(LOGGER_SERVICE_PORT) protected readonly logger: LoggerService,
    protected readonly cls: ClsService,
    @Inject(FILES_SERVICE_PORT)
    private readonly filesService: FilesServicePort,
  ) {
    super(FilesUploadController.name, baseConfig, logger, cls);
  }

  @ApiOperation({
    operationId: 'createFileUpload',
    summary: 'Cria uma nova solicitação de upload de arquivo',
  })
  @ApiBody({
    type: CreateFileUploadRequestBodyDto,
  })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        fileId: { type: 'string' },
        uploadUrl: { type: 'string' },
      },
    },
  })
  @Post('/external/files/upload')
  @OrganizationTypes(OrganizationType.LEAF)
  async create(
    @AuthUser() requester: AuthUserEntity,
    @Body() body: CreateFileUploadRequestBodyDto,
  ): Promise<{ fileId: string; uploadUrl: string }> {
    const { channel, ...data } = body;
    const { file, uploadUrl } = await this.filesService.createUploadRequest({
      requester,
      request: CreateFileUploadRequestEntity.build({ data, channel }),
    });

    return { fileId: file.id, uploadUrl };
  }

  @ApiOperation({
    operationId: 'confirmFileUpload',
    summary: 'Confirms a file upload',
  })
  @ApiBody({
    type: ConfirmFileUploadRequestBodyDto,
  })
  @ApiCreatedResponse({
    type: FileEntity,
  })
  @Post('/external/files/upload/confirm')
  @OrganizationTypes(OrganizationType.LEAF)
  async confirm(@AuthUser() requester: AuthUserEntity, @Body() body: ConfirmFileUploadRequestBodyDto): Promise<FileEntity> {
    const { channel, ...data } = body;
    return await this.filesService.confirmUploadRequest({
      requester,
      request: ConfirmFileUploadRequestEntity.build({ data, channel }),
    });
  }
}
