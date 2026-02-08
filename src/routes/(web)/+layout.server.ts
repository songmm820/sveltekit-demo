/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from '$lib/server/db/config';
import { UserSchema } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { LayoutServerLoad } from './$types';
import { setLoginUser } from '$lib/stores/login-user-store.svelte';

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

export const load: LayoutServerLoad<{ user: LoginUserData } | void> = async ({ route, locals }) => {
	const userId = locals.loginUser?.userId;
	const user = await queryLoginUserInfoByUserId(String(userId)!);
	if (!user) return;
	setLoginUser(user);
	return { user };
};
