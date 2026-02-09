/* eslint-disable @typescript-eslint/no-explicit-any */
export type HttpApiResponse<T = any> = {
	payload?: T;
	success: boolean;
	timestamp: number;
	message?: string;
	code?: HttpResponseCodeEnum;
};

export const HttpResponseCodeEnum = {
	ServerError: 10000,
	NullToken: 10002,
	PasswordError: 10003,
	EmailHasRegistered: 10004,
	EmailNoRegister: 10005,
	AccessTokenExpired: 10006,
	/* 2 */
	ParamError: 20001,
} as const;

export type HttpResponseCodeEnum = (typeof HttpResponseCodeEnum)[keyof typeof HttpResponseCodeEnum];

export const HttpResponseCodeMap: Record<
	HttpResponseCodeEnum,
	{ code: HttpResponseCodeEnum; message: string }
> = {
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

export class HttpResponse {
	static success<R>(data?: R) {
		if (data === null || data === undefined) {
			return {} as R;
		}
		return {
			payload: data,
			success: true,
			timestamp: Date.now()
		};
	}

	static error(error: string | unknown, code?: HttpResponseCodeEnum) {
		const r: HttpApiResponse = {
			message: error instanceof Error ? error.message : String(error),
			success: false,
			timestamp: Date.now()
		};
		if (code) {
			r.code = code;
		}
		return r;
	}

	static errorByCode(er: HttpResponseCodeEnum) {
		return HttpResponse.error(HttpResponseCodeMap[er].message, HttpResponseCodeMap[er].code);
	}
}

export class HttpApiError extends Error {
	public readonly code?: HttpResponseCodeEnum;
	constructor(code: HttpResponseCodeEnum);
	constructor(message: string);
	constructor(arg: HttpResponseCodeEnum | string) {
		if (typeof arg === 'number') {
			const message = HttpResponseCodeMap[arg]?.message || '未知错误';
			super(message);
			this.code = arg;
		} else {
			super(arg);
			this.code = HttpResponseCodeEnum.ServerError;
		}
		this.name = 'HttpApiError';
	}
}
