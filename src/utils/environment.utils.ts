export enum Environment {
  LOCAL = 'local',
  DEV = 'dev',
  STG = 'stg',
  INTEGRATION_TEST = 'integration-test',
}

export function getEnvironment(): Environment {
  switch (process.env.ENV) {
    case 'local':
      return Environment.LOCAL;
    case 'dev':
      return Environment.DEV;
    case 'stg':
      return Environment.STG;
    case 'integration-test':
      return Environment.INTEGRATION_TEST;
    default:
      throw new Error(
        `Invalid environment: ${(process.env.ENV ?? 'undefined').toString()}`,
      );
  }
}

export function isLocalEnvironment(): boolean {
  return getEnvironment() === Environment.LOCAL;
}

export function isIntegrationTestEnvironment(): boolean {
  return getEnvironment() === Environment.INTEGRATION_TEST;
}
