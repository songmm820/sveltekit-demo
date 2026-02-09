
export const HttpResponseCodeEnum = {
	ServerError: 10000,
	NullToken: 10002,
	PasswordError: 10003,
	EmailHasRegistered: 10004,
	EmailNoRegister: 10005,
	AccessTokenExpired: 10006,
	RefreshTokenExpired: 10007,
	/* 20001 */
	ParamError: 20001
} as const;

export type HttpResponseCodeEnum = (typeof HttpResponseCodeEnum)[keyof typeof HttpResponseCodeEnum];

export const HttpResponseCodeMap: Record<
	HttpResponseCodeEnum,
	{ code: HttpResponseCodeEnum; message: string }
> = {
	[HttpResponseCodeEnum.RefreshTokenExpired]: {
		code: HttpResponseCodeEnum.RefreshTokenExpired,
		message: '刷新令牌过期'
	},
	[HttpResponseCodeEnum.AccessTokenExpired]: {
		code: HttpResponseCodeEnum.AccessTokenExpired,
		message: '访问令牌过期'
	},
	[HttpResponseCodeEnum.ServerError]: {
		code: HttpResponseCodeEnum.ServerError,
		message: '服务发生了错误'
	},
	[HttpResponseCodeEnum.NullToken]: {
		code: HttpResponseCodeEnum.NullToken,
		message: '授权认证为空'
	},
	[HttpResponseCodeEnum.PasswordError]: {
		code: HttpResponseCodeEnum.PasswordError,
		message: '密码错误'
	},
	[HttpResponseCodeEnum.EmailHasRegistered]: {
		code: HttpResponseCodeEnum.EmailHasRegistered,
		message: '邮箱已注册'
	},
	[HttpResponseCodeEnum.EmailNoRegister]: {
		code: HttpResponseCodeEnum.EmailNoRegister,
		message: '邮箱未注册'
	},
	[HttpResponseCodeEnum.ParamError]: {
		code: HttpResponseCodeEnum.ParamError,
		message: '参数错误'
	}
};