import { createApiHandler } from '$lib/server/common/route-handler';
import { HttpResponse } from '$lib/request/http-response';
import { json } from '@sveltejs/kit';
import { KeyRefreshToken } from '$lib/stores/user-auth';
import { getTokenExpDatetime, verifyJwtToken } from '$lib/server/common/token';
import { refreshTokenService, setLoginCookies } from '$lib/server/service/login-action';
import type { LoginResponse } from '$lib/request/http-api/auth';
import { HttpResponseCodeEnum } from '$lib/request/http-code';
import { revokeRefreshTokenDb } from '$lib/server/db/action/auth';

/**
 * refresh token
 */
export const POST = createApiHandler(async ({ cookies, locals }) => {
	const userId = locals.loginUser?.userId;
	// 获取 refresh token
	const oldRefreshToken = cookies.get(KeyRefreshToken);
	if (!oldRefreshToken) {
		return json(HttpResponse.errorByCode(HttpResponseCodeEnum.NullToken));
	}
	// 验证 refresh token
	const refreshTokenPayload = await verifyJwtToken(oldRefreshToken);
	if (!refreshTokenPayload) {
		return json(HttpResponse.errorByCode(HttpResponseCodeEnum.AccessTokenExpired));
	}
	// 销毁旧的刷新 token
	await revokeRefreshTokenDb(userId!);
	const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await refreshTokenService(
		userId!
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
