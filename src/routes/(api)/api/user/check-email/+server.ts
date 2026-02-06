import { HttpApiError, HttpResponse } from '$lib/server/common/http-response';
import { createApiHandler } from '$lib/server/common/route-handler';
import { db } from '$lib/server/db/config';
import { userSchema } from '$lib/server/db/schema';
import { json } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

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
	const user = await db?.select().from(userSchema).where(eq(userSchema.email, searchEmail)).limit(1);
	const isExist = user && user.length > 0;
	return json(HttpResponse.success(isExist) );
});
