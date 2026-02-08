/* eslint-disable @typescript-eslint/no-explicit-any */
export type HttpApiResponse<T = any> = {
	payload?: T;
	success: boolean;
	timestamp: number;
	message?: string;
	code?: number;
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

	static error(error: string | unknown, code?: number) {
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
}

export class HttpApiError extends Error {
	constructor(public readonly message: string) {
		super(message);
		this.name = 'HttpApiError';
	}
}
