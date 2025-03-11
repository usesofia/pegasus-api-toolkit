import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';
export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  eslintConfigPrettier,
  {
    rules: {
      '@typescript-eslint/no-misused-spread': 'off',
      '@typescript-eslint/no-extraneous-class': 'off',
      'no-restricted-imports': [
        'error',
        {
          patterns: ['.*', 'src/*', 'test/*'],
        },
      ],
    },
  },
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    ignores: [
      'tsconfig.json',
      'eslint.config.mjs',
      '**/dist',
      '**/node_modules',
      '**/coverage',
      '**/*.js',
      '**/test/**',
    ],
  },
);
