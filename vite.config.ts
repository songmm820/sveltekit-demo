import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';

export default defineConfig({
	plugins: [
		tailwindcss({
			optimize: {
				minify: true
			}
		}),
		sveltekit(),
		enhancedImages()
	],
	server: {
		// 开发时，端口号为 4143
		port: 4143,
		// 开发时，严格使用端口号 4143
		strictPort: true,
		// 开发时，不自动打开浏览器
		open: false
	},
	preview: {
		// 预览时，端口号为 4143
		port: 4143,
		// 预览时，严格使用端口号 4143
		strictPort: true
	},
	build: {
		// 打包时，每个 chunk 的大小超过 300KB 时，会警告提示
		chunkSizeWarningLimit: 500,
		// 打包时，静态资源的目录为 static/assets
		assetsDir: 'static/assets',
		rollupOptions: {
			output: {
				// 压缩输出的代码
				compact: true,

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
