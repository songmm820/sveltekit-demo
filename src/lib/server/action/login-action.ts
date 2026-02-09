// 登录操作

import { KeyAccessToken, KeyRefreshToken } from '$lib/stores/user-auth';
import type { RequestEvent } from '@sveltejs/kit';
import { db } from '$lib/server/db/config';
import { RefreshTokenSchema } from '$lib/server/db/schema';
import { and, eq } from 'drizzle-orm';
import { generateAccessToken, generateRefreshToken } from '$lib/server/common/token';

/**
 * accessToken 需要设置httpOnly为false，以便前端可以读取到accessToken，获取登录状态
 * refreshToken 需要设置httpOnly为true，防止前端脚本读取到refreshToken，防止CSRF攻击
 *
 * @param cookies 请求事件的cookies对象
 * @param val 登录凭证
 */
export async function setLoginCookies(
	cookies: RequestEvent['cookies'],
	val: { accessToken: string; refreshToken: string }
) {
	// 设置访问令牌 Cookie
	cookies.set(KeyAccessToken, val.accessToken, {
		httpOnly: false,
		sameSite: 'strict',
		path: '/'
	});
	// 设置刷新令牌 Cookie
	cookies.set(KeyRefreshToken, val.refreshToken, {
		httpOnly: true,
		sameSite: 'strict',
		path: '/'
	});
}

/**
 * 登出操作，清除访问令牌和刷新令牌Cookie
 *
 *  @param cookies 请求事件的cookies对象
 */
export async function clearLoginCookies(cookies: RequestEvent['cookies']) {
	// 清除访问令牌和刷新令牌 Cookie
	cookies.delete(KeyAccessToken, {
		httpOnly: false,
		sameSite: 'strict',
		path: '/'
	});
	cookies.delete(KeyRefreshToken, {
		httpOnly: true,
		sameSite: 'strict',
		path: '/'
	});
}

// 删除刷新 token 从数据库
async function deleteRefreshTokenFromDb(userId: string) {
	await db.delete(RefreshTokenSchema).where(and(eq(RefreshTokenSchema.userId, userId)));
}

/**
 * 刷新令牌
 */
export async function refreshTokenService(userId: string) {
	// 删除旧的刷新 token
	await deleteRefreshTokenFromDb(userId!);
	// 签发新的访问令牌
	const [newAccessToken, newRefreshToken] = await Promise.all([
		generateAccessToken({ userId: userId! }),
		generateRefreshToken({ userId: userId! })
	]);

	return {
		accessToken: newAccessToken,
		refreshToken: newRefreshToken
	};
}
