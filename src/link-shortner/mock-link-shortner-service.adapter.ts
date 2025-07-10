import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { LinkShortnerServicePort } from '@app/link-shortner/link-shortner-service.port';
import { Base } from '@app/base';
import { BaseConfigEntity, BASE_CONFIG } from '@app/config/base-config.entity';
import { LOGGER_SERVICE_PORT } from '@app/logger/logger.module';
import { ClsService } from 'nestjs-cls';
import { Log } from '@app/utils/log.utils';

@Injectable()
export class MockLinkShortnerServiceAdapter
  extends Base
  implements LinkShortnerServicePort
{
  constructor(
    @Inject(BASE_CONFIG)
    protected readonly baseConfig: BaseConfigEntity,
    @Inject(LOGGER_SERVICE_PORT) protected readonly logger: LoggerService,
    protected readonly cls: ClsService,
  ) {
    super(MockLinkShortnerServiceAdapter.name, baseConfig, logger, cls);
  }

  @Log()
  createShortLink(url: string): Promise<string> {
    return Promise.resolve(`https://short.io/${url.substring(url.length - 8)}`);
  }
}
