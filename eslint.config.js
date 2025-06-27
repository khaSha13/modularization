// eslint.config.js
// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import * as importPlugin from 'eslint-plugin-import';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    plugins: {
      import: importPlugin
    },
    languageOptions: {
      parserOptions: {
        sourceType: "module",
        project: './tsconfig.json',
      },
      globals: {
        process: "readonly"
      }
    },
    files: ['src/**/*.{ts,js}'],
    rules: {
      "import/no-commonjs": "error",
      "@typescript-eslint/explicit-module-boundary-types": "error"
    },
  }
);
