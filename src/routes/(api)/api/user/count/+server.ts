import { db } from '$lib/server/db/config';
import { userSchema } from '$lib/server/db/schema';
import { json } from '@sveltejs/kit';
import { createApiHandler } from '$lib/server/common/route-handler';
import { HttpResponse } from '$lib/server/common/http-response';

/**
 * 获取用户总数
 */
export const GET = createApiHandler(async () => {
	const userCountList = await db.$count(userSchema);
	return json(HttpResponse.success(userCountList) );
});
