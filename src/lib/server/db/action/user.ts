import { db } from '$lib/server/db/config';
import { UserSchema } from '$lib/server/db/schema';
import type { SysUserRegisterInput, SysUserUpdateInput } from '$lib/zod/user';
import { eq } from 'drizzle-orm';

/**
 * 根据邮箱查询用户信息
 *
 * @param email 用户邮箱
 * @returns 用户信息
 */
export async function queryUserByEmailDb(email: string) {
	const [user] = await db
		.select({
			id: UserSchema.id,
			email: UserSchema.email,
			hashedPassword: UserSchema.hashedPassword
		})
		.from(UserSchema)
		.where(eq(UserSchema.email, email))
		.limit(1);
	return user;
}

/**
 * 查询用户总数
 *
 * @returns 用户总数
 */
export async function queryUserCountDb(): Promise<number> {
	return await db.$count(UserSchema);
}

/**
 * 根据用户 ID 查询用户信息
 *
 * @param userId 用户 ID
 * @returns 用户信息
 */
export async function queryUserByIdDb(userId: string) {
	const [user] = await db
		.select({
			id: UserSchema.id,
			email: UserSchema.email,
			nickName: UserSchema.nickName
		})
		.from(UserSchema)
		.where(eq(UserSchema.id, userId))
		.limit(1);
	return user;
}

/**
 * 新增用户
 *
 * @param user 用户信息
 */
export async function insertUserDb(input: SysUserRegisterInput) {
	const { lastInsertId, rowsAffected } = await db.insert(UserSchema).values({
		nickName: input.nickName,
		email: input.email,
		hashedPassword: input.password
	});
	return {
		lastInsertId,
		rowsAffected
	};
}

/**
 * 更新用户信息
 *
 * @param userId 用户 ID
 * @param input 用户信息
 */
export async function updateUserByIdDb(
	userId: string,
	input: SysUserUpdateInput
): Promise<boolean> {
	const { rowsAffected } = await db
		.update(UserSchema)
		.set({
			nickName: input.nickName,
			email: input.email
		})
		.where(eq(UserSchema.id, userId));
	return Number(rowsAffected) > 0;
}
