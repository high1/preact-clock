import e18e from '@e18e/eslint-plugin';
import react from '@eslint-react/eslint-plugin';
import css from '@eslint/css';
import eslint from '@eslint/js';
import json from '@eslint/json';
import markdown from '@eslint/markdown';
import html from '@html-eslint/eslint-plugin';
import signals from '@preact/eslint-plugin-signals';
import stylistic from '@stylistic/eslint-plugin';
import { importX } from 'eslint-plugin-import-x';
import jsxA11yX from 'eslint-plugin-jsx-a11y-x';
import { configs as perfectionistConfigs } from 'eslint-plugin-perfectionist';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import { configs as ymlConfigs } from 'eslint-plugin-yml';
import { defineConfig, globalIgnores, includeIgnoreFile } from 'eslint/config';
import { fileURLToPath } from 'node:url';
import { configs as tseslintConfigs } from 'typescript-eslint';

import requireSpaceAfterControlParen from '#/eslint-rule';

export default defineConfig(
  includeIgnoreFile(fileURLToPath(new URL('.gitignore', import.meta.url))),
  globalIgnores(['pnpm-lock.yaml']),
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  },
  {
    extends: [
      eslint.configs.recommended,
      tseslintConfigs.strictTypeChecked,
      tseslintConfigs.stylisticTypeChecked,
      e18e.configs.recommended,
      jsxA11yX.configs.strict,
      react.configs['strict-type-checked'],
      importX.flatConfigs.recommended,
      importX.flatConfigs.typescript,
      stylistic.configs.customize({
        semi: true,
      }),
      perfectionistConfigs['recommended-natural'],
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        ...jsxA11yX.configs.strict.languageOptions,
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      local: {
        rules: { 'space-after-control-paren': requireSpaceAfterControlParen },
      },
      signals,
    },
    rules: {
      '@typescript-eslint/no-import-type-side-effects': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        { allowNumber: true },
      ],
      'curly': ['error', 'multi-or-nest'],
      'local/space-after-control-paren': 'error',
      'signals/no-conditional-value-read': 'error',
      'signals/no-signal-in-component-body': 'error',
      'signals/no-signal-truthiness': 'error',
      'signals/no-signal-write-in-computed': 'error',
      'signals/no-useless-computed': 'error',
      'signals/no-value-after-await': 'error',
    },
  },
  {
    extends: [json.configs.recommended, prettierRecommended],
    files: ['**/*.json'],
    language: 'json/json',
    rules: { 'json/sort-keys': ['error', 'asc', { natural: true }] },
  },
  {
    // pnpm writes package.json keys alphabetically.
    files: ['package.json'],
    rules: { 'json/sort-keys': ['error', 'asc'] },
  },
  {
    extends: [
      ymlConfigs.recommended,
      prettierRecommended,
      ymlConfigs.prettier,
    ],
    files: ['**/*.{yml,yaml}'],
  },
  {
    extends: [css.configs.recommended, prettierRecommended],
    files: ['**/*.css'],
    language: 'css/css',
    rules: {
      'css/no-invalid-at-rules': 'off',
    },
  },
  {
    extends: [html.configs.recommended],
    files: ['**/*.html'],
    language: 'html/html',
    rules: {
      'html/attrs-newline': [
        'error',
        { closeStyle: 'newline', ifAttrsMoreThan: 3 },
      ],
      'html/indent': ['error', 2],
      'html/no-trailing-spaces': 'error',
    },
  },
  {
    extends: [markdown.configs.recommended, prettierRecommended],
    files: ['**/*.md'],
    language: 'markdown/commonmark',
  },
);
