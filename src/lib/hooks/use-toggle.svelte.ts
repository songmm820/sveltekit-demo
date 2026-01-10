/**
 * 切换函数
 *
 * @param initialValue 初始值，默认 false
 * @returns 包含当前值、切换函数和设置值函数的数组
 */
export default function useToggle(initialValue = false): {
	value: boolean;
	toggle: () => void;
	setValue: (v: boolean) => void;
} {
	let value = $state<boolean>(initialValue);

	const toggle = () => {
		value = !value;
	};

	const setValue = (v: boolean) => {
		value = v;
	};

	return {
		value,
		toggle,
		setValue
	};
}
