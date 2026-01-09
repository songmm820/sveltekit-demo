/**
 * 节流函数
 *
 * @param value 要节流的值
 * @param interval 节流间隔，默认 300 毫秒
 * @returns 节流后的值
 */
export function useThrottle<T>(value: T, interval = 300): T {
	let throttledValue = $state<T>(value);
	let lastExecTime = $state<number>(Date.now());

	$effect(() => {
		const _now = Date.now();
		if (_now - lastExecTime >= interval) {
			throttledValue = value;
			lastExecTime = _now;
		}
	});

	return throttledValue;
}
