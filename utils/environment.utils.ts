export enum Environment {
  LOCAL = 'local',
  DEV = 'dev',
}

export function getEnvironment(): Environment {
  switch (process.env.ENV) {
    case 'local':
      return Environment.LOCAL;
    case 'dev':
      return Environment.DEV;
    default:
      throw new Error('Invalid environment.');
  }
}
