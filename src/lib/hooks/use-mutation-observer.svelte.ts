/**
 * 监听元素的变化
 *
 * @param ref 元素引用
 * @param callback 变化回调
 * @param options 监听选项
 * @returns 取消监听函数
 */
export default function useMutationObserver(
	ref: () => HTMLElement | null,
	callback: MutationCallback,
	options: MutationObserverInit = {
		attributes: true,
		characterData: true,
		childList: true,
		subtree: true
	}
): void {
	const element = $derived(ref());

	$effect(() => {
		if (!element) return;
		const observer = new MutationObserver(callback);
		observer.observe(element, options);
		return () => observer.disconnect();
	});
}
