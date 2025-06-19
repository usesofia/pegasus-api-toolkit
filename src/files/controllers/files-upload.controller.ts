import { ExceptionResponseEntity } from '@app/app-exceptions.filter';
import { Base } from '@app/base';
import { ConfirmFileUploadRequestBodyDto } from '@app/files/dtos/confirm-file-upload-request-body.dto';
import { CreateFileUploadRequestBodyDto } from '@app/files/dtos/create-file-upload-request-body.dto';
import { ConfirmFileUploadRequestEntity } from '@app/files/entities/confirm-file-upload-request.entity';
import { CreateFileUploadRequestEntity } from '@app/files/entities/create-file-upload-request.entity';
import { FILES_SERVICE_PORT, type FilesServicePort } from '@app/files/ports/files-service.port';
import { LOGGER_SERVICE_PORT } from '@app/logger/logger.module';
import { Body, Controller, Inject, LoggerService, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ClsService } from 'nestjs-cls';
import { BASE_CONFIG, BaseConfigEntity } from '@app/config/base-config.entity';
import { OrganizationTypes } from '@app/auth/decorators/organization-types.decorator';
import { OrganizationType } from '@app/auth/constants/organization-type.enum';
import { AuthUser } from '@app/auth/decorators/auth-user.decorator';
import { AuthUserEntity } from '@app/auth/entities/auth-user.entity';
import { FileEntity } from '@app/files/entities/file.entity';
import { Log } from '@app/utils/log.utils';
import { AUTH_SERVICE_PORT, AuthServicePort } from '@app/auth/ports/auth-service.port';
import { IgnoreAuthGuard } from '@app/auth/decorators/ignore-auth-guard.decorator';
import { GcpServiceAccountGuard } from '@app/auth/guards/gcp-service-account.guard';

@ApiTags('Files Upload')
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
    @Inject(AUTH_SERVICE_PORT)
    private readonly authService: AuthServicePort,
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
  @Log('controller')
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
    operationId: 'systemCreateFileUpload',
    summary: 'Cria uma nova solicitação de upload de arquivo',
  })
  @ApiParam({
    name: 'organizationId',
    description: 'The id of the organization to confirm the file upload',
    type: String,
    required: true,
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
  @IgnoreAuthGuard()
  @UseGuards(GcpServiceAccountGuard)
  @Post('/internal/organizations/:organizationId/files/upload')
  @Log('controller')
  async systemCreate(
    @Body() body: CreateFileUploadRequestBodyDto,
    @Param('organizationId') organizationId: string,
  ): Promise<{ fileId: string; uploadUrl: string }> {
    const { channel, ...data } = body;
    const requester = await this.authService.getSystemUserForOrganization(organizationId);
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
  @Log('controller')
  async confirm(@AuthUser() requester: AuthUserEntity, @Body() body: ConfirmFileUploadRequestBodyDto): Promise<FileEntity> {
    const { channel, ...data } = body;
    return await this.filesService.confirmUploadRequest({
      requester,
      request: ConfirmFileUploadRequestEntity.build({ data, channel }),
    });
  }

  @ApiOperation({
    operationId: 'systemConfirmFileUpload',
    summary: 'Confirms a file upload',
  })
  @ApiParam({
    name: 'organizationId',
    description: 'The id of the organization to confirm the file upload',
    type: String,
    required: true,
  })
  @ApiBody({
    type: ConfirmFileUploadRequestBodyDto,
  })
  @ApiCreatedResponse({
    type: FileEntity,
  })
  @IgnoreAuthGuard()
  @UseGuards(GcpServiceAccountGuard)
  @Post('/internal/organizations/:organizationId/files/upload/confirm')
  @Log('controller')
  async systemConfirm(
    @Body() body: ConfirmFileUploadRequestBodyDto,
    @Param('organizationId') organizationId: string,
  ): Promise<FileEntity> {
    const { channel, ...data } = body;
    const requester = await this.authService.getSystemUserForOrganization(organizationId);
    return await this.filesService.confirmUploadRequest({
      requester,
      request: ConfirmFileUploadRequestEntity.build({ data, channel }),
    });
  }
}
