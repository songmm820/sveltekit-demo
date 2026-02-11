import { createApiHandler } from '$lib/server/common/route-handler';
import { HttpResponse } from '$lib/request/http-response';
import { json } from '@sveltejs/kit';
import { clearLoginCookies } from '$lib/server/service/login-action';
import { revokeRefreshTokenDb } from '$lib/server/db/action/auth';

/**
 * 注销登录用户
 */
export const POST = createApiHandler(async ({ cookies, locals }) => {
	// 从 locals 中获取登录用户的 userId
	const userId = locals.loginUser?.userId;
	await Promise.all([revokeRefreshTokenDb(userId!), clearLoginCookies(cookies)]);
	return json(HttpResponse.success<boolean>(true));
});
