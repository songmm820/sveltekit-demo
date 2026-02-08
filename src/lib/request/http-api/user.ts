import alovaInstance from '$lib/request/alova';
import type { SysUserLoginInput, SysUserRegisterInput } from '$lib/zod/user';
import type { HttpApiResponse } from '$lib/request/http-response';

// 用户登录响应
export type LoginResponse = {
	accessToken: string;
	refreshToken: string;
	expiresAt: string;
	userId: string;
};
// 用户登录api
export const userLoginApi = (loginFormData: SysUserLoginInput) =>
	alovaInstance.Post<HttpApiResponse<LoginResponse>>('/api/user/login', loginFormData);

// 用户注册响应
export type RegisterResponse = {
	userId: string;
};

// 用户注册api
export const userRegisterApi = (registerFormData: SysUserRegisterInput) =>
	alovaInstance.Post<HttpApiResponse<RegisterResponse>>('/api/user/register', registerFormData);
