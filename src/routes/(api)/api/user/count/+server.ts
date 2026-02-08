import { db } from '$lib/server/db/config';
import { UserSchema } from '$lib/server/db/schema';
import { json } from '@sveltejs/kit';
import { createApiHandler } from '$lib/server/common/route-handler';
import { HttpResponse } from '$lib/request/http-response';

/**
 * 获取用户总数
 */
export const GET = createApiHandler(async () => {
	const userCountList = await db.$count(UserSchema);
	return json(HttpResponse.success(userCountList) );
});
