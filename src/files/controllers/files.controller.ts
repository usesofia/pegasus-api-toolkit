import { RemoveFileRequestBodyDto } from '@app/files/dtos/remove-file-request-body.dto';
import { RemoveFileRequestEntity } from '@app/files/entities/remove-file-request.entity';
import { FILES_SERVICE_PORT, type FilesServicePort } from '@app/files/ports/files-service.port';
import { Body, Controller, Delete, Get, Inject, LoggerService, Param, Query } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ClsService } from 'nestjs-cls';
import { Base } from '@app/base';
import { LOGGER_SERVICE_PORT } from '@app/logger/logger.module';
import { ExceptionResponseEntity } from '@app/app-exceptions.filter';
import { AuthUser } from '@app/auth/decorators/auth-user.decorator';
import { BASE_CONFIG, BaseConfigEntity } from '@app/config/base-config.entity';
import { OrganizationTypes } from '@app/auth/decorators/organization-types.decorator';
import { AuthUserEntity } from '@app/auth/entities/auth-user.entity';
import { OrganizationType } from '@app/auth/constants/organization-type.enum';
import { SignedUrlEntity } from '@app/files/entities/signed-url.entity';
import { Log } from '@app/utils/log.utils';
import { FileEntity } from '@app/files/entities/file.entity';

@ApiTags('Files')
@ApiResponse({
  type: ExceptionResponseEntity,
})
@Controller()
export class FilesController extends Base {
  constructor(
    @Inject(BASE_CONFIG) protected readonly baseConfig: BaseConfigEntity,
    @Inject(LOGGER_SERVICE_PORT) protected readonly logger: LoggerService,
    protected readonly cls: ClsService,
    @Inject(FILES_SERVICE_PORT)
    private readonly filesService: FilesServicePort,
  ) {
    super(FilesController.name, baseConfig, logger, cls);
  }

  @ApiOperation({
    operationId: 'deleteFile',
    summary: 'Deletes a file',
  })
  @ApiBody({
    type: RemoveFileRequestBodyDto,
  })
  @Delete('/external/files/:id')
  @OrganizationTypes(OrganizationType.LEAF)
  @Log('controller')
  async delete(
    @AuthUser() requester: AuthUserEntity,
    @Param('id') id: string,
    @Body() body: RemoveFileRequestBodyDto,
  ): Promise<void> {
    await this.filesService.removeOrThrow({
      requester,
      request: RemoveFileRequestEntity.build({ id, channel: body.channel }),
    });
  }

  @ApiOperation({
    operationId: 'findByIdFile',
    summary: 'Finds a file by id',
  })
  @ApiParam({
    name: 'id',
    description: 'The id of the file to get',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: FileEntity,
  })
  @Get('/external/files/:id')
  @OrganizationTypes(OrganizationType.LEAF)
  @Log('controller')
  async findById(
    @AuthUser() requester: AuthUserEntity,
    @Param('id') id: string,
  ): Promise<FileEntity> {
    return await this.filesService.findByIdOrThrow({ requester, id });
  }

  @ApiOperation({
    operationId: 'getSignedUrlFromUrl',
    summary: 'Get a signed url from a url',
  })
  @ApiQuery({
    name: 'url',
    description: 'The url of the file to get the signed url from',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: SignedUrlEntity,
  })
  @Get('/external/files/signed-url')
  @Log('controller')
  @OrganizationTypes(OrganizationType.LEAF)
  async getSignedUrlFromUrl(@AuthUser() requester: AuthUserEntity, @Query('url') url: string): Promise<SignedUrlEntity> {
    const signedUrl = await this.filesService.getSignedUrlFromUrl({ requester, url });
    return SignedUrlEntity.build({ url, signedUrl });
  }
}
