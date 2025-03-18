import {
  Controller,
  Get,
  Inject,
  LoggerService,
  Put,
  Body,
} from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { Base } from '@app/base';
import { LOGGER_SERVICE_PORT } from '@app/logger/logger.module';
import { BASE_CONFIG, BaseConfigEntity } from '@app/config/base-config.entity';
import {
  CACHE_SERVICE_PORT,
  CacheServicePort,
} from '@app/cache/ports/cache-service.port';
import { ExceptionResponseEntity } from '@app/app-exceptions.filter';
import { Log } from '@app/utils/log.utils';
import { IgnoreAuthGuard } from '@app/auth/decorators/ignore-auth-guard.decorator';
import { IgnoreGcpServiceAccountGuard } from '@app/auth/decorators/ignore-gcp-service-account-guard.decorator';

const CacheSetDtoSchema = z.object({
  value: z.string().describe('String value to cache'),
});

class CacheSetDto extends createZodDto(CacheSetDtoSchema) {}

const CacheGetResponseDtoSchema = z.object({
  value: z
    .string()
    .nullable()
    .describe('Cached string value, null if not found'),
});

class CacheGetResponseDto extends createZodDto(CacheGetResponseDtoSchema) {}

const key = 'default';

@ApiTags('Cache')
@ApiResponse({
  type: ExceptionResponseEntity,
})
@Controller()
export class CacheController extends Base {
  constructor(
    @Inject(BASE_CONFIG) protected readonly baseConfig: BaseConfigEntity,
    @Inject(LOGGER_SERVICE_PORT) protected readonly logger: LoggerService,
    @Inject(CACHE_SERVICE_PORT)
    protected readonly cacheService: CacheServicePort,
    protected readonly cls: ClsService,
  ) {
    super(CacheController.name, baseConfig, logger, cls);
  }

  @ApiOperation({
    operationId: 'setCacheValue',
    summary: 'Set string value in cache with 10-second TTL',
  })
  @ApiBody({ type: CacheSetDto })
  @ApiOkResponse({ description: 'Successfully set value in cache' })
  @IgnoreAuthGuard()
  @IgnoreGcpServiceAccountGuard()
  @Put('/external/cache')
  @Log()
  async setCacheValue(@Body() body: CacheSetDto): Promise<void> {
    // Set value with 10 seconds TTL
    await this.cacheService.set(key, body.value, 10);
  }

  @ApiOperation({
    operationId: 'getCacheValue',
    summary: 'Get string value from cache',
  })
  @ApiOkResponse({
    type: CacheGetResponseDto,
    description: 'Returns the cached string value or null if not found/expired',
  })
  @IgnoreAuthGuard()
  @IgnoreGcpServiceAccountGuard()
  @Get('/external/cache')
  @Log()
  async getCacheValue(): Promise<CacheGetResponseDto> {
    const value = await this.cacheService.get(key);
    return { value };
  }
}
