// 通用钩子
import type { Reroute, Transport } from '@sveltejs/kit';


/**
 * 该函数在 SvelteKit 路由转换之前调用。
 * 它可以用于动态路由，例如根据请求 URL 转换为不同的路由。
 * @see https://svelte.dev/docs/kit/hooks#Universal-hooks-reroute
 */
export const reroute: Reroute = async ({ url }) => {
	return String(url);
};

/**
 * 这是一个传输器的集合，允许你通过服务器/客户端边界传递自定义类型——返回和表动作。
 * 每个传输器包含一个函数，用于编码服务器上的值（或对非该类型实例返回虚假值）
 * @see https://svelte.dev/docs/kit/hooks#Universal-hooks-transport
 */
export const transport: Transport = {};
