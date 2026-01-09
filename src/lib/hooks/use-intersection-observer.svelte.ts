/**
 * 交叉观察器函数
 *
 * @param ref 要观察的元素引用函数
 * @param callback 交叉观察回调函数
 * @param options 交叉观察选项，默认 { threshold: 0.1 }
 */
export function useIntersectionObserver(
	ref: () => HTMLElement | null,
	callback: IntersectionObserverCallback,
	options: IntersectionObserverInit = { threshold: 0.1 }
): void {
	const element = $derived<HTMLElement | null>(ref());

	$effect(() => {
		if (!element) return;
		const observer = new IntersectionObserver(callback, options);
		observer.observe(element);
		return () => observer.disconnect();
	});
}
