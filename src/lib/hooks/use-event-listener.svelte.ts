type Target = HTMLElement | Window | Document | null;

/**
 * 监听元素事件
 *
 * @param ref 元素引用
 * @param eventName 事件名称
 * @param listener  事件回调
 * @param options 监听选项
 * @returns 取消监听函数
 */
export default function useEventListener<K extends keyof HTMLElementEventMap>(
	ref: Target | (() => Target),
	eventName: K,
	listener: (event: HTMLElementEventMap[K]) => void,
	_options?: AddEventListenerOptions
): void {
	const options = _options ?? {
		capture: false,
		once: false,
		passive: false
	};

	$effect(() => {
		const _el = typeof ref === 'function' ? ref() : ref;
		if (!_el) return;
		_el.addEventListener(eventName, listener as EventListener, options);
		return () => _el.removeEventListener(eventName, listener as EventListener, options);
	});
}
