import { DynamicModule, Type } from '@nestjs/common';
export declare function generateSwaggerJson({ AppModule, version, }: {
    AppModule: Type | DynamicModule;
    version: string;
}): Promise<void>;
