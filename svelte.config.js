import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
// import pkg from './package.json' with { type: 'json' };

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess({
		// 用于在标签中启用 CSS 预处理器：PostCSS、SCSS、Less、Stylus 和 SugarSS。
		style: false
	}),

	compilerOptions: {
		// 保留 HTML 注释
		preserveComments: false,
		// 保留 HTML 空格
		preserveWhitespace: false,
	},
	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter(),
		alias: {
			$lib: './src/lib',
			$css: './src/css',
			$routes: './src/routes'
		}
	}
};

export default config;
