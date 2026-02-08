import { db } from '$lib/server/db/config';
import { UserSchema } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

/**
 * 根据用户ID查询用户信息
 *
 * @param userId 用户id
 */
async function queryLoginUserInfoByUserId(userId: string) {
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

export const load: PageServerLoad = async ({ locals }) => {
	// 直接使用服务端 locals 中的用户信息
	const userId = locals.loginUser?.userId;
	const user = await queryLoginUserInfoByUserId(String(userId)!);
	if (!user) {
		throw error(404, '当前用户不存在');
	}
	return {
		user
	};
};
