/* eslint-disable no-console */
// 客户端钩子

import type { ClientInit, HandleClientError } from '@sveltejs/kit';
/**
 * 该函数在 SvelteKit 客户端启动时调用一次。
 * 它可以用于初始化应用程序，例如连接数据库、设置缓存或加载配置。
 * @see https://svelte.dev/docs/kit/hooks#Shared-hooks-init
 */
export const init: ClientInit = async () => {
	// 初始化应用
	console.log('初始化应用 FROM CLIENT');
};

/**
 * 该函数在 SvelteKit 客户端发生错误时调用。
 * 它可以用于记录错误、通知用户或执行其他自定义操作。
 * @see https://svelte.dev/docs/kit/hooks#Shared-hooks-handleError
 */
export const handleError: HandleClientError = ({ error }) => {
	// 处理客户端错误
	console.error('客户端错误:', error);
	// 可以添加日志记录、通知用户等
};
