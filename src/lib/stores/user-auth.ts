import Cookies from 'js-cookie';

// 访问令牌的key
export const KeyAccessToken: string = 'AccessToken';
// 刷新令牌的key
export const KeyRefreshToken: string = 'RefreshToken';

// 是否已经登录
export const isLoginStore = (): boolean => {
	return Boolean(Cookies.get(KeyAccessToken));
};
