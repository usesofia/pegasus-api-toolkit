import { NestApplicationOptions } from '@nestjs/common';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
export declare function setupApp({ app, version, }: {
    app: NestFastifyApplication;
    version: string;
}): void;
export declare const appOptions: NestApplicationOptions;
export declare const fastifyOptions: {
    bodyLimit: number;
};
