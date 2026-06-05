import js from '@eslint/js'
import nextPlugin from '@next/eslint-plugin-next'
import tsParser from '@typescript-eslint/parser'
import globals from 'globals'

export default [
  {
    ignores: [
      'node_modules',
      '.next',
      'out',
      'build',
      'generated',
    ],
  },

  js.configs.recommended,

  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      sourceType: 'module',
      ecmaVersion: 'latest',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

    plugins: {
      '@next/next': nextPlugin,
    },

    rules: {
      '@next/next/no-html-link-for-pages': 'off',
      'no-unused-vars': 'warn',
    },
  },
]