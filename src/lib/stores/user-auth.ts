import Cookies from 'js-cookie';

// 访问令牌的key
export const KeyAccessToken: string = 'AccessToken';
// 刷新令牌的key
export const KeyRefreshToken: string = 'RefreshToken';

// 是否已经登录
export const isLoginStore = (): boolean => {
	return Boolean(Cookies.get(KeyAccessToken));
};

/**
 * 存储访问令牌
 *
 * @param accessToken 访问令牌
 */
function setAccessToken(accessToken: string) {
	Cookies.set(KeyAccessToken, accessToken, {
		httpOnly: false,
		sameSite: 'strict'
	});
}

/**
 * 清除访问令牌
 */
function clearAccessToken() {
	Cookies.remove(KeyAccessToken);
}

/**
 * 存储刷新令牌
 *
 * @param refreshToken 刷新令牌
 */
function setRefreshToken(refreshToken: string) {
	Cookies.set(KeyRefreshToken, refreshToken, {
		httpOnly: false,
		sameSite: 'strict'
	});
}

/**
 * 清除刷新令牌
 */
function clearRefreshToken() {
	Cookies.remove(KeyRefreshToken);
}

/**
 * 登录
 *
 * @param accessToken 访问令牌
 * @param refreshToken 刷新令牌
 */
export function loginCookie(accessToken: string, refreshToken: string) {
	setAccessToken(accessToken);
	setRefreshToken(refreshToken);
}

/**
 * 登出
 */
export function logoutCookie() {
	clearAccessToken();
	clearRefreshToken();
}
