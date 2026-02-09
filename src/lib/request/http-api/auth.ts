import alovaInstance from '$lib/request/alova';
import type { HttpApiResponse } from '$lib/request/http-response';
import type { SysUserLoginInput } from '$lib/zod/user';

// 用户登录响应
export type LoginResponse = {
	accessToken: string;
	refreshToken: string;
	expiresAt: string;
	userId: string;
};
// 用户登录api
export const userLoginApi = (loginFormData: SysUserLoginInput) =>
	alovaInstance.Post<HttpApiResponse<LoginResponse>>('/api/auth/login', loginFormData);

// 用户注销登录api
export const logoutUserApi = () => alovaInstance.Post<HttpApiResponse<boolean>>('/api/auth/logout');

// 用户刷新令牌api
export const refreshTokenApi = () =>
	alovaInstance.Post<HttpApiResponse<LoginResponse>>('/api/auth/refresh');
