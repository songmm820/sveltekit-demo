import { HttpResponseCodeEnum, HttpResponseCodeMap } from "./http-code";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type HttpApiResponse<T = any> = {
	payload?: T;
	success: boolean;
	timestamp: number;
	message?: string;
	code?: HttpResponseCodeEnum;
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
