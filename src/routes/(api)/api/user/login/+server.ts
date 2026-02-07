import { createApiHandler } from '$lib/server/common/route-handler';
import { HttpApiError, HttpResponse } from '$lib/server/common/http-response';
import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db/config';
import { SysUserLoginValidator, type SysUserLoginInput } from '$lib/zod/user';
import { userSchema } from '$lib/server/db/schema';
import { and, eq } from 'drizzle-orm';
import { generateJwtToken } from '$lib/server/common/token';

type LoginResponse = {
	token: string;
};

/**
 * 用户邮箱密码登录
 */
export const POST = createApiHandler(async (event) => {
	const body = (await event.request.json()) as SysUserLoginInput;
	SysUserLoginValidator.parse(body);
	// 开始登录
	const result = await db
		.select({
			id: userSchema.id
		})
		.from(userSchema)
		.where(and(eq(userSchema.email, body.email), eq(userSchema.hashedPassword, body.password)));
	if (!result || result.length === 0) {
		throw new HttpApiError('邮箱或密码错误，请重新输入');
	}
	const [loginUser] = result;
	// 登录成功，生成 JWT 令牌
	const token = await generateJwtToken({ userId: loginUser.id, email: body.email });
	return json(HttpResponse.success<LoginResponse>({ token }));
});
