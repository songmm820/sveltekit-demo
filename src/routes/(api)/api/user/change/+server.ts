import { json } from '@sveltejs/kit';
import { createApiHandler } from '$lib/server/common/route-handler';
import { SysUserUpdateValidator, type SysUserUpdateInput } from '$lib/zod/user';
import { HttpApiError, HttpResponse } from '$lib/request/http-response';
import { updateUserByIdDb } from '$lib/server/db/action/user';

/**
 * 修改用户信息
 */
export const PUT = createApiHandler(async (event) => {
	const body = (await event.request.json()) as SysUserUpdateInput;
	SysUserUpdateValidator.parse(body);
	const { userId } = event.locals?.loginUser || {};
	if (!userId) {
		throw new HttpApiError('修改用户信息失败，用户 ID 不存在');
	}
	const isSuccess = await updateUserByIdDb(userId, body);
	return json(HttpResponse.success<boolean>(isSuccess));
});
