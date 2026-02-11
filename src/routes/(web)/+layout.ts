import type { LayoutLoad } from './$types';

import { browser } from '$app/environment';
import { isLoginStore, onGetCurrentLoginUser } from '$lib/stores/user-auth';

export const load: LayoutLoad = async () => {
	if (!browser) return;
	if (!isLoginStore()) return;
	// 获取当前登录用户信息
	await onGetCurrentLoginUser();
};
