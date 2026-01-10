type Target = HTMLElement | Document | null;

/**
 * 点击外部元素事件
 *
 * @param ref 元素引用
 * @param listener 点击事件回调
 * @param ignoreElements 忽略元素数组
 * @param options 监听选项
 */
export default function useClickOutside(
	ref: Target | (() => Target),
	listener: (event: MouseEvent) => void,
	ignoreElements: Target[] = [],
	_options?: AddEventListenerOptions
): void {
	const options = _options ?? {
		capture: false,
		once: false,
		passive: false
	};

	$effect(() => {
		let el = typeof ref === 'function' ? ref() : ref;
		if (!el) return;

		const _handleClick = (event: MouseEvent) => {
			const _target = event.target as HTMLElement;
			if (
				el.contains(_target) ||
				ignoreElements.some((_ignoreEl) => _ignoreEl?.contains(_target))
			) {
				return;
			}

			listener(event);
		};

		document.addEventListener('click', _handleClick, options);

		return () => document.removeEventListener('click', _handleClick, options);
	});
}
