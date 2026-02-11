import Cookies from 'js-cookie';
import { currentLoginUserApi } from '$lib/request/http-api/user';
import { setLoginUser } from '$lib/stores/login-user-store.svelte';

// 访问令牌的key
export const KeyAccessToken: string = 'AccessToken';
// 刷新令牌的key
export const KeyRefreshToken: string = 'RefreshToken';

// 是否已经登录
export const isLoginStore = (): boolean => {
	return Boolean(Cookies.get(KeyAccessToken));
};

/**
 * 获取当前登录用户信息，
 * 如果登录成功，将用户信息存储到登录用户状态中
 */
export async function onGetCurrentLoginUser() {
	const { payload } = await currentLoginUserApi();
	if (payload) {
		setLoginUser(payload);
	}
}
