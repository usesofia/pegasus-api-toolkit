export enum Environment {
  LOCAL = 'local',
  DEV = 'dev',
  INTEGRATION_TEST = 'integration-test',
}

export function getEnvironment(): Environment {
  switch (process.env.ENV) {
    case 'local':
      return Environment.LOCAL;
    case 'dev':
      return Environment.DEV;
    case 'integration-test':
      return Environment.INTEGRATION_TEST;
    default:
      throw new Error('Invalid environment.');
  }
}
