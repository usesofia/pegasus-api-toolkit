import { safeInstantiateEntity } from '@app/utils/entity.utils';
import { Environment } from '@app/utils/environment.utils';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const BaseConfigSchema = z.object({
  env: z.nativeEnum(Environment),
  nodeEnv: z.enum(['development', 'production']),
  databases: z.array(
    z.object({
      type: z.enum(['mongodb', 'postgres']),
      uri: z.string(),
      transactionTimeoutInMiliseconds: z.number().optional().default(5000),
      nTransactionRetries: z.number().optional().default(7),
      maxDelayBetweenTransactionAttempts: z.number().optional().default(2000),
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
    betterStackEndpoint: z.string().optional(),
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
  objectStorage: z.object({
    organizationFilesBucket: z.object({
      name: z.string(),
      projectId: z.string(),
      clientEmail: z.string(),
      privateKey: z.string(),
      audience: z.string(),
      subjectTokenType: z.string(),
    }),
  }),
  clerk: z.object({
    domain: z.string(),
    secretKey: z.string(),
    jwtKey: z.string(),
  }),
  cache: z.object({
    type: z.enum(['redis', 'memory', 'mongodb']),
    ttlInSeconds: z.number(),
    redis: z
      .object({
        url: z.string(),
        keyPrefix: z.string(),
        ssl: z.boolean().optional().default(true),
      })
      .optional(),
    mongodb: z
      .object({
        keyPrefix: z.string(),
      })
      .optional(),
  }),
  swagger: z.object({
    title: z.string(),
    description: z.string(),
  }),
  microservices: z.array(
    z.object({
      name: z.string(),
      internalBaseUrl: z.string(),
    }),
  ),
  tasks: z.object({
    secret: z.string(),
  }),
  email: z.object({
    sendgrid: z.object({
      apiKey: z.string(),
    }),
  }),
});

export class BaseConfigEntity extends createZodDto(BaseConfigSchema) {
  static build(input: z.input<typeof BaseConfigSchema>): BaseConfigEntity {
    return safeInstantiateEntity(BaseConfigEntity, input);
  }
}

export const BASE_CONFIG = Symbol('BaseConfig');
