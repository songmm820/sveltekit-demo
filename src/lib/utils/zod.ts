import type { ZodSafeParseResult } from 'zod';

/**
 * 获取zod检验的第一个错误信息
 *
 * @param fd zod 安全解析结果
 */
export function getZodErrorMessage<T>(fd: ZodSafeParseResult<T>): {
	message: string;
	field: string;
} | null {
	if (!fd.success) {
		const issues = fd.error.issues;
		const [firstIssue] = issues;
		return {
			message: firstIssue.message,
			field: firstIssue.path.join('.')
		};
	}
	return null;
}
