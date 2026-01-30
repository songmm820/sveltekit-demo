import prettier from 'eslint-config-prettier';
import { fileURLToPath } from 'node:url';
import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import ts from 'typescript-eslint';
import svelteConfig from './svelte.config.js';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

export default defineConfig(
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs.recommended,
	prettier,
	...svelte.configs.prettier,
	{
		languageOptions: { globals: { ...globals.browser, ...globals.node } }
	},
	{
		files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],

		languageOptions: {
			parserOptions: {
				projectService: true,
				extraFileExtensions: ['.svelte'], // Add support for additional file extensions, such as .svelte
				parser: ts.parser,
				svelteConfig
			}
		}
	},
	{
		rules: {
			// typescript-eslint strongly recommend that you do not use the no-undef lint rule on TypeScript projects.
			// see: https://typescript-eslint.io/troubleshooting/faqs/eslint/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors

			// '@typescript-eslint/no-require-imports': {},
			'no-debugger': 'error',
			'no-console': 'warn',
			// 禁止相对路径引入
			'no-restricted-imports': [
				'error',
				{
					patterns: [
						{
							group: ['*/../*', '../*/*'],
							message: 'Prohibit the use of relative paths.'
						}
					]
				}
			],
			'@typescript-eslint/consistent-type-imports': [
				'error',
				{
					prefer: 'type-imports', // 使用 import type 语法
					fixStyle: 'inline-type-imports' // 强制合并为单条导入（禁止分离）
				}
			],
			'svelte/no-unused-props': 'error',
			'svelte/block-lang': [
				'error',
				{
					enforceScriptPresent: true,
					enforceStylePresent: false,
					script: ['ts'], // a list of languages or null to signify no language specified
					style: 'css' // same as for script, a single value can be used instead of an array.
				}
			],
			'svelte/consistent-selector-style': [
				'error',
				{
					checkGlobal: false,
					style: ['class']
				}
			],
			'svelte/prefer-class-directive': [
				'error',
				{
					prefer: 'always' // or "empty"
				}
			],
			'svelte/require-event-prefix': [
				'error',
				{
					checkAsyncFunctions: true
				}
			]
		}
	}
);
