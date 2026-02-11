import { json } from '@sveltejs/kit';
import { createApiHandler } from '$lib/server/common/route-handler';
import { HttpResponse } from '$lib/request/http-response';
import { queryUserCountDb } from '$lib/server/db/action/user';

/**
 * 获取用户总数
 */
export const GET = createApiHandler(async () => {
	const userCount = await queryUserCountDb();
	return json(HttpResponse.success(userCount));
});
