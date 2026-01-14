/**
 * 计数器函数
 *
 * @param initialValue 初始值，默认 0
 * @param step 步长，默认 1
 * @returns 包含当前值、增加函数、减少函数、重置函数和设置值函数的对象
 */

export default function useCounter(
	initialValue = 0,
	step = 1
): {
	count: number;
	increment: () => void;
	decrement: () => void;
	reset: () => void;
	setCount: (v: number) => void;
} {
	let count: number = $state(initialValue);

	const increment = () => {
		count += step;
	};

	const decrement = () => {
		count -= step;
	};

	const reset = () => {
		count = initialValue;
	};

	const setCount = (v: number) => {
		count = v;
	};

	return { count, increment, decrement, reset, setCount };
}
