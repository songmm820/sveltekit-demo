import { createApiHandler } from '$lib/server/common/route-handler';
import { HttpApiError, HttpResponse } from '$lib/request/http-response';
import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db/config';
import { UserSchema } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

// 登录用户数据
type LoginUserData = {
	id: string;
	nickName: string;
	email: string;
};

/**
 * 根据用户ID查询用户信息
 *
 * @param userId 用户id
 */
async function queryLoginUserInfoByUserId(userId: string): Promise<LoginUserData> {
	// 基于用户ID查询数据
	const [user] = await db
		.select({
			id: UserSchema.id,
			nickName: UserSchema.nickName,
			email: UserSchema.email
		})
		.from(UserSchema)
		.where(eq(UserSchema.id, String(userId)));
	return user;
}

/**
 * 获取当前登录用户信息
 */
export const GET = createApiHandler(async (event) => {
	const userId = event.locals.loginUser?.userId;
	if (!userId) {
		throw new HttpApiError('用户未登录');
	}
	const user = await queryLoginUserInfoByUserId(userId);
	if (!user) {
		throw new HttpApiError('用户不存在');
	}
	return json(
		HttpResponse.success<LoginUserData>(user)
	);
});
