/**
 * 防抖函数
 *
 * @param fn 要防抖的函数
 * @param delay 防抖延迟，默认 300 毫秒
 * @returns 防抖后的函数
 */
export default function debounce<F extends (...args: Parameters<F>) => ReturnType<F>>(
	fn: F,
	delay: number = 300,
	immediate: boolean = true
): F {
	let timer: ReturnType<typeof setTimeout> | null = null;

	const debouncedFunc = function (
		this: ThisParameterType<F>,
		...args: Parameters<F>
	): ReturnType<F> | undefined {
		if (timer) clearTimeout(timer);

		if (immediate && !timer) {
			fn.apply(this, args);
		}

		// 延迟执行逻辑
		timer = setTimeout(() => {
			if (!immediate) {
				fn.apply(this, args);
			}
			timer = null;
		}, delay);

		return undefined;
	} as F;

	return debouncedFunc;
}
