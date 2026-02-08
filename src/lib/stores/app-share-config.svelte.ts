import Cookies from 'js-cookie';

export type AppShareConfig = {
	// 是否允许cookie
	allowCookie?: 'NO_SETTING' | 'ALLOWED';
};

// 允许cookie的key
const KEY_ALLOW_COOKIE: string = 'AllowCookie';

export const appShareConfig: AppShareConfig = $state({});

/**
 * 获取是否允许使用cookie
 *
 * @returns 是否允许使用cookie
 */
export function getAllowCookie() {
	// 从cookie中获取是否允许使用cookie
	const value = Cookies.get(KEY_ALLOW_COOKIE) as AppShareConfig['allowCookie'];
	appShareConfig.allowCookie = value || 'NO_SETTING';
	return value;
}

/**
 * 设置是否允许使用cookie
 *
 * @param allowCookie 是否允许使用cookie
 */
export function setAllowCookie(allowCookie: boolean) {
	if (allowCookie) {
		appShareConfig.allowCookie = 'ALLOWED';
		// 保存到cookie
		Cookies.set(KEY_ALLOW_COOKIE, allowCookie.toString(), {
			httpOnly: false,
			sameSite: 'strict'
		});
	}
}
