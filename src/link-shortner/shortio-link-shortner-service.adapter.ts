import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { LinkShortnerServicePort } from '@app/link-shortner/link-shortner-service.port';
import { Base } from '@app/base';
import { BaseConfigEntity, BASE_CONFIG } from '@app/config/base-config.entity';
import { LOGGER_SERVICE_PORT } from '@app/logger/logger.module';
import { ClsService } from 'nestjs-cls';
import { Log } from '@app/utils/log.utils';
import axios from 'axios';

interface ShortioResponse {
  shortURL: string;
}

@Injectable()
export class ShortioLinkShortnerServiceAdapter
  extends Base
  implements LinkShortnerServicePort
{
  constructor(
    @Inject(BASE_CONFIG)
    protected readonly baseConfig: BaseConfigEntity,
    @Inject(LOGGER_SERVICE_PORT) protected readonly logger: LoggerService,
    protected readonly cls: ClsService,
  ) {
    super(ShortioLinkShortnerServiceAdapter.name, baseConfig, logger, cls);
  }

  @Log()
  async createShortLink(url: string): Promise<string> {
    if (!this.baseConfig.shortio) {
      throw new Error('Short.io configuration is not set.');
    }

    const response = await axios.post<ShortioResponse>(
      'https://api.short.io/links',
      {
        originalURL: url,
        domain: this.baseConfig.shortio.domain,
      },
      {
        headers: {
          Authorization: this.baseConfig.shortio.apiKey,
        },
      },
    );

    return response.data.shortURL;
  }
}
