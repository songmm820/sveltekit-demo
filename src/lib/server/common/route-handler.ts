import { json, type RequestHandler } from '@sveltejs/kit';
import { ZodError } from 'zod';
import { HttpApiError, HttpResponse, HttpResponseCodeEnum } from '$lib/request/http-response';
import { error as consoleError } from 'console';

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
				return json(
					HttpResponse.error(
						`参数校验错误: ${JSON.stringify(errors)}`,
						HttpResponseCodeEnum.ParamError
					)
				);
			}
			// Api 业务异常
			if (error instanceof HttpApiError) {
				return json(HttpResponse.error(error.message, error.code));
			}
			return json(HttpResponse.error(`服务器内部错误: ${error}`, HttpResponseCodeEnum.ServerError));
		}
	};
	return routeHandler;
}
