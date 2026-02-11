import { HttpApiError, HttpResponse } from '$lib/request/http-response';
import { createApiHandler } from '$lib/server/common/route-handler';
import { queryUserByEmailDb } from '$lib/server/db/action/user';
import { json } from '@sveltejs/kit';

/**
 * 检查邮箱是否已注册
 */
export const GET = createApiHandler(async (event) => {
	const url = event.url;
	// 从URL中获取邮箱参数
	const email = url.searchParams.get('email');
	if (!email) {
		throw new HttpApiError('邮箱不能为空');
	}
	const searchEmail = email.trim().toLowerCase();
	const user = await queryUserByEmailDb(searchEmail);
	const isExist = Boolean(user);
	return json(HttpResponse.success(isExist));
});
