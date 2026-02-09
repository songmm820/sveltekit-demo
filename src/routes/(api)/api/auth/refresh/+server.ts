import { createApiHandler } from '$lib/server/common/route-handler';
import { HttpResponse, HttpResponseCodeEnum } from '$lib/request/http-response';
import { json } from '@sveltejs/kit';
import { KeyRefreshToken } from '$lib/stores/user-auth';
import { getTokenExpDatetime, verifyJwtToken } from '$lib/server/common/token';
import { db } from '$lib/server/db/config';
import { RefreshTokenSchema } from '$lib/server/db/schema';
import { and, eq, gt } from 'drizzle-orm';
import { refreshTokenService, setLoginCookies } from '$lib/server/action/login-action';
import type { LoginResponse } from '$lib/request/http-api/auth';

// 查询刷新 token 从数据库
async function queryRefreshTokenFromDb(userId: string, refreshToken: string) {
	const now = new Date().toISOString();
	const [token] = await db
		.select()
		.from(RefreshTokenSchema)
		.where(
			and(
				eq(RefreshTokenSchema.userId, userId),
				eq(RefreshTokenSchema.refreshToken, refreshToken),
				gt(RefreshTokenSchema.expiresAt, now)
			)
		);
	return token;
}

/**
 * 刷新 token
 */
export const POST = createApiHandler(async ({ cookies, locals }) => {
	const userId = locals.loginUser?.userId;
	// 获取刷新 token
	const oldRefreshToken = cookies.get(KeyRefreshToken);
	if (!oldRefreshToken) {
		return json(HttpResponse.errorByCode(HttpResponseCodeEnum.NullToken));
	}
	// 校验刷新 token
	const refreshTokenPayload = await verifyJwtToken(oldRefreshToken);
	if (!refreshTokenPayload) {
		return json(HttpResponse.errorByCode(HttpResponseCodeEnum.TokenExpired));
	}
	const token = await queryRefreshTokenFromDb(userId!, oldRefreshToken);
	if (!token) {
		return json(HttpResponse.errorByCode(HttpResponseCodeEnum.TokenExpired));
	}
	const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await refreshTokenService(
		userId!,
	);
	await setLoginCookies(cookies, { accessToken: newAccessToken, refreshToken: newRefreshToken });

	return json(
		HttpResponse.success<LoginResponse>({
			accessToken: newAccessToken,
			refreshToken: newRefreshToken,
			expiresAt: getTokenExpDatetime(newAccessToken)!,
			userId: userId!
		})
	);
});
