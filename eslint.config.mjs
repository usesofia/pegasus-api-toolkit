import typescriptEslintEslintPlugin from '@typescript-eslint/eslint-plugin';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

const config = compat.extends(
    'plugin:@typescript-eslint/recommended-type-checked',
);

export default [
    {
        ignores: ['tsconfig.json', 'eslint.config.mjs', '**/dist', '**/test', '**/node_modules', '**/coverage', '**/*.js'],
    },
    ...config,
    {
        plugins: {
            "@typescript-eslint": typescriptEslintEslintPlugin,
        },

        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.jest,
            },

            parser: tsParser,
            ecmaVersion: 5,
            sourceType: "module",

            parserOptions: {
                project: './tsconfig.json',
                tsconfigRootDir: __dirname,
            },
        },

        rules: {
            "no-restricted-imports": ["error", {
                "patterns": [".*", "src/*", "test/*"]
            }],
        },
    }
];
