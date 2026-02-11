import { createApiHandler } from '$lib/server/common/route-handler';
import { HttpApiError, HttpResponse } from '$lib/request/http-response';
import { json } from '@sveltejs/kit';
import { comparePassword } from '$lib/server/common/password';
import {
	generateAccessToken,
	generateRefreshToken,
	getTokenExpDatetime,
	type JwtPayload
} from '$lib/server/common/token';
import { setLoginCookies } from '$lib/server/service/login-action';
import type { LoginResponse } from '$lib/request/http-api/auth';
import { saveRefreshTokenDb } from '$lib/server/db/action/auth';
import { HttpResponseCodeEnum } from '$lib/request/http-code';
import { SysUserLoginValidator, type SysUserLoginInput } from '$lib/zod/user';
import { queryUserByEmailDb } from '$lib/server/db/action/user';

/**
 * 用户邮箱密码登录
 */
export const POST = createApiHandler(async (event) => {
	const body = (await event.request.json()) as SysUserLoginInput;
	SysUserLoginValidator.parse(body);
	// 开始登录
	const user = await queryUserByEmailDb(body.email);
	// 检查用户是否存在
	if (!user) {
		throw new HttpApiError(HttpResponseCodeEnum.EmailNoRegister);
	}
	// 验证密码
	const passwordValid = await comparePassword(body.password, user.hashedPassword);
	if (!passwordValid) {
		throw new HttpApiError(HttpResponseCodeEnum.PasswordError);
	}
	const payload: JwtPayload = {
		userId: String(user.id)
	};
	// 签发双令牌
	const [accessToken, refreshToken] = await Promise.all([
		generateAccessToken(payload),
		generateRefreshToken(payload)
	]);
	// 获取刷新令牌过期时间（
	const expiresAt = getTokenExpDatetime(refreshToken);
	if (!expiresAt) {
		throw new HttpApiError(HttpResponseCodeEnum.ServerError);
	}
	// 处理刷新令牌
	await saveRefreshTokenDb(String(user.id), refreshToken, expiresAt);
	// 登录成功，设置登录 Cookie
	await setLoginCookies(event.cookies, { accessToken, refreshToken });
	// 登录成功，生成 JWT 令牌
	return json(
		HttpResponse.success<LoginResponse>({
			accessToken,
			refreshToken,
			expiresAt,
			userId: String(user.id)
		})
	);
});
