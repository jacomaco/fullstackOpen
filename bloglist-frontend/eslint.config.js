import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist', 'node_modules'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: 'module'
      }
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      'react/prop-types': 'off',
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,

      'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],

      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }
      ],

      // Styling
      'indent': ['error', 2],
      'quotes': ['error', 'single'],
      'semi': ['error', 'never'],
      'object-curly-spacing': ['error', 'always'],
      'no-console': 'warn',
      'eqeqeq': 'error',
    },
    settings: {
      react: { version: 'detect' }
    }
  }
]