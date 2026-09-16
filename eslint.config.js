import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist', 'node_modules', 'playwright-report', 'test-results', 'public'] },

  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      /* Catches the accessibility regressions this rebuild set out to fix, so
         they cannot quietly come back: missing labels, non-interactive elements
         given handlers, invalid ARIA, and so on. */
      'jsx-a11y': jsxA11y,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.flatConfigs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      /* Anchors here are in-page hashes and router links, both legitimate. */
      'jsx-a11y/anchor-is-valid': 'off',
    },
  },

  /* Build scripts and serverless handlers run on the server, not the browser. */
  {
    files: ['scripts/**/*.{ts,mjs}', 'api/**/*.ts', 'vite.config.ts', '*.config.js'],
    languageOptions: { globals: globals.node },
    rules: {
      'no-console': 'off',
    },
  },
);
