const dotenv = require('dotenv');

dotenv.config({ path: '.env.integration-test' });

// jest.integration.config.js
const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  preset: 'ts-jest',
  testMatch: ['**/*.test.ts'],
  testEnvironment: 'node',
  globalSetup: './test/global-setup-integration-tests.ts',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testTimeout: 120000,
  maxWorkers: process.env.CI
    ? 4
    : process.env.N_INTEGRATION_TEST_WORKERS
      ? parseInt(process.env.N_INTEGRATION_TEST_WORKERS)
      : 4,
  collectCoverage: true,
  coverageDirectory: './coverage/integration',
  coverageReporters: ['text-summary', 'json', 'html', 'json-summary', 'lcov'],
  collectCoverageFrom: ['src/**/*.{js,ts}'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      {
        jsc: {
          parser: {
            syntax: 'typescript',
            tsx: true,
            decorators: true,
          },
          transform: {
            legacyDecorator: true,
            decoratorMetadata: true,
          },
        },
        module: { type: 'es6' },
      },
    ],
  },
};
