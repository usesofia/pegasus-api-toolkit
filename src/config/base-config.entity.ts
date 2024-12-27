import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { Environment } from '../utils/environment.utils';
import { safeInstantiateEntity } from '../utils/entity.utils';

export const BaseConfigSchema = z.object({
  env: z.nativeEnum(Environment),
  nodeEnv: z.enum(['development', 'production']),
  databases: z.array(
    z.object({
      type: z.enum(['mongodb']),
      uri: z.string(),
    }),
  ),
  auth: z
    .object({
      applyAuthGuardToAllRoutes: z.boolean(),
      applyGcpServiceAccountGuardToAllRoutes: z.boolean(),
    })
    .refine(
      (data) =>
        !(
          data.applyAuthGuardToAllRoutes &&
          data.applyGcpServiceAccountGuardToAllRoutes
        ),
      {
        message:
          'Cannot apply both auth guard and GCP service account guard to all routes simultaneously.',
        path: ['auth'],
      },
    ),
  logger: z.object({
    level: z.enum(['log', 'error', 'warn', 'debug']),
    consoleLog: z.boolean(),
    betterStackSourceToken: z.string(),
  }),
  gcp: z.object({
    location: z.string(),
    credentials: z.object({
      type: z.string(),
      project_id: z.string(),
      private_key_id: z.string(),
      private_key: z.string(),
      client_email: z.string(),
      client_id: z.string(),
      auth_uri: z.string(),
      token_uri: z.string(),
      auth_provider_x509_cert_url: z.string(),
      client_x509_cert_url: z.string(),
      universe_domain: z.string(),
    }),
  }),
  clerk: z.object({
    domain: z.string(),
    secretKey: z.string(),
    jwtKey: z.string(),
  }),
  cache: z.object({
    type: z.enum(['redis', 'memory']),
    ttlInSeconds: z.number(),
    redis: z
      .object({
        url: z.string(),
        keyPrefix: z.string(),
        ssl: z.boolean().optional().default(true),
      })
      .optional(),
  }),
  pubSub: z.object({
    topics: z.object({
      cacheHitOnGetAuthUser: z.string(),
    }),
  }),
});

export class BaseConfigEntity extends createZodDto(BaseConfigSchema) {
  static build(input: z.infer<typeof BaseConfigSchema>): BaseConfigEntity {
    return safeInstantiateEntity(BaseConfigEntity, input);
  }
}

export const BASE_CONFIG = Symbol('BaseConfig');
