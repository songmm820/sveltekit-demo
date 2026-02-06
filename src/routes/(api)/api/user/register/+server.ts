import { SysUserRegisterValidator, userSchema, type SysUserRegisterInput } from '$lib/server/db/schema';
import { createApiHandler } from '$lib/server/common/route-handler';
import { HttpApiError, HttpResponse } from '$lib/server/common/http-response';
import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db/config';

/**
 * 注册用户
 */
export const POST = createApiHandler(async (event) => {
	const body = await event.request.json() as SysUserRegisterInput;
	SysUserRegisterValidator.parse(body);
	// 开始注册
	const result = await db.insert(userSchema).values({
		nickName: body.nickName,
		email: body.email,
		hashedPassword: body.password,
	});
	if(result.rowsAffected === 0) {
		throw new HttpApiError('用户注册失败');
	}
	return json(HttpResponse.success());
});
