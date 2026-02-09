import { db } from '$lib/server/db/config';
import { RefreshTokenSchema } from '$lib/server/db/schema';
import { and, eq } from 'drizzle-orm';

/**
 * 销毁 refresh token
 *
 * @param userId 用户 ID
 * @param refreshToken 刷新 token
 */
export async function revokeRefreshTokenDb(userId: string) {
	await db.delete(RefreshTokenSchema).where(and(eq(RefreshTokenSchema.userId, userId)));
}
/**
 * 保存 refresh token
 *
 * @param userId 用户 ID
 * @param refreshToken 刷新 token
 * @param expiresAt 过期时间
 */
export async function saveRefreshTokenDb(userId: string, refreshToken: string, expiresAt: string) {
	await db.transaction(async (tx) => {
		// 删除该用户旧的刷新令牌（避免多设备登录，可选）
		await tx.delete(RefreshTokenSchema).where(eq(RefreshTokenSchema.userId, userId));
		// 保存刷新令牌
		await tx.insert(RefreshTokenSchema).values({
			userId: userId,
			refreshToken,
			expiresAt: expiresAt
		});
	});
}
