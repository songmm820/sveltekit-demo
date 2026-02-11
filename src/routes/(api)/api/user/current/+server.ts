import { createApiHandler } from '$lib/server/common/route-handler';
import { HttpApiError, HttpResponse } from '$lib/request/http-response';
import { json } from '@sveltejs/kit';
import { queryUserByIdDb } from '$lib/server/db/action/user';

// 登录用户数据
type LoginUserData = {
	id: string;
	nickName: string;
	email: string;
};

/**
 * 获取当前登录用户信息
 */
export const GET = createApiHandler(async (event) => {
	const userId = event.locals.loginUser?.userId;
	if (!userId) {
		throw new HttpApiError('用户未登录');
	}
	const user = await queryUserByIdDb(userId);
	if (!user) {
		throw new HttpApiError('用户不存在');
	}
	return json(
		HttpResponse.success<LoginUserData>({
			id: user.id,
			nickName: user.nickName,
			email: user.email
		})
	);
});
