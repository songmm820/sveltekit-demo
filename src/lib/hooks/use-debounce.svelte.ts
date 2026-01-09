/**
 * 防抖函数
 *
 * @param value 要防抖的值
 * @param delay 防抖延迟，默认 300 毫秒
 * @returns 防抖后的值
 */
export function useDebounce<T>(value: T, delay = 300): T {
	let debouncedValue = $state<T>(value);

	$effect(() => {
		const _timer = setTimeout(() => {
			debouncedValue = value;
		}, delay);
		return () => clearTimeout(_timer);
	});

	return debouncedValue;
}
