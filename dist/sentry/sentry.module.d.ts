import { MiddlewareConsumer, NestModule } from '@nestjs/common';
export declare class SentryModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void;
}
