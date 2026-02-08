import { json, type RequestHandler } from '@sveltejs/kit';
import { ZodError } from 'zod';
import { HttpApiError, HttpResponse } from '$lib/request/http-response';
import { error as consoleError } from 'console';
import { error as svaltekitError } from '@sveltejs/kit';

/**
 * 创建 API 路由处理函数，统一处理错误
 *
 * @param handler 请求处理函数
 * @returns 路由处理函数
 */
export function createApiHandler(handler: RequestHandler) {
	const routeHandler: RequestHandler = async (event) => {
		try {
			return await handler(event);
		} catch (error) {
			consoleError('API处理错误:', error);
			// Zod 参数校验错误
			if (error instanceof ZodError) {
				const errors = error.issues.map((issue) => {
					return {
						field: String(issue.path),
						message: issue.message
					};
				});
				svaltekitError(500, `参数校验错误: ${JSON.stringify(errors)}`);
			}
			// Api 业务异常
			if (error instanceof HttpApiError) {
				svaltekitError(500, error.message);
			}
			return json(HttpResponse.error(`服务器内部错误: ${error}`), { status: 500 });
		}
	};
	return routeHandler;
}
