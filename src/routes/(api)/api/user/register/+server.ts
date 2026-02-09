import { createApiHandler } from '$lib/server/common/route-handler';
import { HttpApiError, HttpResponse, HttpResponseCodeEnum } from '$lib/request/http-response';
import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db/config';
import { SysUserRegisterValidator, type SysUserRegisterInput } from '$lib/zod/user';
import { UserSchema } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { hashPassword } from '$lib/server/common/password';
import type { RegisterResponse } from '$lib/request/http-api/user';

/**
 * 注册用户
 */
export const POST = createApiHandler(async (event) => {
	const body = (await event.request.json()) as SysUserRegisterInput;
	SysUserRegisterValidator.parse(body);
	// 判断邮箱是否已存在
	const existUsers = await db
		.select()
		.from(UserSchema)
		.where(eq(UserSchema.email, body.email))
		.limit(1);
	if (existUsers.length > 0) {
		throw new HttpApiError(HttpResponseCodeEnum.EmailHasRegistered);
	}
	const hashedPassword = await hashPassword(body.password);
	// 开始注册
	const { lastInsertId, rowsAffected } = await db.insert(UserSchema).values({
		nickName: body.nickName,
		email: body.email,
		hashedPassword: hashedPassword
	});
	if (rowsAffected === 0) {
		throw new HttpApiError('用户注册失败');
	}
	return json(
		HttpResponse.success<RegisterResponse>({
			userId: String(lastInsertId)
		})
	);
});
