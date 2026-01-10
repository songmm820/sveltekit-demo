type Callback = () => void;

type Options = {
	timeout?: number;
};

/**
 * 请求空闲回调函数
 *
 * @param callback 空闲时执行的回调函数
 * @param options 选项，包含超时时间
 */
export default function useRequestIdleCallback(callback: Callback, options: Options): void {
	$effect(() => {
		if (typeof window === 'undefined' || !window.requestIdleCallback) {
			// 降级：直接执行
			callback();
			return;
		}

		const _id = requestIdleCallback(callback, options);
		return () => cancelIdleCallback(_id);
	});
}
