import { NestApplicationOptions } from '@nestjs/common';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { OpenAPIObject } from '@nestjs/swagger';
export declare function setupApp({ app, version, swaggerDocument, }: {
    app: NestFastifyApplication;
    version: string;
    swaggerDocument: Omit<OpenAPIObject, "paths">;
}): void;
export declare const appOptions: NestApplicationOptions;
export declare const fastifyOptions: {
    bodyLimit: number;
};
