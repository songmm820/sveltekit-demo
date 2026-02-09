// 服务器端钩子
import type { Pathname } from '$app/types';
import { verifyJwtToken } from '$lib/server/common/token';
import { createDb } from '$lib/server/db/config';
import { refreshTokenService, setLoginCookies } from '$lib/server/service/login-action';
import { KeyAccessToken, KeyRefreshToken } from '$lib/stores/user-auth';
import {
	redirect,
	type Handle,
	type HandleFetch,
	type HandleServerError,
	type HandleValidationError,
	type ServerInit
} from '@sveltejs/kit';
import { log } from 'node:console';

// 公共路由，无需登录即可访问
const PublicRoutes: Pathname[] = ['/login', '/register'];
// 公共api路由，无需登录即可访问
const PublicApiRoutes: Pathname[] = ['/api/auth/login', '/api/user/register'];

/**
 * 该函数在 SvelteKit 服务器启动时调用一次。
 * 它可以用于初始化应用程序，例如连接数据库、设置缓存或加载配置。
 * @see https://svelte.dev/docs/kit/hooks#Shared-hooks-init
 */
export const init: ServerInit = async () => {
	// 初始化数据库
	createDb();
};

/**
 * 该函数每次 SvelteKit 服务器接收到请求——无论是在应用运行时，还是在运行期间发生预渲染——并确定回应。
 * 这允许你修改响应头或正体，或者完全绕过SvelteKit（例如程序化路由实现）。
 * @see https://svelte.dev/docs/kit/hooks#Server-hooks-locals
 */
export const handle: Handle = async ({ event, resolve }) => {
	const { cookies } = event;
	// 获取请求路径
	const path = event.url.pathname as Pathname;
	// 如果是公共路由，无需登录即可访问
	if (PublicRoutes.includes(path) || PublicApiRoutes.includes(path)) {
		// 处理响应
		return resolve(event);
	}
	const accessToken = cookies.get(KeyAccessToken);
	const refreshToken = cookies.get(KeyRefreshToken);
	// 如果访问令牌不存在
	if (!refreshToken || !accessToken) {
		// 重定向到登录页
		redirect(302, `/login?redirect=${encodeURIComponent(path)}`);
	}
	// 验证 refresh token, 如果过期，重定向到登录页
	const refreshTokenPayload = await verifyJwtToken(refreshToken);
	if (!refreshTokenPayload) {
		// 重定向到登录页
		redirect(302, `/login?redirect=${encodeURIComponent(path)}`);
	}
	// 验证 access token，如果过期, 尝试使用 refresh token 刷新
	const accessTokenPayload = await verifyJwtToken(accessToken);
	if (!accessTokenPayload) {
		// 刷新 access token
		log(
			`刷新 Access Roken, userId: ${refreshTokenPayload.userId}，时间: ${new Date().toLocaleString()}`
		);
		const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
			await refreshTokenService(refreshTokenPayload.userId);
		await setLoginCookies(cookies, { accessToken: newAccessToken, refreshToken: newRefreshToken });
	}

	event.locals.loginUser = refreshTokenPayload;
	const response = await resolve(event);
	return response;
};

/**
 * 该函数允许你修改（或替换）event.fetch调用在服务器端点（或预渲染期间）运行的端点。
 * 例如，你的函数可能会请求访问公共URL，比如用户在客户端导航到相应页面时。
 * 但在SSR期间，直接访问API可能更合理（绕过它和公共互联网之间的代理和负载均衡器）。
 * @see https://svelte.dev/docs/kit/hooks#Server-hooks-handleFetch
 */
export const handleFetch: HandleFetch = async ({ request, fetch }) => {
	// 处理请求
	const response = await fetch(request);
	// 处理响应
	return response;
};

/**'
 * 该函数允许你修改（或替换）SvelteKit 服务器在处理表单验证错误时返回的响应。
 * 例如，你可能想返回一个自定义错误消息，或者添加额外的元数据。
 * @see https://svelte.dev/docs/kit/hooks#Server-hooks-handleValidationError
 */
export const handleValidationError: HandleValidationError = async ({ issues }) => {
	return {
		message: 'Validation error',
		issues
	};
};

/**
 * 该函数允许你修改（或替换）SvelteKit 服务器在处理错误时返回的响应。
 * 例如，你可能想返回一个自定义错误消息，或者添加额外的元数据。
 * @see https://svelte.dev/docs/kit/hooks#Shared-hooks-handleError
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handleError: HandleServerError = async ({ error, event, status, message }) => {
	// 处理错误
};
