/**
 * 定时器函数
 *
 * @param callback 回调函数
 * @param interval 间隔时间，默认 1000 毫秒
 * @returns 包含启动函数和清除函数的对象
 */
export default function useInterval(
	callback: () => void,
	interval: number | null = 1000
): { start: () => void; clear: () => void } {
	let timerId: ReturnType<typeof setInterval> | null = $state(null);

	const start = () => {
		if (interval === null) return;
		clear();
		timerId = setInterval(callback, interval);
	};

	const clear = () => {
		if (timerId) {
			clearInterval(timerId);
			timerId = null;
		}
	};

	$effect(() => {
		return () => clear();
	});

	if (interval !== null) {
		start();
	}

	return { start, clear };
}
