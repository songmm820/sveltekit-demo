import alovaInstance from '$lib/request/alova';
import type { SysUserRegisterInput } from '$lib/zod/user';
import type { HttpApiResponse } from '$lib/request/http-response';

// 用户注册响应
export type RegisterResponse = {
	userId: string;
};

// 用户注册api
export const userRegisterApi = (registerFormData: SysUserRegisterInput) =>
	alovaInstance.Post<HttpApiResponse<RegisterResponse>>('/api/user/register', registerFormData);

// 用户当前登录信息响应
export type CurrentLoginUserResponse = {
	id: string;
	nickName: string;
	email: string;
};
// 用户当前登录信息api
export const currentLoginUserApi = () =>
	alovaInstance.Get<HttpApiResponse<CurrentLoginUserResponse>>('/api/user/current');
