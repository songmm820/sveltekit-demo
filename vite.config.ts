import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit(), enhancedImages()],

	build: {
		rollupOptions: {
			output: {
				manualChunks(id) {
					// 将 components 目录所有组件打包成一个chunk
					if (id.includes('/src/lib/components/') || id.includes('/src/components/')) {
						// 将这些文件打包到名为 "components" 的 chunk 中
						return 'components';
					}
					// 第三方库
					if (id.includes('node_modules')) {
						return 'vendor';
					}
				}
			}
		}
	}
});
