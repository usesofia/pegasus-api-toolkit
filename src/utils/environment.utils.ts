export enum Environment {
  LOCAL = 'local',
  DEV = 'dev',
  STG = 'stg',
  INTEGRATION_TEST = 'integration-test',
  PROD = 'prod',
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
    case 'prod':
      return Environment.PROD;
    default:
      throw new Error(
        `Invalid environment: ${process.env.ENV ?? 'undefined'}`,
      );
  }
}

export function isLocalEnvironment(): boolean {
  return getEnvironment() === Environment.LOCAL;
}

export function isIntegrationTestEnvironment(): boolean {
  return getEnvironment() === Environment.INTEGRATION_TEST;
}

export function isCli(): boolean {
	return process.env.CLI === "true";
}