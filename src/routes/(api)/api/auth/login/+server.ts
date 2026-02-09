import { createApiHandler } from '$lib/server/common/route-handler';
import { HttpApiError, HttpResponse, HttpResponseCodeEnum } from '$lib/request/http-response';
import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db/config';
import { SysUserLoginValidator, type SysUserLoginInput } from '$lib/zod/user';
import { UserSchema } from '$lib/server/db/schema';
import { and, eq } from 'drizzle-orm';
import { comparePassword } from '$lib/server/common/password';
import {
	generateAccessToken,
	generateRefreshToken,
	getTokenExpDatetime,
	type JwtPayload
} from '$lib/server/common/token';
import { RefreshTokenSchema } from '$lib/server/db/schema/auth';
import { setLoginCookies } from '$lib/server/action/login-action';
import type { LoginResponse } from '$lib/request/http-api/auth';

/**
 * 用户邮箱密码登录
 */
export const POST = createApiHandler(async (event) => {
	const body = (await event.request.json()) as SysUserLoginInput;
	SysUserLoginValidator.parse(body);
	// 开始登录
	const [user] = await db
		.select({
			id: UserSchema.id,
			email: UserSchema.email,
			hashedPassword: UserSchema.hashedPassword
		})
		.from(UserSchema)
		.where(and(eq(UserSchema.email, body.email)))
		.limit(1);
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
	await db.transaction(async (tx) => {
		// 删除该用户旧的刷新令牌（避免多设备登录，可选）
		await tx.delete(RefreshTokenSchema).where(eq(RefreshTokenSchema.userId, String(user.id)));
		// 保存刷新令牌
		await tx.insert(RefreshTokenSchema).values({
			userId: String(user.id),
			refreshToken,
			expiresAt: expiresAt
		});
	});

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
