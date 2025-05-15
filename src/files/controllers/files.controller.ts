import { RemoveFileRequestBodyDto } from '@app/files/dtos/remove-file-request-body.dto';
import { RemoveFileRequestEntity } from '@app/files/entities/remove-file-request.entity';
import { FILES_SERVICE_PORT, type FilesServicePort } from '@app/files/ports/files-service.port';
import { Body, Controller, Delete, Inject, LoggerService, Param } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ClsService } from 'nestjs-cls';
import { Base } from '@app/base';
import { LOGGER_SERVICE_PORT } from '@app/logger/logger.module';
import { ExceptionResponseEntity } from '@app/app-exceptions.filter';
import { AuthUser } from '@app/auth/decorators/auth-user.decorator';
import { BASE_CONFIG, BaseConfigEntity } from '@app/config/base-config.entity';
import { OrganizationTypes } from '@app/auth/decorators/organization-types.decorator';
import { AuthUserEntity } from '@app/auth/entities/auth-user.entity';
import { OrganizationType } from '@app/auth/constants/organization-type.enum';

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
}
