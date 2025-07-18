import { fixupConfigRules, fixupPluginRules } from '@eslint/compat'
import { defineConfig, globalIgnores } from 'eslint/config'
import reactRefresh from 'eslint-plugin-react-refresh'
import tsParser from '@typescript-eslint/parser'
import { FlatCompat } from '@eslint/eslintrc'
import _import from 'eslint-plugin-import'
import { fileURLToPath } from 'node:url'
import globals from 'globals'
import path from 'node:path'
import js from '@eslint/js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
})

export default defineConfig([
    globalIgnores([
        '**/dist',
        '**/.eslintrc.cjs',
        '**/plop',
        'plop/**/*',
        '**/plopfile.js',
        '**/.stylelintrc.js'
    ]),
    {
        extends: fixupConfigRules(
            compat.extends(
                'eslint:recommended',
                'airbnb-base',
                'plugin:@typescript-eslint/recommended',
                'plugin:react-hooks/recommended',
                'plugin:storybook/recommended',
                'plugin:perfectionist/recommended-natural-legacy',
                'prettier'
            )
        ),

        plugins: {
            'react-refresh': reactRefresh,
            import: fixupPluginRules(_import)
        },

        languageOptions: {
            globals: {
                ...globals.browser
            },

            parser: tsParser
        },

        settings: {
            'import/parsers': {
                '@typescript-eslint/parser': ['.ts', '.tsx']
            },

            'import/resolver': {
                node: true,

                typescript: {
                    project: '.'
                }
            }
        },

        rules: {
            'perfectionist/sort-imports': [
                'error',
                {
                    type: 'line-length',
                    order: 'desc',
                    ignoreCase: true,
                    specialCharacters: 'keep',
                    internalPattern: ['^~/.+'],
                    tsconfigRootDir: '.',
                    partitionByComment: false,
                    partitionByNewLine: false,
                    newlinesBetween: 'always',

                    groups: [
                        'type',
                        ['builtin', 'external'],
                        'internal-type',
                        'internal',
                        ['parent-type', 'sibling-type', 'index-type'],
                        ['parent', 'sibling', 'index'],
                        'object',
                        'unknown'
                    ],

                    customGroups: {
                        type: {},
                        value: {}
                    },

                    environment: 'node'
                }
            ],

            'perfectionist/sort-objects': ['off'],
            'perfectionist/sort-modules': ['off'],

            indent: [
                'error',
                4,
                {
                    SwitchCase: 1
                }
            ],

            'max-classes-per-file': 'off',
            'import/no-extraneous-dependencies': ['off'],
            'import/no-unresolved': ['error', { ignore: ['^@theme', '^@docusaurus', '^@site'] }],
            'import/prefer-default-export': 'off',
            'import/extensions': 'off',
            'no-bitwise': 'off',
            'no-plusplus': 'off',
            'no-restricted-syntax': ['off', 'ForInStatement'],

            'react-refresh/only-export-components': [
                'warn',
                {
                    allowConstantExport: true
                }
            ],

            'no-shadow': ['off'],
            'arrow-body-style': ['off'],
            'object-curly-spacing': ['error', 'always'],
            'array-bracket-spacing': ['error', 'never'],

            'no-underscore-dangle': [
                'off',
                {
                    allow: ['_'],
                    allowAfterThis: true,
                    allowAfterSuper: true,
                    allowAfterThisConstructor: true,
                    enforceInMethodNames: false
                }
            ],

            semi: ['error', 'never'],
            'comma-dangle': ['off'],

            'brace-style': [
                'error',
                '1tbs',
                {
                    allowSingleLine: true
                }
            ],

            'object-curly-newline': [
                'error',
                {
                    multiline: true,
                    consistent: true
                }
            ],

            'react-hooks/exhaustive-deps': 'off',
            'no-empty-pattern': 'warn',

            '@typescript-eslint/no-empty-object-type': 'off',
            '@typescript-eslint/no-unsafe-function-type': 'error',
            '@typescript-eslint/no-wrapper-object-types': 'error'
        }
    }
])
