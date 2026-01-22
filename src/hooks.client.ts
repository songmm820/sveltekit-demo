// 客户端钩子

import type { ClientInit } from '@sveltejs/kit';

/**
 * 该函数在 SvelteKit 客户端启动时调用一次。
 * 它可以用于初始化应用程序，例如连接数据库、设置缓存或加载配置。
 * @see https://svelte.dev/docs/kit/hooks#Shared-hooks-init
 */
export const init: ClientInit = async () => {
	// 初始化应用
	// eslint-disable-next-line no-console
	console.log('初始化应用 FROM CLIENT');
};
