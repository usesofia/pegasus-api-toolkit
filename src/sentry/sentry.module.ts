import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SentryMiddleware } from '@app/sentry/sentry.middleware';

@Module({
  imports: [],
  providers: [SentryMiddleware],
  exports: [],
})
export class SentryModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SentryMiddleware).forRoutes('*');
  }
}
