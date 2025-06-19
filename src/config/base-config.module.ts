import { Global, Module } from '@nestjs/common';
import { BASE_CONFIG } from '@app/config/base-config.entity';

@Global()
@Module({
  providers: [
    {
      provide: BASE_CONFIG,
      useValue: {},
    },
  ],
  exports: [BASE_CONFIG],
})
export class BaseConfigModule {}
