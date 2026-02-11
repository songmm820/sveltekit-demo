import { createApiHandler } from '$lib/server/common/route-handler';
import { HttpApiError, HttpResponse } from '$lib/request/http-response';
import { json } from '@sveltejs/kit';
import { SysUserRegisterValidator, type SysUserRegisterInput } from '$lib/zod/user';
import { hashPassword } from '$lib/server/common/password';
import type { RegisterResponse } from '$lib/request/http-api/user';
import { HttpResponseCodeEnum } from '$lib/request/http-code';
import { insertUserDb, queryUserByEmailDb } from '$lib/server/db/action/user';

/**
 * 注册用户
 */
export const POST = createApiHandler(async (event) => {
	const body = (await event.request.json()) as SysUserRegisterInput;
	SysUserRegisterValidator.parse(body);
	// 判断邮箱是否已存在
	const user = await queryUserByEmailDb(body.email);
	if (user) {
		throw new HttpApiError(HttpResponseCodeEnum.EmailHasRegistered);
	}
	const hashedPassword = await hashPassword(body.password);
	// 开始注册
	const newId = await insertUserDb({
		nickName: body.nickName,
		email: body.email,
		password: hashedPassword,
	});
	if (!newId) {
		throw new HttpApiError('用户注册失败');
	}
	return json(
		HttpResponse.success<RegisterResponse>({
			userId: String(newId)
		})
	);
});
