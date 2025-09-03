import { ExceptionResponseEntity } from '@app/app-exceptions.filter';
import { IgnoreAuthGuard } from '@app/auth/decorators/ignore-auth-guard.decorator';
import { GcpServiceAccountGuard } from '@app/auth/guards/gcp-service-account.guard';
import { Base } from '@app/base';
import { BASE_CONFIG, BaseConfigEntity } from '@app/config/base-config.entity';
import { LOGGER_SERVICE_PORT } from '@app/logger/logger.module';
import { SYNC_ORGANIZATIONS_SERVICE_PORT, SyncOrganizationsServicePort } from '@app/sync-organizations/ports/sync-organizations-service.port';
import { Log } from '@app/utils/log.utils';
import {
  Controller,
  Inject,
  LoggerService,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ClsService } from 'nestjs-cls';

@ApiTags('Sync Organizations')
@ApiResponse({
  type: ExceptionResponseEntity,
})
@Controller()
export class SyncOrganizationsController extends Base {
  constructor(
    @Inject(BASE_CONFIG) protected readonly baseConfig: BaseConfigEntity,
    @Inject(LOGGER_SERVICE_PORT) protected readonly logger: LoggerService,
    protected readonly cls: ClsService,
    @Inject(SYNC_ORGANIZATIONS_SERVICE_PORT)
    private readonly syncOrganizationsService: SyncOrganizationsServicePort,
  ) {
    super(SyncOrganizationsController.name, baseConfig, logger, cls);
  }

  @ApiOperation({
    operationId: 'syncOrganizations',
    summary: 'Sincroniza todas as organizações.',
  })
  @IgnoreAuthGuard()
  @UseGuards(GcpServiceAccountGuard)
  @Post('/internal/sync-organizations')
  @Log('controller')
  async syncOrganizations(
  ): Promise<void> {
    await this.syncOrganizationsService.sync();
  }
}
