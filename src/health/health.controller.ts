import { Controller, Get, Inject, LoggerService, Post } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiResponse,
} from '@nestjs/swagger';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { IgnoreGcpServiceAccountGuard } from '@app/auth/decorators/ignore-gcp-service-account-guard.decorator';
import { ExceptionResponseEntity } from '@app/app-exceptions.filter';
import { Base } from '@app/base';
import { LOGGER_SERVICE_PORT } from '@app/logger/logger.module';
import { BASE_CONFIG, BaseConfigEntity } from '@app/config/base-config.entity';
import { IgnoreAuthGuard } from '@app/auth/decorators/ignore-auth-guard.decorator';
import { Log } from '@app/utils/log.utils';

const HealthResponseDtoSchema = z.object({
  status: z.string(),
});

class HealthResponseDto extends createZodDto(HealthResponseDtoSchema) {}

@ApiTags('Health')
@ApiResponse({
  type: ExceptionResponseEntity,
})
@Controller()
export class HealthController extends Base {
  constructor(
    @Inject(BASE_CONFIG) protected readonly baseConfig: BaseConfigEntity,
    @Inject(LOGGER_SERVICE_PORT) protected readonly logger: LoggerService,
    protected readonly cls: ClsService,
  ) {
    super(HealthController.name, baseConfig, logger, cls);
  }

  @ApiOperation({
    operationId: 'health',
    summary: 'Verifica o status do serviço.',
  })
  @ApiOkResponse({
    type: HealthResponseDto,
    description: 'Status do serviço.',
  })
  @IgnoreAuthGuard()
  @IgnoreGcpServiceAccountGuard()
  @Get('/')
  @Log()
  async health(): Promise<HealthResponseDto> {
    return Promise.resolve({ status: 'ok' });
  }

  @ApiOperation({
    operationId: 'healthPost',
    summary: 'Verifica o status do serviço.',
  })
  @ApiOkResponse({
    type: HealthResponseDto,
    description: 'Status do serviço.',
  })
  @IgnoreAuthGuard()
  @IgnoreGcpServiceAccountGuard()
  @Post('/')
  @Log()
  async healthPost(): Promise<HealthResponseDto> {
    return Promise.resolve({ status: 'ok' });
  }

  @ApiOperation({
    operationId: 'error',
    summary: 'Gera um erro de teste.',
  })
  @IgnoreAuthGuard()
  @IgnoreGcpServiceAccountGuard()
  @Get('/error')
  @Log()
  async error() {
    return Promise.reject(new Error('Test error.'));
  }
}
