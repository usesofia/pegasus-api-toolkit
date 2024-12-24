import {
  Controller,
  Post,
  Inject,
  LoggerService,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiOkResponse,
} from '@nestjs/swagger';
import { AuthServicePort, AUTH_SERVICE_PORT } from './ports/auth-service.port';
import { AuthUserEntity } from './entities/auth-user.entity';
import { PubSubMessageBodyDto } from '../pub-sub/pub-sub-message.dto';
import { CacheHitOnGetAuthUserPayload } from './payloads/cache-hit-on-get-auth-user.payload';
import { BASE_CONFIG, BaseConfigEntity } from '../config/base-config.entity';
import { GcpServiceAccountGuard } from './guards/gcp-service-account.guard';
import { IgnoreAuthGuard } from './decorators/ignore-auth-guard.decorator';
import { ExceptionResponseEntity } from '../app-exceptions.filter';
import { Base } from '../base';
import { LOGGER_SERVICE_PORT } from '../logger/logger.module';
import { Log } from '../utils/log.utils';

@ApiTags('Auth')
@ApiResponse({
  type: ExceptionResponseEntity,
})
@Controller()
export class AuthController extends Base {
  constructor(
    @Inject(BASE_CONFIG) protected readonly baseConfig: BaseConfigEntity,
    @Inject(LOGGER_SERVICE_PORT) protected readonly logger: LoggerService,
    protected readonly cls: ClsService,
    @Inject(AUTH_SERVICE_PORT)
    private readonly authService: AuthServicePort,
  ) {
    super(AuthController.name, baseConfig, logger, cls);
  }

  @ApiOperation({
    operationId: 'refreshAuthUserOnCache',
    summary: 'Atualiza os dados do usuário na cache.',
  })
  @ApiBody({
    type: PubSubMessageBodyDto,
  })
  @ApiOkResponse({
    type: AuthUserEntity,
  })
  @IgnoreAuthGuard()
  @UseGuards(GcpServiceAccountGuard)
  @Post('/internal/auth/users/cache/refresh')
  @Log()
  async refreshAuthUserOnCache(
    @Body() body: PubSubMessageBodyDto,
  ): Promise<void> {
    const payload = body.extractPayload(CacheHitOnGetAuthUserPayload);
    await this.authService.getUser({
      userId: payload.userId,
      organizationId: payload.organizationId,
      organizationRole: payload.organizationRole,
      ignoreCache: true,
    });
  }
}
